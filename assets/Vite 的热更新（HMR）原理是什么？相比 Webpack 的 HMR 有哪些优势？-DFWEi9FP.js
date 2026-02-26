const t=`### 23. Vite 的热更新（HMR）原理是什么？相比 Webpack 的 HMR 有哪些优势？
	**答：**
	#### 一、Vite HMR 核心原理
	Vite 基于**原生 ESModule** 实现 HMR，核心流程：
	1. **开发服务器**：Vite 启动时创建 Web Server + WebSocket 服务器，WebSocket 用于推送更新事件；
	2. **模块监听**：通过 \`chokidar\` 监听文件变更，仅编译变更的文件（而非全量打包）；
	3. **模块替换**：
		- 对 JS/TS 模块：直接替换 ESM 模块的导出，无需刷新页面；
		- 对 Vue 组件：通过 \`@vitejs/plugin-vue\` 编译单文件组件的变更部分，触发组件实例的重新渲染；
		- 对样式文件：通过 \`style-update\` 事件替换样式标签内容，无刷新。
	#### 二、Vite HMR vs Webpack HMR 核心优势
		#### 关键优势总结
	1. **无打包开销**：Vite 开发时不打包，文件变更仅编译单个模块，更新速度远快于 Webpack；
	2. **原生 ESM 直出**：无需像 Webpack 那样生成中间 bundle，减少转换环节；
	3. **更智能的模块替换**：对 Vue/React 框架的 HMR 适配更优，无需手动编写 \`module.hot.accept\`。`;export{t as default};
