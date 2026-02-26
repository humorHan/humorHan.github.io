const n=`### 5. 懒加载和预加载的区别是什么？各自的使用场景和实现方式有哪些？

**答案：**

#### 一、核心区别

#### 二、懒加载

##### 1. 使用场景

- 长列表图片 / 视频（如电商商品列表、资讯页图片）；
- 非首屏的组件 / 路由（如 Vue/React 路由懒加载）；
- 第三方插件（如富文本编辑器、图表库，仅在使用时加载）；
- 分页数据（滚动到底部再加载下一页）。

##### 2. 实现方式

- **图片 / 视频懒加载**：

  - 原生方式：\`loading="lazy"\`（现代浏览器支持）；
  - 手动实现：\`IntersectionObserver\` 监听元素是否进入视口（兼容低版本用 \`scroll\` 事件）；
- **路由懒加载（Vue3）**：
- js

\`\`\`javascript
const Home = () => import('./views/Home.vue'); // 异步加载路由组件const router = createRouter({routes: [{ path: '/', component: Home }]});
\`\`\`

- **组件懒加载（Vue3）**：
- vue

\`\`\`
<template>
  <Suspense>
    <template #default>
      <LazyComponent />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>
<script setup>
const LazyComponent = defineAsyncComponent(() => import('./LazyComponent.vue'));
<\/script>
\`\`\`

#### 三、预加载

##### 1. 使用场景

- 首屏后续会用到的资源（如首屏渲染后立即需要的图片、JS）；
- 用户大概率会触发的操作对应的资源（如点击按钮后需要的弹窗组件、下一页数据）；
- 预加载字体 / 关键 CSS（避免字体加载导致的布局偏移）。

##### 2. 实现方式

- **资源预加载（preload）**：提升资源加载优先级，提前加载：
- html
- 预览

\`\`\`html
<link rel="preload" href="critical-font.woff2" as="font" crossorigin><link rel="preload" href="next-page.js" as="script">
\`\`\`

- **DNS 预解析（dns-prefetch）**：提前解析跨域域名：
- html
- 预览

\`\`\`html
<link rel="dns-prefetch" href="https://api.example.com">
\`\`\`

- **预连接（preconnect）**：提前建立与服务器的连接：
- html
- 预览

\`\`\`html
<link rel="preconnect" href="https://cdn.example.com">
\`\`\`

- **手动预加载数据**：页面加载完成后，空闲时预加载下一页数据：
- js

\`\`\`javascript
window.addEventListener('load', () => {// 空闲时预加载下一页数据requestIdleCallback(() => {fetch('/api/next-page-data').then(res => res.json()).then(data => {window.nextPageData = data; // 缓存数据，点击下一页时直接使用});});});
\`\`\``;export{n as default};
