// Process the out directory for Chrome Extension compatibility

const fs = require('fs');
const { glob } = require('glob');
const path = require('path');
const crypto = require('crypto');

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

async function main() {
  try {
    // 提取内联脚本为外部文件
    await extractInlineScriptsToExternalFiles();
    
    // 处理HTML文件以修复路径
    const files = await glob('out/**/*.html');
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const modifiedContent = content.replace(/\/_next\//g, './next/')
                                     .replace(/\.\/_next\//g, './next/');
      fs.writeFileSync(file, modifiedContent, 'utf-8');
    }

    // 移动_next目录到next如果它存在
    const sourcePath = path.join('out', '_next');
    const destinationPath = path.join('out', 'next');

    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destinationPath);
      console.log('Renamed "_next" directory to "next" successfully.');
    } else {
      console.log('_next directory not found, skipping rename operation.');
    }

    console.log('Chrome extension output prepared successfully!');
  } catch (error) {
    console.error('Error processing output directory:', error);
    process.exit(1);
  }
}

main();
