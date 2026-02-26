const n=`### 解释 CSS 的层叠（Cascade）、继承（Inheritance）、特异性（Specificity）？

**答案**：

#### 层叠（Cascade）

CSS 的核心机制，指多个样式规则作用于同一元素时，按 “优先级 + 书写顺序” 决定最终生效的样式。层叠优先级从高到低：

- 作者样式（开发者写的 CSS）> 用户样式（浏览器用户自定义）> 浏览器默认样式；
- 同一优先级下，后写的样式覆盖先写的；
- \`!important\` 提升属性优先级（需谨慎使用）。

#### 继承（Inheritance）

子元素自动继承父元素的某些 CSS 属性，减少重复代码。

- 可继承属性：字体相关（font-size/font-family）、文本相关（color/line-height）、列表相关（list-style）等；
- 不可继承属性：盒模型相关（width/height/margin/padding/border）、定位相关（position/top/left）、背景相关（background）等；
- 强制继承：\`inherit\` 关键字（如 \`border: inherit\` 让子元素继承父元素边框）。

#### 特异性（Specificity）

即选择器权重，用于判断多个选择器作用于同一元素时的优先级（详见第 1 题优先级规则）。特异性越高，样式越优先生效；权重相同则后写的生效。`;export{n as default};
