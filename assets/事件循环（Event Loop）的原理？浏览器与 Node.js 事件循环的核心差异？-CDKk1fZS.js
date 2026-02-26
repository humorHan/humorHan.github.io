const e=`### 11. 事件循环（Event Loop）的原理？浏览器与 Node.js 事件循环的核心差异？

**答案**：

#### 事件循环原理：

JS 是单线程语言，为解决异步任务阻塞问题，引入事件循环机制，核心流程：

1. **执行栈**：同步任务依次进入执行栈执行；
2. **任务队列**：异步任务（如定时器、AJAX、事件）完成后，将回调函数放入任务队列（分宏任务 / 微任务）；
3. **事件循环**：执行栈为空时，先清空所有微任务队列，再取一个宏任务执行，重复此过程。

#### 宏任务（MacroTask）与微任务（MicroTask）：

- **宏任务**：\`script\` 整体代码、\`setTimeout\`/\`setInterval\`、\`setImmediate\`（Node）、\`I/O\`、UI 渲染；
- **微任务**：\`Promise.then/catch/finally\`、\`async/await\`、\`queueMicrotask\`、\`MutationObserver\`（浏览器）、\`process.nextTick\`（Node，优先级高于微任务）。

#### 浏览器与 Node.js 事件循环核心差异：

#### 示例（浏览器）：

js

\`\`\`javascript
console.log("同步1");setTimeout(() => { // 宏任务console.log("setTimeout");}, 0);Promise.resolve().then(() => { // 微任务console.log("Promise.then");});console.log("同步2");// 执行顺序：同步1 → 同步2 → Promise.then → setTimeout
\`\`\`

#### 示例（Node.js）：

js

\`\`\`javascript
console.log("同步1");
process.nextTick(() => { // 微任务（最高优先级）console.log("process.nextTick");});Promise.resolve().then(() => { // 微任务console.log("Promise.then");});setImmediate(() => { // check阶段宏任务console.log("setImmediate");});setTimeout(() => { // timers阶段宏任务console.log("setTimeout");}, 0);console.log("同步2");// 执行顺序：同步1 → 同步2 → process.nextTick → Promise.then → setTimeout → setImmediate
\`\`\``;export{e as default};
