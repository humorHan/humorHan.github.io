const e=`### Node.js 中 process.nextTick 的优先级高于微任务的原因？与 setImmediate 的执行顺序？

**答：**

#### （1）process.nextTick 优先级高的原因

- \`process.nextTick\` 属于「nextTick 队列」，是 Node.js 事件循环的「特殊队列」，独立于微任务队列（Promise 队列）；
- 设计目的：保证回调函数「尽快执行」（在当前操作完成后、任何其他异步操作前），解决异步调用的时序问题；
- 执行时机：每轮事件循环的**所有阶段结束后**、微任务队列执行前，优先清空 nextTick 队列（即使递归调用 \`process.nextTick\`，也会先执行完所有 nextTick 回调，再执行微任务）。

#### （2）与 setImmediate 的执行顺序

Node.js 事件循环阶段（简化）：\`timers → I/O callbacks → idle/prepare → poll → check → close callbacks\`，各阶段执行后都会先清空 nextTick 队列，再清空微任务队列。

- \`setImmediate\` 属于「check 阶段」的宏任务；
- 执行优先级：\`process.nextTick > 微任务（Promise.then） > setImmediate\`；

#### （3）示例验证

javascript

运行

\`\`\`javascript
// 主模块中console.log('同步代码');

process.nextTick(() => {console.log('process.nextTick 1');});Promise.resolve().then(() => {console.log('Promise.then 1');});setImmediate(() => {console.log('setImmediate 1');});// 输出顺序：// 同步代码 → process.nextTick 1 → Promise.then 1 → setImmediate 1
\`\`\``;export{e as default};
