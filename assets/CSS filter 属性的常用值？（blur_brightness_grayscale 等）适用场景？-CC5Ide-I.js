const r=`### 32. CSS filter 属性的常用值？（blur/brightness/grayscale 等）适用场景？

**答案**：CSS \`filter\`（滤镜）用于对元素（图片 / 文字 / 容器）进行视觉效果处理，常用值及场景：

#### 示例：

css

\`\`\`css
/* 图片毛玻璃背景 */.bg-blur {filter: blur(8px);backdrop-filter: blur(8px); /* 仅模糊背景，不模糊内容 */}/* 页面置灰 */body {filter: grayscale(1);}/* 透明图片添加阴影 */.img-shadow {filter: drop-shadow(2px 2px 4px #333);}/* 多滤镜组合（空格分隔） */.img-filter {filter: brightness(1.2) contrast(1.1) saturate(1.3);}
\`\`\``;export{r as default};
