const n=`### 什么是 HTML 微数据（Microdata）？在 SEO 中的作用？

**答案**：HTML 微数据是一种给 HTML 元素添加结构化元数据的规范，通过 \`itemscope\`（声明结构化数据块）、\`itemtype\`（指定数据类型，如 [Schema.org](https://schema.org/) 的 Person/Product）、\`itemprop\`（指定数据属性），让搜索引擎更精准解析页面内容。

#### SEO 作用：

- 提升搜索结果的 “富摘要” 展示（如商品显示价格 / 评分、文章显示发布时间、餐厅显示地址 / 电话）；
- 增强搜索引擎对内容的理解，提升相关关键词的排名；
- 支持语音搜索、智能问答等场景的内容解析。

#### 示例（商品微数据）：

\`\`\`html
<div itemscope itemtype="https://schema.org/Product">
  <h1 itemprop="name">小米14</h1>
  <p>价格：<span itemprop="price">3999</span>元</p>
  <p>评分：<span itemprop="ratingValue">4.9</span>分</p>
</div>
\`\`\``;export{n as default};
