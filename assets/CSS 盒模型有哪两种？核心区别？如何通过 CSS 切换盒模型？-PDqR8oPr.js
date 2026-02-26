const n=`### CSS 盒模型有哪两种？核心区别？如何通过 CSS 切换盒模型？

**答案**：CSS 盒模型是元素布局的基础，包含内容区（content）、内边距（padding）、边框（border）、外边距（margin），分两种：

#### 标准盒模型（W3C 盒模型）

- 宽度 / 高度：仅包含 \`content\`（内容区）；
- 计算方式：\`width = content-width\`，\`height = content-height\`。

#### 怪异盒模型（IE 盒模型）

- 宽度 / 高度：包含 \`content + padding + border\`；
- 计算方式：\`width = content-width + padding + border\`，\`height = content-height + padding + border\`。

#### 切换方式：

通过 \`box-sizing\` 属性切换：

- \`box-sizing: content-box\`：标准盒模型（默认值）；
- \`box-sizing: border-box\`：怪异盒模型（开发中常用，便于布局计算）。`;export{n as default};
