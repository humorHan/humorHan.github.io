const n=`### 什么是尾递归优化？为什么普通递归会栈溢出？实现一个尾递归版的斐波那契数列？

**答：**

#### （1）尾递归优化定义

尾递归是「递归函数的最后一步仅调用自身，且无其他运算」，引擎可优化这种递归：复用当前执行上下文（栈帧），避免栈深度累积，从而防止栈溢出。

#### （2）普通递归栈溢出的原因

普通递归每次调用都会创建新的执行上下文，压入调用栈；当递归深度超过引擎栈大小限制（如 Chrome 约 10000 层），就会抛出 \`Maximum call stack size exceeded\` 错误。

#### （3）尾递归版斐波那契实现

javascript

运行

\`\`\`javascript
// 普通递归（栈溢出风险）function fibonacci(n) {if (n <= 1) return n;return fibonacci(n - 1) + fibonacci(n - 2); // 最后一步是加法，非纯递归调用}// 尾递归版（需 ES6 严格模式，Node.js 需开启 --harmony-tailcalls）function fibonacciTail(n, prev = 0, curr = 1) {if (n === 0) return prev;// 最后一步仅调用自身，无其他运算return fibonacciTail(n - 1, curr, prev + curr);}// 测试console.log(fibonacciTail(10000)); // 无栈溢出（引擎支持的情况下）
\`\`\``;export{n as default};
