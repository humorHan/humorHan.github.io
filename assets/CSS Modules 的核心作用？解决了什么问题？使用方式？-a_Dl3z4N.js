const s=`### 27. CSS Modules 的核心作用？解决了什么问题？使用方式？

**答案**：

#### 核心作用：

CSS Modules 是一种 CSS 模块化方案，通过给 CSS 类名自动生成唯一哈希值，实现样式的局部作用域，避免类名冲突。

#### 解决的问题：

1. **全局类名冲突**：传统 CSS 类名是全局的，多人协作 / 多模块开发时易出现重名覆盖；
2. **样式污染**：修改一处样式可能影响其他模块；
3. **样式复用难**：无模块化机制，复用样式需手动命名公共类。

#### 使用方式（以 React+Webpack 为例）：

1. **配置 Webpack**：启用 \`css-loader\` 的 \`modules\` 选项：
2. js

\`\`\`javascript
// webpack.config.js
module.exports = {module: {rules: [{test: /\\.module\\.css$/, // 仅对.module.css文件启用CSS Modulesuse: ['style-loader',{loader: 'css-loader',options: { modules: true }}]}]}};
\`\`\`

1. **编写模块化 CSS**（\`style.module.css\`）：
2. css

\`\`\`css
.box { width: 100px; height: 100px; }.title { font-size: 16px; }
\`\`\`

1. **在组件中引入**：
2. jsx

\`\`\`javascript
import styles from './style.module.css';function App() {return (<div className={styles.box}><h1 className={styles.title}>CSS Modules示例</h1></div>);}
\`\`\`

1. **全局样式例外**：使用 \`:global()\` 声明全局类名：
2. css

\`\`\`css
:global(.global-class) { color: red; }
\`\`\``;export{s as default};
