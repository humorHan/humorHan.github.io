const n=`### 什么是 ARIA？在 HTML 中使用 ARIA 的核心目的？

**答案**：ARIA（Accessible Rich Internet Applications）是 W3C 制定的无障碍访问规范，通过给 HTML 元素添加 \`aria-*\` 属性，补充元素的语义和状态，让屏幕阅读器等辅助技术能精准识别动态内容 / 交互组件。

#### 核心目的：

- 增强非语义化元素的可访问性（如 \`<div role="button">\` 将 div 声明为按钮，屏幕阅读器可识别）；
- 描述元素的状态（如 \`aria-expanded="false"\` 表示下拉菜单未展开）；
- 关联元素关系（如 \`aria-labelledby\` 关联标签和组件）；
- 适配动态交互组件（如弹窗、轮播、表单验证提示）。

#### 示例：

\`\`\`html
<button aria-expanded="false" aria-controls="menu">菜单</button>
<ul id="menu" aria-hidden="true">
  <li>选项1</li>
  <li>选项2</li>
</ul>
\`\`\``;export{n as default};
