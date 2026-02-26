const n=`### 6. 前端缓存优化的体系是什么？（HTTP 缓存、浏览器缓存、Service Worker 缓存、本地存储）

**答案：**前端缓存体系按 “缓存位置 / 层级” 可分为 **HTTP 缓存（网络层）、浏览器内存 / 磁盘缓存（存储层）、Service Worker 缓存（代理层）、本地存储（应用层）**，核心是 “尽可能复用资源，减少网络请求”。

#### 一、HTTP 缓存（最核心，分为强缓存 + 协商缓存）

##### 1. 强缓存（本地缓存，不发请求）

- 原理：服务器返回响应头，告知浏览器资源有效期，有效期内直接用本地缓存；
- 核心响应头：

  - \`Cache-Control\`（主流）：\`max-age=3600\`（有效期 3600 秒）、\`public\`（允许 CDN / 代理缓存）、\`private\`（仅浏览器缓存）、\`no-cache\`（跳过强缓存，走协商缓存）、\`no-store\`（不缓存）；
  - \`Expires\`（旧版，HTTP/1.0）：绝对时间（如 \`Expires: Wed, 22 Dec 2025 12:00:00 GMT\`），优先级低于 \`Cache-Control\`；
- 适用场景：静态资源（JS/CSS/ 图片），版本号不变的资源。

##### 2. 协商缓存（发请求，验证资源是否过期）

- 原理：强缓存失效后，浏览器发送请求到服务器，服务器通过响应头验证资源是否变化，未变化则返回 304，使用本地缓存；
- 核心响应头 / 请求头：

  - \`Last-Modified + If-Modified-Since\`：基于文件修改时间（精度秒，存在误差）；
  - \`ETag + If-None-Match\`：基于文件内容哈希（精度高，优先级更高）；
- 适用场景：频繁更新的资源（如接口数据、动态页面）。

#### 二、浏览器缓存（内存缓存 / 磁盘缓存）

- **内存缓存（Memory Cache）**：资源缓存到内存，速度极快，页面关闭后释放（如频繁使用的 JS/CSS）；
- **磁盘缓存（Disk Cache）**：资源缓存到硬盘，速度稍慢，持久化（如大文件、不常变化的资源）；
- 浏览器缓存规则：先查内存缓存 → 再查磁盘缓存 → 最后走 HTTP 缓存 / 网络请求。

#### 三、Service Worker 缓存（离线缓存，可编程）

- 原理：独立于主线程的后台脚本，可拦截网络请求，自定义缓存策略（缓存 / 读取 / 更新资源）；
- 核心特性：支持离线访问、缓存动态资源（如接口数据）、精准控制缓存规则；
- 实现步骤：

  1. 注册 Service Worker：
  2. js

  \`\`\`javascript
  \`\`\`

if ('serviceWorker' in navigator) {navigator.serviceWorker.register('/sw.js').then(registration => {console.log('SW 注册成功');});}

\`\`\`
	1. 在 \`sw.js\` 中定义缓存策略：
	2. js
	\`\`\`javascript
const CACHE_NAME = 'my-cache-v1';// 安装时缓存核心资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {return cache.addAll(['/', '/index.html', '/main.js']);}));});// 拦截请求，优先使用缓存
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {return response || fetch(event.request); // 缓存有则用，无则请求网络}));});
\`\`\`

- 适用场景：PWA 应用、需要离线访问的页面、动态接口数据缓存。

#### 四、本地存储（应用层缓存，存储业务数据）

- 注意：避免存储敏感数据，定期清理过期数据，防止占用过多空间。`;export{n as default};
