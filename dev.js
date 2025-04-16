// 开发模式：同时支持浏览器预览和Chrome扩展开发
const fs = require('fs');
const { glob } = require('glob');
const path = require('path');
const { exec, spawn, execSync } = require('child_process');
const chokidar = require('chokidar');
const crypto = require('crypto');

// 目标目录
const OUT_DIR = path.join(__dirname, 'out');
const SRC_DIRS = ['app', 'components', 'styles', 'lib', 'public'];

// 处理输出目录使其与Chrome扩展兼容
async function processOutDir() {
  try {
    // 提取内联脚本为外部文件
    await extractInlineScriptsToExternalFiles();
    
    // 处理HTML文件修复路径
    const files = await glob('out/**/*.html');
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const modifiedContent = content.replace(/\/_next\//g, './next/')
                                   .replace(/\.\/_next\//g, './next/');
      fs.writeFileSync(file, modifiedContent, 'utf-8');
    }

    // 移动_next目录到next（如果存在）
    const sourcePath = path.join('out', '_next');
    const destinationPath = path.join('out', 'next');

    if (fs.existsSync(sourcePath)) {
      // 如果目标目录已存在，先删除
      if (fs.existsSync(destinationPath)) {
        fs.rmSync(destinationPath, { recursive: true, force: true });
      }
      fs.renameSync(sourcePath, destinationPath);
      console.log('✅ 重命名 "_next" 目录为 "next" 成功');
    } else {
      console.log('⚠️ _next 目录未找到，跳过重命名操作');
    }

    console.log('🚀 Chrome扩展输出已准备就绪！');
    console.log(`🔍 扩展目录: ${OUT_DIR}`);
    console.log('👉 在Chrome扩展管理页面加载该目录或刷新扩展');
  } catch (error) {
    console.error('❌ 处理输出目录时出错:', error);
  }
}

// 将内联脚本提取为外部文件
async function extractInlineScriptsToExternalFiles() {
  try {
    console.log('🔍 检查内联脚本...');
    
    const htmlFiles = await glob('out/**/*.html');
    let extractedScriptCount = 0;
    
    // 从所有HTML文件中提取内联脚本
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      
      // 检查是否存在内联脚本
      const scriptRegex = /<script(?!\s+src=)(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi;
      let match;
      let modifiedContent = content;
      let fileChanged = false;
      
      // 创建脚本目录
      const scriptDir = path.join(path.dirname(file), 'scripts');
      if (!fs.existsSync(scriptDir)) {
        fs.mkdirSync(scriptDir, { recursive: true });
      }
      
      // 处理文件中的每个内联脚本
      while ((match = scriptRegex.exec(content)) !== null) {
        const fullScriptTag = match[0];
        const scriptContent = match[1].trim();
        
        if (scriptContent) {
          // 为脚本生成唯一名称
          const scriptHash = crypto.createHash('md5').update(scriptContent).digest('hex').slice(0, 8);
          const scriptFileName = `inline-script-${scriptHash}.js`;
          const scriptPath = path.join(scriptDir, scriptFileName);
          const relativePath = path.relative(path.dirname(file), scriptPath).replace(/\\/g, '/');
          
          // 写入外部JS文件
          fs.writeFileSync(scriptPath, scriptContent, 'utf-8');
          
          // 创建新的script标签，引用外部文件
          const newScriptTag = `<script src="${relativePath}"></script>`;
          
          // 替换内联脚本为外部脚本引用
          modifiedContent = modifiedContent.replace(fullScriptTag, newScriptTag);
          fileChanged = true;
          extractedScriptCount++;
        }
      }
      
      // 如果文件被修改，写回文件
      if (fileChanged) {
        fs.writeFileSync(file, modifiedContent, 'utf-8');
      }
    }
    
    if (extractedScriptCount > 0) {
      console.log(`✅ 已将 ${extractedScriptCount} 个内联脚本转换为外部文件`);
    } else {
      console.log('✅ 没有发现内联脚本，无需转换');
    }
  } catch (error) {
    console.error('❌ 处理内联脚本时出错:', error);
  }
}

// 构建扩展
async function buildExtension() {
  console.log('🔨 正在构建Chrome扩展...');
  
  try {
    // 确保out目录存在
    if (!fs.existsSync(OUT_DIR)) {
      fs.mkdirSync(OUT_DIR, { recursive: true });
    }
    
    // 使用Next.js构建（修复命令路径问题）
    execSync('NODE_ENV=production npx next build', { stdio: 'inherit' });
    
    // 处理输出目录
    await processOutDir();
    
    console.log('✅ 扩展构建完成');
  } catch (error) {
    console.error('❌ 构建过程中出错:', error);
  }
}

// 启动文件监视器（仅用于扩展构建）
function startWatcher() {
  console.log('👀 开始监视文件变化以更新扩展...');
  
  // 创建文件监视器
  const watcher = chokidar.watch(SRC_DIRS, {
    ignored: /(^|[\/\\])\../, // 忽略点文件
    persistent: true,
    ignoreInitial: true
  });
  
  // 节流函数，防止频繁构建
  let buildTimeout = null;
  const debouncedBuild = () => {
    if (buildTimeout) clearTimeout(buildTimeout);
    buildTimeout = setTimeout(() => {
      buildExtension();
    }, 1000);
  };
  
  // 监听文件变化事件
  watcher
    .on('add', path => {
      console.log(`📝 文件已添加: ${path}`);
      debouncedBuild();
    })
    .on('change', path => {
      console.log(`📝 文件已修改: ${path}`);
      debouncedBuild();
    })
    .on('unlink', path => {
      console.log(`📝 文件已删除: ${path}`);
      debouncedBuild();
    });
    
  console.log('✅ 文件监视器已启动');
  console.log('🌐 扩展将在文件变化时自动重新构建');
}

// 启动Next.js开发服务器
function startDevServer() {
  return new Promise((resolve) => {
    console.log('🚀 启动Next.js开发服务器...');
    
    const devServer = spawn('npx', ['next', 'dev'], {
      stdio: 'inherit',
      shell: true
    });
    
    devServer.on('error', (error) => {
      console.error('❌ 启动开发服务器时出错:', error);
    });
    
    // 给开发服务器一些时间启动
    setTimeout(() => {
      console.log('✅ Next.js开发服务器已启动');
      console.log('🌐 浏览器访问地址: http://localhost:3000');
      resolve();
    }, 3000);
  });
}

// 启动完整的开发环境
async function startDevMode() {
  console.log('🚀 启动完整开发环境...');
  console.log('-----------------------------------');
  console.log('这将同时提供:');
  console.log('1. 浏览器开发预览 (http://localhost:3000)');
  console.log('2. Chrome扩展实时构建 (加载"out"目录)');
  console.log('-----------------------------------');
  
  // 首先构建扩展
  await buildExtension();
  
  // 启动开发服务器
  await startDevServer();
  
  // 启动文件监视器以更新扩展
  startWatcher();
  
  console.log('');
  console.log('✨ 完整开发环境已启动');
  console.log('📱 在浏览器中预览: http://localhost:3000');
  console.log(`🧩 Chrome扩展目录: ${OUT_DIR}`);
  console.log('');
  console.log('📋 使用说明:');
  console.log('1. 在浏览器中访问 http://localhost:3000 进行实时预览');
  console.log('2. 在Chrome扩展管理页面加载"out"目录');
  console.log('3. 代码更改将自动更新浏览器预览');
  console.log('4. 代码更改也将触发扩展重新构建，刷新扩展以查看最新更改');
}

// 执行主函数
startDevMode(); 