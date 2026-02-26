const _=`### ESModule 和 CommonJS 模块化规范的核心区别是什么？Webpack 如何处理这两种模块化？

**答：**

#### 核心区别

#### Webpack 处理方式

1. **统一解析**：Webpack 会将 ESM 和 CJS 模块统一转换为其内部模块格式（webpack module），抹平两者差异；
2. **ESM 处理**：
   - 编译时分析 \`import\` 语句，支持 Tree Shaking（静态分析依赖）；
   - 对 \`import()\` 动态导入，会触发代码分割，生成独立 chunk；

3. **CJS 处理**：
   - 解析 \`require()\` 语句，运行时确定依赖（无法静态分析，不支持 Tree Shaking）；
   - 将 \`module.exports\`/\`exports\` 转换为 ESM 兼容格式，如 \`exports.default = module.exports\`；

4. **混合使用**：Webpack 允许两者混合导入导出，但需注意值绑定差异（如 CJS 导入 ESM 需通过 \`.default\`）。`;export{_ as default};
