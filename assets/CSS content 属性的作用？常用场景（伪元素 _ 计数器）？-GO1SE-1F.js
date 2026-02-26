const n=`### 34. CSS content 属性的作用？常用场景（伪元素 / 计数器）？

**答案**：

#### 核心作用：

\`content\` 属性仅用于 CSS 伪元素（\`::before\`/\`::after\`），用于生成虚拟内容（文字 / 图片 / 计数器等），生成的内容属于 DOM 不可见节点（无法通过 JS 获取）。

#### 常用场景：

##### 1. 生成文字内容

\`\`\`css
/* 添加图标文字 */.btn::before {content: "✓";margin-right: 8px;}/* 生成attr属性值（如图片alt） */.img-alt::after {content: attr(alt);display: block;text-align: center;}
\`\`\`

##### 2. 生成图片 / 特殊符号

css

\`\`\`css
/* 生成图片 */.icon::before {content: "";display: inline-block;width: 20px;height: 20px;background: url("icon.png") no-repeat;}/* 生成特殊符号（Unicode） */.arrow::after {content: "\\2192"; /* 右箭头Unicode */color: #007bff;}
\`\`\`

##### 3. 计数器（counter-reset/counter-increment/counter ()）

用于生成有序编号（如章节号 / 列表序号），替代 HTML 的 \`<ol>\`：

css

\`\`\`css
/* 初始化计数器 */.article {counter-reset: chapter; /* 计数器名：chapter，初始值0 */}/* 递增计数器 */.article h2::before {counter-increment: chapter; /* 每次触发递增1 */content: "第" counter(chapter) "章："; /* 显示计数器值 */}/* 嵌套计数器（如章-节） */.article {counter-reset: chapter 0 section 0;}.article h2::before {counter-increment: chapter;content: counter(chapter) "、";counter-reset: section 0; /* 章节重置小节计数器 */}.article h3::before {counter-increment: section;content: counter(chapter) "." counter(section) "、";}
\`\`\`

##### 4. 清除浮动（伪元素 + content）

css

\`\`\`css
.clearfix::after {content: ""; /* 空内容 */display: block;clear: both;}
\`\`\``;export{n as default};
