const n=`### 浏览器事件循环中，微任务队列是否有优先级？（如 queueMicrotask vs Promise.then）

**答：**

#### （1）核心结论

浏览器规范中**没有为微任务队列划分官方优先级**，\`queueMicrotask\` 和 \`Promise.then\` 均属于微任务，执行顺序仅由「注册顺序」决定（先注册先执行）。

#### （2）详细解释

浏览器事件循环流程：

1. 执行同步代码 → 形成调用栈；
2. 调用栈清空后，执行**所有微任务**（按注册顺序）；
3. 微任务执行完毕后，触发页面重绘 / 回流；
4. 执行宏任务（如 \`setTimeout\`、\`click\` 事件），重复上述流程。

微任务的来源包括：

- \`Promise.then/catch/finally\`；
- \`queueMicrotask\`；
- \`MutationObserver\`；
- \`async/await\`（本质是 \`Promise.then\`）。

#### （3）示例验证

javascript

运行

\`\`\`javascript
console.log('同步代码');Promise.resolve().then(() => {console.log('Promise.then 1');});queueMicrotask(() => {console.log('queueMicrotask 1');});Promise.resolve().then(() => {console.log('Promise.then 2');});// 输出顺序：// 同步代码 → Promise.then 1 → queueMicrotask 1 → Promise.then 2
\`\`\``;export{n as default};
