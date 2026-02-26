const n=`### 2. 首屏加载优化的核心手段有哪些？（从网络、资源、渲染角度）

**答案：**首屏加载优化需从**网络传输、资源处理、渲染流程**三个维度切入，核心手段如下：

#### 一、网络角度（减少传输耗时）

1. **HTTP 缓存优化**：配置强缓存（Cache-Control、Expires）和协商缓存（ETag、Last-Modified），避免重复请求资源。
2. **CDN 加速**：将静态资源（JS/CSS/ 图片）部署到 CDN，利用边缘节点就近分发，降低网络延迟。
3. **HTTP/2/HTTP/3 升级**：启用多路复用、头部压缩、服务器推送等特性，提升请求效率。
4. **域名预解析（dns-prefetch）**：提前解析跨域域名，减少 DNS 查询耗时：
5. html
6. 预览

\`\`\`html
<link rel="dns-prefetch" href="https://cdn.example.com">
\`\`\`

1. **减少请求数**：资源合并（JS/CSS 打包）、雪碧图、内联关键资源（首屏关键 CSS/JS 内联到 HTML）。

#### 二、资源角度（减少资源体积 / 加载优先级）

1. **资源压缩**：JS/CSS 代码压缩（Terser/CleanCSS）、图片压缩（WebP/AVIF）、Gzip/Brotli 压缩（服务端配置）。
2. **代码分割（Code Splitting）**：按路由 / 组件拆分代码，首屏只加载核心代码，非首屏代码异步加载（如 Webpack 分割、Vue/React 路由懒加载）。
3. **按需加载**：第三方库按需引入（如 Element Plus 按需导入组件），避免全量引入。
4. **预加载 / 预连接**：对首屏关键资源用 \`preload\` 提升优先级，对跨域资源用 \`preconnect\` 提前建立连接：
5. html
6. 预览

\`\`\`html
<link rel="preload" href="main.js" as="script"><link rel="preconnect" href="https://cdn.example.com">
\`\`\`

1. **移除无用资源**：Tree Shaking 清除未使用的代码，删除冗余依赖。

#### 三、渲染角度（加快首次渲染）

1. **关键 CSS 内联**：将首屏渲染必需的 CSS 内联到 \`<style>\` 中，避免外部 CSS 阻塞渲染。
2. **JS 异步加载**：非首屏 JS 用 \`async/defer\` 加载，避免阻塞 DOM 解析和渲染：
3. html
4. 预览

\`\`\`html
<script src="async.js" async><\/script> <!-- 异步加载，加载完成立即执行 --><script src="defer.js" defer><\/script> <!-- 异步加载，DOM 解析完成后执行 -->
\`\`\`

1. **避免渲染阻塞**：\`<link rel="stylesheet">\` 放在 \`<head>\`，非关键 JS 放在 \`<body>\` 底部。
2. **服务端渲染（SSR）/ 静态站点生成（SSG）**：首屏由服务端渲染完整 HTML，避免客户端渲染的白屏时间（如 Next.js、Nuxt.js）。
3. **骨架屏 / 加载占位**：先渲染骨架屏，提升用户感知性能，掩盖真实加载延迟。`;export{n as default};
