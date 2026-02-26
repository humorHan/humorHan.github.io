const n=`### 减少 HTTP 请求数的核心手段有哪些？（资源合并、内联关键资源、雪碧图）

**答案：**减少 HTTP 请求数是前端性能优化的核心手段（HTTP 请求建立 / 传输有固定开销），核心手段如下：

#### 一、资源合并（合并同类资源）

1. **JS/CSS 合并**
	- 构建工具自动合并：Vite/Webpack 将多个 JS/CSS 文件打包为少数几个 chunk；
	- 手动合并：非构建项目将多个小 JS/CSS 文件合并为一个（如 \`common.js\`、\`main.css\`）；
	- 核心原则：合并首屏必需的资源，非首屏资源异步加载，避免合并后的文件体积过大。

2. **第三方库合并**
	- 将多个第三方库（如 Vue、Vue Router、Axios）合并为一个 \`vendor.js\`，避免多个独立请求；
	- 示例（Webpack）：通过 \`splitChunks\` 将第三方库合并为 \`vendors.js\`。

#### 二、内联关键资源（消除请求）

1. **内联关键 CSS**
	- 将首屏渲染必需的 CSS 内联到 HTML 的 \`<style>\` 中，避免外部 CSS 请求阻塞渲染；
	- 示例：
	- html
	- 预览
	\`\`\`html
<head><style>/* 首屏关键 CSS */body { margin: 0; padding: 0; }.header { height: 60px; background: #fff; }</style><!-- 非关键 CSS 异步加载 --><link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'"></head>
\`\`\`

2. **内联关键 JS**
   - 将首屏必需的 JS（如初始化逻辑、埋点基础库）内联到 \`<script>\` 中，避免外部 JS 请求；
   - 示例：
   - html
   - 预览

   \`\`\`html
   \`\`\`

<script>// 首屏初始化逻辑const initApp = () => {console.log('初始化首屏');};initApp();<\/script>

\`\`\`

3. **内联小图片（Data URI）**
	- 将小图片（<10KB，如图标、背景图）转为 Data URI 内联到 CSS/HTML 中，消除图片请求；
	- 示例：
	- css
	\`\`\`css
.icon {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAA...);}
\`\`\`

\`\`\`
- 注意：仅用于小图片，大图片内联会增加 HTML/CSS 体积，得不偿失。
\`\`\`

#### 三、图片优化（减少图片请求）

1. **雪碧图（Sprite）**
   - 将多个小图标 / 小图片合并为一张大图，通过 \`background-position\` 显示不同部分，减少图片请求数；
   - 工具：webpack-spritesmith、在线雪碧图生成工具；
   - （最近几年几乎已经不用了）

   \`\`\`css
   \`\`\`

.icon-home {background: url(sprite.png) 0 0 no-repeat;width: 20px;height: 20px;}.icon-user {background: url(sprite.png) -20px 0 no-repeat;width: 20px;height: 20px;}

\`\`\`
	- 注意：雪碧图适合静态小图标，动态图标 / 大图片不适用。

2. **字体图标替代图片图标**
	- 使用 Iconfont、Font Awesome 等字体图标，一个字体文件替代多个图片图标，仅需一次请求；
	- 优势：矢量缩放不失真，支持颜色 / 大小自定义，请求数少。

3. **响应式图片合并**
	- 不同尺寸的响应式图片合并为一张（如移动端 / PC 端图片），通过 CSS 控制显示区域，减少请求。

#### 四、其他减少请求的手段

1. **使用 CSS 替代图片**
	- 简单的图形（如圆角、阴影、渐变、小图标）用 CSS 实现，避免图片请求；
	- 示例：用 \`border-radius\` 实现圆形头像，用 \`linear-gradient\` 实现渐变背景。

2. **缓存复用请求结果**
	- 接口数据缓存：用 localStorage/IndexedDB 缓存接口返回数据，避免重复请求；
	- 资源缓存：配置 HTTP 强缓存 / 协商缓存，复用已缓存的资源。

3. **延迟加载非关键资源**
	- 首屏只加载核心资源，非首屏资源（如底部图片、侧边栏组件）在页面加载完成后异步加载；
	- 示例：图片懒加载、路由懒加载、组件懒加载。

4. **减少第三方请求**
	- 合并第三方脚本：将多个第三方脚本（如统计、广告、埋点）合并为一个；
	- 移除无用第三方脚本：删除未使用的统计、广告插件，减少请求。`;export{n as default};
