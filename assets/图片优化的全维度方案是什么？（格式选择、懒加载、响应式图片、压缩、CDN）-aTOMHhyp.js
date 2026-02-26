const n=`### 3. 图片优化的全维度方案是什么？（格式选择、懒加载、响应式图片、压缩、CDN）

**答案：**图片是前端资源中体积占比最高的部分，优化需覆盖**格式、加载、适配、压缩、分发**全维度：

#### 一、格式选择（按场景选最优格式）

- 降级处理：通过 \`picture\` 标签兼容低版本浏览器：
- html
- 预览

\`\`\`html
<picture><source srcset="image.avif" type="image/avif"><source srcset="image.webp" type="image/webp"><img src="image.jpg" alt="示例"></picture>
\`\`\`

#### 二、懒加载（延迟加载非首屏图片）

1. **原生懒加载**：简单高效，兼容现代浏览器：
2. html
3. 预览

\`\`\`html
<img src="image.jpg" loading="lazy" alt="懒加载">
\`\`\`

1. **手动实现**：监听 \`IntersectionObserver\` 检测图片是否进入视口，再加载：
2. js

\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {if (entry.isIntersecting) {const img = entry.target;
      img.src = img.dataset.src; // 从 data-src 读取真实地址
      observer.unobserve(img);}});});document.querySelectorAll('img.lazy').forEach(img => observer.observe(img));
\`\`\`

- 适用场景：长列表图片、非首屏图片。

#### 三、响应式图片（适配不同设备）

1. **srcset + sizes**：根据屏幕分辨率 / 宽度加载不同尺寸图片：
2. html
3. 预览

\`\`\`html
<img 
  srcset="image-400w.jpg 400w, image-800w.jpg 800w" 
  sizes="(max-width: 600px) 400px, 800px" 
  src="image-400w.jpg" 
  alt="响应式">
\`\`\`

1. **picture 标签**：结合格式 + 尺寸适配（如移动端加载小图，PC 加载大图）。

#### 四、压缩（减少文件体积）

1. **工具压缩**：

   - 在线工具：TinyPNG、Squoosh（Google 出品）；
   - 构建工具：webpack 的 \`image-webpack-loader\`、Vite 的 \`vite-plugin-imagemin\`；
2. **质量控制**：JPG/WebP 调整压缩质量（如 80% 质量，视觉无明显损失）；
3. **裁剪**：只保留需要的区域，避免加载全图后再裁剪。

#### 五、CDN 分发（加快加载速度）

1. **静态图片部署到 CDN**：利用边缘节点就近访问，降低网络延迟；
2. **CDN 图片处理**：使用 CDN 提供的图片处理服务（如按尺寸裁剪、转换格式），动态生成适配图片（如 \`https://cdn.example.com/image.jpg?w=800&format=webp\`）。`;export{n as default};
