const n=`### 组合函数（compose）的实现原理？实现一个 compose 函数并说明执行顺序（从右到左 / 从左到右）？

**答：**

#### （1）组合函数原理

组合函数（compose）的核心是「将多个函数串联执行，前一个函数的输出作为后一个函数的输入」，本质是函数的嵌套调用，实现「功能复用与组合」。

#### （2）compose 实现（从右到左执行）

javascript

运行

\`\`\`javascript
// 基础版：reduceRight 实现function compose(...fns) {// 边界：无函数时返回 identity 函数if (fns.length === 0) return (x) => x;// 边界：单个函数直接返回if (fns.length === 1) return fns[0];// 从右到左遍历，嵌套执行return fns.reduceRight((prevFn, currFn) => {return (...args) => currFn(prevFn(...args));});}// 示例：验证执行顺序const add1 = (x) => x + 1;const multiply2 = (x) => x * 2;const subtract3 = (x) => x - 3;// compose 执行顺序：subtract3 → multiply2 → add1const fn = compose(add1, multiply2, subtract3);console.log(fn(5)); // (5-3)*2 +1 = 5
\`\`\`

#### （3）执行顺序说明

- \`compose\` 是**从右到左**执行（如上述示例先执行 \`subtract3\`，再 \`multiply2\`，最后 \`add1\`）；
- 若需要「从左到右」执行，可实现 \`pipe\` 函数（用 \`reduce\` 替代 \`reduceRight\`）：
- javascript
- 运行

\`\`\`javascript
function pipe(...fns) {if (fns.length === 0) return (x) => x;if (fns.length === 1) return fns[0];return fns.reduce((prevFn, currFn) => {return (...args) => currFn(prevFn(...args));});}const pipeFn = pipe(subtract3, multiply2, add1);console.log(pipeFn(5)); // (5-3)*2 +1 = 5（执行顺序：subtract3 → multiply2 → add1）
\`\`\``;export{n as default};
