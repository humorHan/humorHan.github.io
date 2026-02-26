const n=`### 如何实现一个「图片懒加载」的功能？原理是什么？有哪些实现方式？（高频 ）

答：

#### 一、图片懒加载的核心原理

图片懒加载是**前端性能优化核心方案**，核心逻辑：页面初始化时，**不加载可视区域外的图片**，只加载当前能看到的图片；当用户滚动页面，图片进入可视区域后，再去加载图片资源，减少首屏请求数，提升页面加载速度。

#### 二、两种主流实现方式（答全 + 手写核心代码，面试满分）

1. ✅ 方式 1：原生 JS 实现（基础版，校招手写考点），核心用「滚动监听 + 可视区域判断」：
   - 步骤 1：img 标签的 src 写占位图，真实地址存在 \`data-src\` 属性中：\`<img src="占位图.png" data-src="真实图片地址.jpg" class="lazy-img">\`
   - 步骤 2：JS 核心代码：
   - javascript
   - 运行

   \`\`\`
   \`\`\`

const imgs = document.querySelectorAll('.lazy-img');window.addEventListener('scroll', lazyLoad);function lazyLoad() {
imgs.forEach(img => {// 判断图片是否进入可视区域 const rect = img.getBoundingClientRect();if (rect.top < window.innerHeight && rect.bottom > 0) {
img.src = img.dataset.src; // 赋值真实地址
img.removeEventListener('load', lazyLoad); // 加载完成后解绑监听}})}

\`\`\`

2. ✅ 方式 2：原生 API 实现（最优，项目首选），使用 \`IntersectionObserver\` 交叉观察器，**无需监听滚动事件，性能更好**，无兼容性问题（现代浏览器全支持），社招必须答出这个加分：

3. javascript

4. 运行

\`\`\`

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {if (entry.isIntersecting) {const img = entry.target;
img.src = img.dataset.src;
observer.unobserve(img);}})});document.querySelectorAll('.lazy-img').forEach(img => observer.observe(img));

\`\`\`

> 补充考点：Vue/React 项目中，可直接使用封装好的懒加载插件（vue-lazyload/react-lazyload），开发效率更高。`;export{n as default};
