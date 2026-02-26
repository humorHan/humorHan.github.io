const n=`### 构建层面的性能优化有哪些？（Tree Shaking、代码压缩、依赖优化、chunk 拆分）

**答案：**构建层面优化核心是 “减少最终打包产物的体积、优化 chunk 拆分、提升加载效率”，核心手段如下（以 Vite/Webpack 为例）：

#### 一、Tree Shaking（摇树优化）

- 原理：清除代码中未被使用的死代码（如未调用的函数、未引用的变量），减少打包体积；
- 实现条件：

  1. 使用 ES6 Module（\`import/export\`），禁用 CommonJS（\`require\`）；
  2. 生产环境构建（Vite 默认为 \`production\`，Webpack 需配置 \`mode: production\`）；
- 优化配置：

  - Vite：默认开启，无需额外配置；
  - Webpack：配置 \`optimization.usedExports: true\`，结合 \`TerserPlugin\` 清除死代码；
- 实践：

  - 第三方库按需导入（如 \`import { debounce } from 'lodash-es'\` 而非 \`import _ from 'lodash'\`）；
  - 项目代码避免定义未使用的函数 / 变量。

#### 二、代码压缩（减小文件体积）

1. **JS 压缩**
   - Vite：默认使用 \`esbuild\` 压缩（比 Terser 快 20-40 倍），生产环境自动开启；
   - Webpack：使用 \`TerserPlugin\`，配置压缩参数（移除注释、重命名变量、删除 console）：
   - js

   \`\`\`javascript
   \`\`\`

// webpack.config.js
module.exports = {optimization: {minimizer: [new TerserPlugin({terserOptions: {compress: { drop_console: true }, // 移除 consolemangle: true, // 变量重命名},}),],},};

\`\`\`

2. **CSS 压缩**
	- Vite：使用 \`vite-plugin-cssnano\` 或内置的 \`css.minify\`；
	- Webpack：使用 \`mini-css-extract-plugin\` + \`css-minimizer-webpack-plugin\`；
	- 核心：移除 CSS 注释、空白，合并重复样式，精简选择器。

3. **HTML 压缩**
	- Vite：使用 \`vite-plugin-html\` 压缩 HTML；
	- Webpack：使用 \`html-webpack-plugin\` 配置压缩参数。

#### 三、依赖优化（减少第三方库体积）

1. **替换体积大的依赖**
	- 示例：\`moment.js\`（200KB+）→ \`dayjs\`（2KB）、\`lodash\` → \`lodash-es\`（支持 Tree Shaking）、\`axios\` → \`axios-mini\`；

2. **按需导入第三方组件库**
	- 如 Element Plus、Ant Design Vue：使用官方按需导入插件（\`unplugin-vue-components\`），仅导入使用的组件；
	- js
	\`\`\`javascript
// vite.config.jsimport Components from 'unplugin-vue-components/vite';import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';export default {plugins: [Components({ resolvers: [ElementPlusResolver()] }),],};
\`\`\`

3. **外部化依赖（externals）**
   - 将大体积第三方库（如 Vue、React、Echarts）通过 CDN 引入，不打包到项目中；
   - Vite 配置：
   - js

   \`\`\`javascript
   \`\`\`

// vite.config.jsexport default {build: {rollupOptions: {external: ['vue', 'echarts'], // 外部化 vue 和 echarts},},};

\`\`\`
	- HTML 中引入 CDN：
	- html
	- 预览
	\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js"><\/script>
\`\`\`

#### 四、Chunk 拆分（优化加载策略）

1. **按路由拆分**
   - Vite/Webpack 自动支持，路由懒加载时会拆分为独立 chunk；
   - 示例（Vue3）：
   - js

   \`\`\`javascript
   \`\`\`

const Home = () => import('./views/Home.vue'); // 拆分为 home.[hash].js

\`\`\`

2. **拆分公共代码**
	- 将多个 chunk 共享的代码（如第三方库、通用组件）拆分为独立 chunk，避免重复打包；
	- Webpack 配置：
	- js
	\`\`\`javascript
// webpack.config.js
module.exports = {optimization: {splitChunks: {chunks: 'all', // 拆分同步/异步 chunkcacheGroups: {vendor: { // 拆分第三方库test: /[\\\\/]node_modules[\\\\/]/,name: 'vendors',chunks: 'all',},common: { // 拆分公共代码name: 'common',minChunks: 2, // 至少被 2 个 chunk 引用chunks: 'all',priority: -10,},},},},};
\`\`\`

\`\`\`
- Vite 配置：
- js
\`\`\`javascript
\`\`\`

// vite.config.jsexport default {build: {rollupOptions: {output: {manualChunks: {vendor: ['vue', 'vue-router'], // 拆分 vue 相关库为 vendor chunk},},},},};

\`\`\`

3. **限制 chunk 大小**
	- 避免单个 chunk 体积过大（如超过 500KB），拆分大 chunk 为多个小 chunk；
	- Vite 配置：
	- js
	\`\`\`javascript
// vite.config.jsexport default {build: {rollupOptions: {output: {chunkFileNames: 'js/[name]-[hash].js',entryFileNames: 'js/[name]-[hash].js',manualChunks(id) {// 拆分大库为独立 chunkif (id.includes('node_modules/echarts')) {return 'echarts';}},},},},};
\`\`\``;export{n as default};
