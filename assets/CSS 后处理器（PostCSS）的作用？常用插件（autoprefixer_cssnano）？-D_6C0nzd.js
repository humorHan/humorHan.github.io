const n=`### CSS 后处理器（PostCSS）的作用？常用插件（autoprefixer/cssnano）？

**答案**：

#### 作用：

PostCSS 是 CSS 处理工具（基于 JS），通过插件对 CSS 进行编译 / 优化 / 转换，弥补 CSS 原生功能不足，核心作用：

1. 自动添加浏览器前缀（autoprefixer）；
2. 压缩 CSS（cssnano）；
3. 转换未来 CSS 语法（postcss-preset-env，如 CSS 变量、嵌套）；
4. 语法检查（stylelint）；
5. 转换单位（如 px 转 rem）；
6. 移除无用 CSS（purgecss）。

#### 常用插件：

1. **autoprefixer**：根据 Can I Use 数据自动添加浏览器前缀（如 \`-webkit-\`/\`-moz-\`），无需手动写前缀；配置示例（postcss.config.js）：
2. js

\`\`\`javascript
module.exports = { plugins: [require('autoprefixer')({ overrideBrowserslist: ['last 2 versions'] })] };
\`\`\`

1. **cssnano**：压缩 CSS（移除空格、注释、合并规则、精简属性），减小文件体积；
2. **postcss-preset-env**：将现代 CSS 语法转换为浏览器兼容的语法（如 CSS 变量转普通属性）；
3. **postcss-px-to-viewport**：将 px 转换为 vw/vh，适配移动端；
4. **stylelint**：检查 CSS 语法错误 / 规范（如禁止使用 \`!important\`）；
5. **purgecss**：移除未使用的 CSS（如打包时删除未引用的样式）。`;export{n as default};
