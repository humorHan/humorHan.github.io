const o=`### 12. 宏任务与微任务的定义？各自包含哪些类型？执行顺序？

**答案**：

#### 定义：

- **宏任务（MacroTask）**：执行时间长、粒度大的异步任务，会触发 UI 渲染 / 页面重绘，每次仅执行一个；
- **微任务（MicroTask）**：执行时间短、粒度小的异步任务，在当前宏任务执行完毕后立即执行，不触发 UI 渲染，每次执行所有微任务。

#### 包含类型：

##### 宏任务：

##### 微任务：

#### 执行顺序：

1. 执行**当前宏任务**的同步代码（\`script\` 标签为第一个宏任务）；
2. 执行**所有微任务**（按优先级，Node.js 中 \`process.nextTick\` 先执行）；
3. 浏览器：执行 UI 渲染（可选）；Node.js：进入下一个事件循环阶段；
4. 从宏任务队列中取**下一个宏任务**执行，重复步骤 1-3。

#### 核心原则：

“先微后宏，微任务清完再宏任务”，微任务是当前宏任务的 “收尾工作”，宏任务是下一轮事件循环的 “开始”。

#### 示例（复杂场景）：

js

\`\`\`javascript
console.log("同步1");setTimeout(() => { // 宏任务1console.log("setTimeout1");Promise.resolve().then(() => { // 微任务（宏任务1的微任务）console.log("Promise1");});}, 0);setTimeout(() => { // 宏任务2console.log("setTimeout2");}, 0);Promise.resolve().then(() => { // 微任务（初始宏任务的微任务）console.log("Promise2");setTimeout(() => { // 宏任务3console.log("setTimeout3");}, 0);});console.log("同步2");// 执行顺序：// 同步1 → 同步2 → Promise2 → setTimeout1 → Promise1 → setTimeout2 → setTimeout3
\`\`\``;export{o as default};
