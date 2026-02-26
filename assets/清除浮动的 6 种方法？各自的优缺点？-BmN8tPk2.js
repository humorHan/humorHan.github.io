const n=`### 清除浮动的 6 种方法？各自的优缺点？

**答案**：

#### 方法 1：额外标签法（空 div 法）

- 实现：在浮动元素末尾添加 \`<div style="clear: both;"></div>\`；
- 优点：简单易懂，兼容性好；
- 缺点：增加无意义标签，违背语义化。

#### 方法 2：父元素 overflow:hidden/auto

- 实现：给父元素设置 \`overflow: hidden;\`（触发 BFC）；
- 优点：代码简洁，无额外标签；
- 缺点：可能隐藏元素溢出部分（如下拉菜单）；\`auto\` 可能出现滚动条。

#### 方法 3：父元素设置伪元素（::after）

- 实现：
- css

\`\`\`css
.clearfix::after {content: "";display: block;clear: both;visibility: hidden;height: 0;}.clearfix { zoom: 1; /* 兼容IE6/7 */ }
\`\`\`

- 优点：语义化（无额外标签），通用方案；
- 缺点：代码稍多，需兼容 IE6/7 加 \`zoom:1\`。

#### 方法 4：父元素设置双伪元素（::before+::after）

- 实现：
- css

\`\`\`css
.clearfix::before, .clearfix::after {content: "";display: table;}.clearfix::after {clear: both;}.clearfix { zoom: 1; }
\`\`\`

- 优点：解决 margin 重叠问题，更健壮；
- 缺点：代码略多。

#### 方法 5：父元素也浮动

- 实现：给父元素设置 \`float: left/right\`；
- 优点：简单；
- 缺点：父元素浮动会影响后续布局，需嵌套更多容器。

#### 方法 6：使用 flex/grid 布局

- 实现：给父元素设置 \`display: flex/grid\`；
- 优点：现代布局方案，无需额外处理浮动；
- 缺点：低版本浏览器（如 IE9-）不支持 flex，IE10 + 仅部分支持。`;export{n as default};
