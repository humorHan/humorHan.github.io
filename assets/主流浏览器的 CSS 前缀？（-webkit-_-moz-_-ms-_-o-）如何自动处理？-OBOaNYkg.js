const n=`### 35. 主流浏览器的 CSS 前缀？（-webkit-/-moz-/-ms-/-o-）如何自动处理？

**答案**：

#### 主流浏览器 CSS 前缀：

CSS 前缀用于兼容浏览器的实验性 / 私有 CSS 属性，不同内核浏览器前缀不同：

#### 常见需加前缀的属性：

\`transform\`/\`transition\`/\`animation\`/\`border-radius\`/\`box-shadow\`/\`flex\`/\`grid\`/\`filter\`/\`backdrop-filter\` 等。

#### 自动处理前缀的方法：

##### 1. 使用 PostCSS + autoprefixer（推荐）

- 安装依赖：\`npm install postcss autoprefixer --save-dev\`；
- 配置 \`postcss.config.js\`：
- js

\`\`\`javascript
module.exports = {plugins: [require('autoprefixer')({// 配置兼容目标（参考Can I Use）overrideBrowserslist: ["last 2 versions", // 主流浏览器最近2个版本"iOS >= 8","Android >= 4.4"]})]};
\`\`\`

- 集成到构建工具（Webpack/Vite）：自动编译 CSS 并添加前缀。

##### 2. 使用 CSS 预处理器混合（Mixin）

scss

\`\`\`scss
// Sass Mixin@mixin transform($value) {-webkit-transform: $value;-moz-transform: $value;-ms-transform: $value;-o-transform: $value;transform: $value;}// 使用.box {@include transform(translateX(100px));}
\`\`\`

##### 3. 使用在线工具 / 编辑器插件

- 在线工具：Autoprefixer Online（输入 CSS 自动添加前缀）；
- VSCode 插件：CSS Auto Prefixer（保存时自动添加前缀）。

##### 4. 框架 / UI 库内置

如 Tailwind CSS、Element UI 等，已内置前缀处理，无需手动添加。`;export{n as default};
