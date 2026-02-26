const n=`### 25. 实现单行 / 多行文字超出显示省略号的 CSS 方案？兼容性处理？

**答案**：

#### 1. 单行文字省略号

css

\`\`\`css
.single-ellipsis {width: 200px; /* 需固定宽度（或最大宽度） */white-space: nowrap; /* 强制不换行 */overflow: hidden; /* 隐藏超出内容 */text-overflow: ellipsis; /* 超出显示省略号 */}
\`\`\`

**兼容性**：所有主流浏览器（IE6+）均支持，无兼容问题。

#### 2. 多行文字省略号（webkit 内核专属）

css

\`\`\`css
.multi-ellipsis {width: 200px;display: -webkit-box; /* 弹性盒模型（webkit私有） */-webkit-line-clamp: 3; /* 显示3行 */-webkit-box-orient: vertical; /* 垂直排列 */overflow: hidden;text-overflow: ellipsis;}
\`\`\`

**兼容性**：仅支持 Chrome/Safari/Edge（webkit 内核），不支持 Firefox/IE。

#### 3. 通用兼容方案（适配所有浏览器）

需结合 JS 实现：

- 核心思路：获取文字内容，逐步截断并添加省略号，直到元素高度 ≤ 目标行数的高度；
- 第三方库：可直接使用 \`clamp.js\`/\`text-overflow-ellipsis\` 等成熟库，简化开发。

#### 兼容性兜底：

- 对非 webkit 内核浏览器（如 Firefox），可降级为 “最后一行显示省略号” 或 “直接截断”；
- 移动端优先使用 webkit 方案（主流移动端浏览器均为 webkit 内核），PC 端搭配 JS 兜底。`;export{n as default};
