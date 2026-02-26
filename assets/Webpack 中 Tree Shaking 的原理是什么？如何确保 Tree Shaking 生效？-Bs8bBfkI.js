const e=`### Webpack 中 Tree Shaking 的原理是什么？如何确保 Tree Shaking 生效？

**答：**

#### Tree Shaking 原理

Tree Shaking（摇树优化）是一种基于 ESModule 静态分析的代码优化手段，核心思路是 “移除未被使用的代码（死代码）”，类似摇树抖落无用的叶子：

1. **静态分析**：ESModule 的 \`import\`/\`export\` 是静态声明（编译时确定），Webpack 可分析出哪些导出模块未被使用；
2. **标记死代码**：通过 \`terser-webpack-plugin\` 等工具标记未被引用的导出代码；
3. **删除死代码**：在代码压缩阶段，删除标记的死代码，减小产物体积。

#### 确保 Tree Shaking 生效的配置

1. **基础条件**：
   - 模块必须使用 ESModule 规范（CommonJS 动态加载无法静态分析）；
   - 禁用 \`babel-plugin-transform-runtime\` 等会将 ESM 转为 CJS 的 Babel 插件；

2. **Webpack 配置**：

\`\`\`javascript
module.exports = {mode: 'production', // 生产模式默认开启 Tree Shakingoptimization: {usedExports: true, // 标记未使用的导出minimizer: [new TerserPlugin({ // 压缩时删除死代码terserOptions: {compress: {unused: true // 移除未使用的变量/函数}}})]},resolve: {extensions: ['.js', '.ts', '.vue'],mainFields: ['module', 'main'] // 优先加载 ESM 版本的依赖}};
\`\`\`

1. **代码层面注意事项**：
   - 避免将所有导出封装为一个对象（如 \`export default { a, b }\`），会导致无法分析单个导出；
   - 避免副作用代码（如 \`import './style.css'\`），可在 \`package.json\` 中声明副作用文件：\`"sideEffects": ["*.css"]\`；
   - 第三方库需提供 ESM 版本（如 \`lodash-es\` 而非 \`lodash\`）。`;export{e as default};
