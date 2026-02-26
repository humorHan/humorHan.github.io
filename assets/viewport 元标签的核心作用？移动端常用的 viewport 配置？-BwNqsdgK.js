const e=`### viewport 元标签的核心作用？移动端常用的 viewport 配置？

**答案**：viewport（视口）是浏览器显示页面内容的区域，移动端默认 viewport 宽度为 980px（适配 PC 页面），导致移动端页面缩放显示，viewport 元标签用于自定义移动端视口尺寸和缩放规则。

#### 移动端常用配置：

\`\`\`html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
\`\`\`

参数说明：

- \`width=device-width\`：视口宽度等于设备屏幕宽度；
- \`initial-scale=1.0\`：初始缩放比例为 1（无缩放）；
- \`maximum-scale=1.0\`：最大缩放比例为 1；
- \`user-scalable=no\`：禁止用户手动缩放（可选，部分场景如支付页需开启）；
- \`viewport-fit=cover\`：适配 iPhone X 及以上的刘海屏（避免内容被刘海遮挡）。`;export{e as default};
