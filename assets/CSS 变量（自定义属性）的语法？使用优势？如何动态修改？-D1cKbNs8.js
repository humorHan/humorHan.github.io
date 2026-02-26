const n=`### CSS 变量（自定义属性）的语法？使用优势？如何动态修改？

**答案**：

#### 语法：

- 定义：\`--变量名: 值;\`（变量名区分大小写，需在选择器内定义）；
- css

\`\`\`css
:root { /* 全局变量（根元素） */--primary-color: #007bff;--font-size: 16px;}.box { /* 局部变量 */--box-width: 200px;}
\`\`\`

- 使用：\`var(--变量名, 默认值)\`（默认值可选，变量不存在时生效）；
- css

\`\`\`css
.box {color: var(--primary-color, #333);width: var(--box-width);font-size: var(--font-size);}
\`\`\`

#### 使用优势：

1. 统一管理样式（如主题色 / 字体大小，修改一处生效全局）；
2. 减少样式冗余（避免重复写相同值）；
3. 支持动态修改（JS 可操作）；
4. 支持继承（子元素可继承父元素的变量）；
5. 适配响应式（媒体查询中修改变量，全局样式自动适配）。

#### 动态修改：

1. **CSS 中修改**（媒体查询 / 伪类）：
2. css

\`\`\`css
@media (max-width: 768px) {:root { --font-size: 14px; }}.box:hover { --primary-color: #0056b3; }
\`\`\`

1. **JS 中修改**：
2. js

\`\`\`javascript
// 修改全局变量
document.documentElement.style.setProperty('--primary-color', '#ff0000');// 修改局部变量
document.querySelector('.box').style.setProperty('--box-width', '300px');// 获取变量值const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
\`\`\``;export{n as default};
