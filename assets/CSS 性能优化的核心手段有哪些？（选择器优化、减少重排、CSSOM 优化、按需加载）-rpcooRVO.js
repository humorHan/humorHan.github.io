const n=`### 11. CSS 性能优化的核心手段有哪些？（选择器优化、减少重排、CSSOM 优化、按需加载）

**答案：**CSS 优化核心是 “减少浏览器解析 / 渲染耗时，避免触发重排 / 重绘”，核心手段如下：

#### 一、选择器优化（减少 CSSOM 构建耗时）

浏览器解析 CSS 选择器是**从右到左**匹配，需减少匹配复杂度：

1. **避免深层嵌套**：如 \`.parent .child .item\` → 改为 \`.list-item\`（类名扁平化）；
2. **避免通配符 / 低效选择器**：如 \`*\`、\`div\`、\`[class^="box"]\`，优先用类选择器（\`.box\`）；
3. **避免 ID 选择器嵌套**：ID 选择器是唯一的，无需嵌套（如 \`#parent #child\` → \`#child\`）；
4. **减少选择器长度**：选择器越长，匹配耗时越高（如 \`.a .b .c .d\` → 简化为 \`.d-item\`）。

#### 二、减少重排 / 重绘（核心）

1. **动画用 transform/opacity**：这两个属性仅触发合成层，不重排 / 重绘（避免用 top/left/width 做动画）；
2. **避免频繁修改样式**：用 class 批量修改样式，而非逐个修改 style 属性；
3. **固定元素尺寸**：图片 / 容器提前设置宽高，避免加载后尺寸变化触发重排；
4. **使用 will-change**：告知浏览器元素即将动画，提前优化：
5. css

\`\`\`css
.animate {will-change: transform; /* 浏览器提前为 transform 分配资源 */}
\`\`\`

1. **减少 CSS 表达式**：如 \`calc()\` 尽量简化，避免嵌套复杂计算。

#### 三、CSSOM 优化（加快 CSS 解析）

1. **减少 CSS 文件体积**：

   - 压缩 CSS（如 CleanCSS、PostCSS 压缩）；
   - 移除无用 CSS（如 PurgeCSS 清除未使用的样式）；
2. **关键 CSS 内联**：将首屏渲染必需的 CSS 内联到 \`<head>\` 中，避免外部 CSS 阻塞渲染：
3. html
4. 预览

\`\`\`html
<head><style>/* 首屏关键 CSS */.header { height: 60px; }.main { padding: 20px; }</style><!-- 非关键 CSS 异步加载 --><link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'"></head>
\`\`\`

1. **避免 @import 导入 CSS**：\`@import\` 会阻塞 CSS 解析（需等待导入的文件加载完成），改用 link 标签并行加载；
2. **CSS 文件按需拆分**：按路由 / 页面拆分 CSS，仅加载当前页面需要的样式（如 Vue 的 scoped CSS、CSS Modules）。

#### 四、按需加载 / 懒加载 CSS

1. **媒体查询加载**：为不同设备加载不同 CSS：
2. html
3. 预览

\`\`\`html
<link rel="stylesheet" href="mobile.css" media="(max-width: 600px)"><link rel="stylesheet" href="pc.css" media="(min-width: 601px)">
\`\`\`

1. **异步加载非关键 CSS**：
2. html
3. 预览

\`\`\`html
<!-- 方法 1：media + onload --><link rel="stylesheet" href="lazy.css" media="print" onload="this.media='all'"><!-- 方法 2：动态加载 --><script>const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'lazy.css';window.addEventListener('load', () => {document.head.appendChild(link);});<\/script>
\`\`\`

1. **组件级 CSS 按需引入**：如 Vue 中使用 \`scoped\` 或 CSS Modules，仅加载组件相关样式。

#### 五、其他优化手段

1. **使用 CSS 预处理器优化**：Less/Sass 中使用混合（mixin）、变量，减少重复代码，编译时压缩；
2. **避免 CSS 滤镜 / 阴影过度使用**：\`filter: blur()\`、\`box-shadow\` 等会增加 GPU 消耗，简化复杂效果；
3. **字体图标替代图片图标**：减少图片请求，且矢量图标缩放不失真。`;export{n as default};
