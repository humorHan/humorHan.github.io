const v=`### 26. vw/vh/vmin/vmax 的定义？移动端适配中 vw 的最优配置？

**答案**：

#### 定义：

- \`vw\`（Viewport Width）：视口宽度的 1/100（如视口宽 375px → 1vw=3.75px）；
- \`vh\`（Viewport Height）：视口高度的 1/100；
- \`vmin\`：vw 和 vh 中的较小值（如视口宽 375px、高 667px → 1vmin=3.75px）；
- \`vmax\`：vw 和 vh 中的较大值（同上例 → 1vmax=6.67px）。

#### 移动端 vw 最优配置：

以设计稿宽度 750px 为例（主流移动端设计稿尺寸）：

1. **基准换算**：750px 设计稿 → 1vw = 7.5px（750/100），因此设计稿中 100px = 100/7.5 ≈13.33vw；
2. **CSS 变量统一管理**：
3. css

\`\`\`css
:root {--design-width: 750; /* 设计稿宽度 */--vw: calc(100vw / var(--design-width));}/* 使用：设计稿中100px → 100 * var(--vw) */.box {width: calc(100 * var(--vw));height: calc(50 * var(--vw));font-size: calc(28 * var(--vw)); /* 字体不小于12px，需限制最小值 */}
\`\`\`

1. **字体限制**：通过 \`min()\` 函数避免字体过小（如 \`font-size: min(calc(28 * var(--vw)), 16px)\`）；
2. **适配刘海屏**：结合 \`viewport-fit=cover\`，并通过 \`safe-area-inset-bottom/top\` 调整边距，避免内容被遮挡；
3. **兜底方案**：对不支持 vw 的老旧浏览器（如 IE10-），降级为 rem 适配。`;export{v as default};
