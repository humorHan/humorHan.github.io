const n=`### 29. 移动端 1px 边框问题的根源？5 种解决方法？

**答案**：

#### 问题根源：

移动端设备的**物理像素** ≠ **CSS 像素**（存在设备像素比 DPR），如 Retina 屏（DPR=2），1 个 CSS 像素对应 2 个物理像素，此时设置 \`border: 1px\` 会渲染为 2 个物理像素，视觉上边框变粗（约 2px），即 “1px 边框变粗问题”。

#### 5 种解决方法：

##### 方法 1：使用 transform: scale 缩放

css

\`\`\`css
.border-1px {position: relative;border: none; /* 隐藏默认边框 */}.border-1px::after {content: "";position: absolute;bottom: 0;left: 0;width: 100%;height: 1px;background: #000;transform: scaleY(0.5); /* DPR=2时缩放为0.5，DPR=3时缩放为1/3 */transform-origin: left bottom; /* 避免缩放偏移 */}
\`\`\`

**优势**：兼容性好；**不足**：需根据 DPR 调整缩放比例。

##### 方法 2：使用 viewport 适配（动态设置 scale）

通过 JS 动态修改 viewport 的 \`initial-scale\`，让 1CSS 像素 = 1 物理像素：

js

\`\`\`javascript
const dpr = window.devicePixelRatio;const scale = 1 / dpr;const meta = document.querySelector('meta[name="viewport"]');
meta.setAttribute('content', \`width=device-width, initial-scale=\${scale}, maximum-scale=\${scale}\`);
\`\`\`

**优势**：全局生效；**不足**：需配合 rem 适配，字体 / 布局需重新计算。

##### 方法 3：使用 border-image

准备 1px 宽的边框图片（PNG/SVG），通过 \`border-image\` 渲染：

css

\`\`\`css
.border-1px {border-width: 0 0 1px 0;border-image: url("1px-border.png") 0 0 1 0 stretch;}
\`\`\`

**优势**：支持复杂边框样式；**不足**：需额外图片资源。

##### 方法 4：使用 CSS 变量 + 媒体查询适配 DPR

css

\`\`\`css
:root {--border-scale: 1;}@media (-webkit-min-device-pixel-ratio: 2) {:root { --border-scale: 0.5; }}@media (-webkit-min-device-pixel-ratio: 3) {:root { --border-scale: 0.333; }}.border-1px {position: relative;border: none;}.border-1px::after {content: "";position: absolute;width: 100%;height: 1px;background: #000;transform: scaleY(var(--border-scale));}
\`\`\`

**优势**：自动适配不同 DPR；**不足**：代码稍复杂。

##### 方法 5：使用 box-shadow 模拟 1px 边框

css

\`\`\`css
.border-1px {box-shadow: 0 -1px 0 0 #000; /* 下边框，阴影高度1px */}
\`\`\`

**优势**：简单；**不足**：阴影有模糊效果，视觉上不如真实边框清晰。`;export{n as default};
