# Next.js Chrome Extension Starter

使用Next.js构建的Chrome扩展起始模板，支持实时开发和自动化构建。

## 特性

- 使用Next.js构建Chrome扩展
- 支持React组件和Hooks
- 使用Tailwind CSS进行样式设计
- 开发模式下支持实时更新预览
- 自动处理构建输出以符合Chrome扩展要求

## 开发指南

### 安装依赖

```bash
npm install
# 或者
yarn install
# 或者
pnpm install
```

### 开发模式

我们提供了三种开发方式，根据您的需求选择合适的命令：

#### 1. 仅浏览器开发（最快）

这种模式下，您可以在浏览器中快速预览和开发UI，但不会构建Chrome扩展。

```bash
npm run dev
```

然后在浏览器中访问 http://localhost:3000

#### 2. 仅扩展开发

这种模式下，代码更改会自动触发扩展重新构建，但不提供浏览器预览。

```bash
npm run dev:extension
```

扩展文件会生成在`out`目录中，您需要：
1. 在Chrome中访问 `chrome://extensions/`
2. 启用开发者模式
3. 点击"加载已解压的扩展程序"
4. 选择项目中的`out`目录

当代码发生变化时，扩展会自动重新构建，您只需在Chrome中刷新扩展即可查看更新。

#### 3. 完整开发环境（同时支持浏览器预览和扩展构建）

这种模式同时提供浏览器预览和扩展自动构建，是最完整的开发环境。

```bash
npm run dev:all
```

这将：
1. 启动浏览器开发服务器在 http://localhost:3000
2. 初始构建扩展到 `out` 目录
3. 监视文件变化，同时更新浏览器预览和重新构建扩展

### 构建生产版本

要构建生产版本的扩展：

```bash
npm run build
```

生产构建会输出到 `out` 目录，可直接用于发布。

## 项目结构

```
├── app/              # Next.js应用目录
├── components/       # React组件
├── lib/              # 工具函数和辅助模块
├── public/           # 静态资源
│   └── manifest.json # Chrome扩展清单文件
├── styles/           # 全局样式
└── out/              # 构建输出目录（自动生成）
```

## 内容安全策略

Chrome扩展有严格的内容安全策略(CSP)，特别是在Manifest V3下，内联脚本（即使使用哈希值）也不再被支持。本项目使用了一种不同的方法来处理这个问题：

1. 在构建过程中，自动将所有内联脚本提取为外部JavaScript文件
2. 替换HTML中的内联脚本标签为外部脚本引用
3. 使用标准的CSP配置，只允许加载扩展包内的脚本：

```json
"content_security_policy": {
  "extension_pages": "script-src 'self'; object-src 'self'"
}
```

这种方法确保了：
- 符合Chrome扩展的严格安全要求
- 扩展可以正常工作，没有CSP错误
- 不需要任何不安全的策略设置

这是一种全自动的过程，开发者不需要手动处理内联脚本。

## 自定义扩展

- 修改`public/manifest.json`以更改扩展名称、描述和权限
- 在`app/`目录中修改扩展UI界面
- 所有标准的Next.js、React和Tailwind CSS功能都可用

## 常见问题

#### 扩展显示空白页面
确保已正确构建扩展并在扩展管理页面加载了正确的目录。

#### 浏览器和扩展预览不一致
浏览器预览使用开发服务器，而扩展使用构建版本，可能存在轻微差异。

#### 更改后扩展没有更新
尝试在Chrome扩展管理页面刷新扩展，或重新加载扩展。

## 许可

ISC 