const n=`### 移动端适配的核心方案？（rem/vw/vh/ 媒体查询 / 动态视口）各自原理？

**答案**：

#### rem 适配

- 原理：rem 是相对单位（1rem = 根元素 \`<html>\` 的 font-size），通过 JS 动态设置 \`<html>\` 的 font-size（如按屏幕宽度的 1/10 设置），实现元素尺寸随屏幕宽度等比缩放；
- 示例：屏幕宽度 375px → \`html { font-size: 37.5px; }\` → 1rem=37.5px，元素宽 1rem=37.5px；
- 优点：兼容性好（IE9+）；缺点：需 JS 动态计算，存在闪屏风险。

#### vw/vh 适配

- 原理：vw（视口宽度的 1/100）、vh（视口高度的 1/100），直接基于视口尺寸，无需 JS；
- 示例：屏幕宽度 375px → 1vw=3.75px，元素宽 10vw=37.5px；
- 优点：无需 JS，简洁；缺点：IE11 + 支持，部分老机型兼容差。

#### 媒体查询（Media Query）

- 原理：根据不同屏幕宽度设置不同样式（如宽度 < 768px 时调整字体 / 布局）；
- 示例：
- css

\`\`\`css
@media (max-width: 768px) { .box { width: 100%; } }@media (min-width: 768px) { .box { width: 50%; } }
\`\`\`

- 优点：适配精准，无 JS 依赖；缺点：需写多套样式，维护成本高。

#### 动态视口（viewport）

- 原理：通过 \`meta viewport\` 设置 \`width=device-width\`，让视口宽度等于设备宽度，配合百分比 / 弹性布局；
- 示例：\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`；
- 优点：基础适配，所有方案的前提；缺点：仅解决视口问题，需配合其他方案。

#### Flex/Grid 适配

- 原理：使用弹性盒 / 网格布局，让元素自动适配容器宽度（如 \`flex: 1\` 等分）；
- 优点：无需计算尺寸，适配自然；缺点：需配合其他方案处理细节。`;export{n as default};
