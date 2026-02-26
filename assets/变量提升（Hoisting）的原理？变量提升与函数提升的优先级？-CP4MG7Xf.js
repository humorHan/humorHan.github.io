const n=`### 6. 变量提升（Hoisting）的原理？变量提升与函数提升的优先级？

**答案**：

#### 1. 变量提升原理：

JS 引擎在执行代码前，会先进行 “预编译” 阶段：

- 将 \`var\` 声明的变量提升到当前作用域顶端，赋值为 \`undefined\`；
- 将 \`function\` 声明的函数整体提升到当前作用域顶端（包括函数体）；
- \`let\`/\`const\` 声明的变量会进入 “暂时性死区（TDZ）”，看似提升但无法访问（实际是提升了声明但未初始化）。

#### 2. 变量提升与函数提升的优先级：

**函数提升优先级 > 变量提升优先级**（函数声明会覆盖同名变量声明，但不会覆盖变量赋值）。

#### 示例：

js

\`\`\`javascript
// 1. 变量提升（var）console.log(a); // undefined（变量提升，未赋值）var a = 10;// 2. 函数提升fn(); // "hello"（函数整体提升）function fn() {console.log("hello");}// 3. 优先级：函数提升 > 变量提升console.log(typeof fn2); // "function"（函数提升覆盖变量声明）var fn2 = 20;function fn2() {console.log("fn2");}// 4. let/const暂时性死区console.log(b); // 报错：Cannot access 'b' before initializationlet b = 20;
\`\`\``;export{n as default};
