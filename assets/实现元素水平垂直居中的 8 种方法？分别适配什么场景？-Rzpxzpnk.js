const n=`### 实现元素水平垂直居中的 8 种方法？分别适配什么场景？

**答案**：

#### 方法 1：Flex 布局（通用，推荐）

css

\`\`\`css
.parent { display: flex; justify-content: center; align-items: center; }
\`\`\`

场景：任意元素（固定 / 不固定宽高），现代浏览器首选。

#### 方法 2：Grid 布局

css

\`\`\`css
.parent { display: grid; place-items: center; }
\`\`\`

场景：任意元素，二维布局场景优先。

#### 方法 3：定位 + margin:auto

css

\`\`\`css
.parent { position: relative; }.child { position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; }
\`\`\`

场景：固定 / 不固定宽高元素，兼容 IE8+。

#### 方法 4：定位 + transform（不固定宽高）

css

\`\`\`css
.parent { position: relative; }.child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
\`\`\`

场景：不固定宽高元素，兼容 IE9+。

#### 方法 5：定位 + 负 margin（固定宽高）

css

\`\`\`css
.parent { position: relative; }.child { width: 200px; height: 200px; position: absolute; top: 50%; left: 50%; margin-top: -100px; margin-left: -100px; }
\`\`\`

场景：固定宽高元素，兼容 IE6+。

#### 方法 6：table-cell 布局

css

\`\`\`css
.parent { display: table-cell; vertical-align: middle; text-align: center; }.child { display: inline-block; }
\`\`\`

场景：行内 / 块级元素，兼容 IE8+。

#### 方法 7：line-height（单行文字）

css

\`\`\`css
.parent { line-height: 200px; text-align: center; }.child { display: inline-block; vertical-align: middle; }
\`\`\`

场景：单行文字居中，简单高效。

#### 方法 8：calc 计算（固定宽高）

css

\`\`\`css
.parent { position: relative; }.child { width: 200px; height: 200px; position: absolute; top: calc(50% - 100px); left: calc(50% - 100px); }
\`\`\`

场景：固定宽高元素，需精准计算。`;export{n as default};
