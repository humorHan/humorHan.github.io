const e=`### 10. Promise 的三种状态？状态是否可逆转？实现一个简易 Promise？

**答案**：

#### Promise 的三种状态：

1. **pending（等待态）**：初始状态，未完成或未失败；
2. **fulfilled（成功态）**：异步操作成功，状态不可逆；
3. **rejected（失败态）**：异步操作失败，状态不可逆。

#### 状态不可逆：

Promise 的状态一旦从 \`pending\` 变为 \`fulfilled\` 或 \`rejected\`，就无法再改变（如调用 \`resolve\` 后，再调用 \`reject\` 无效）。

#### 简易 Promise 实现（核心逻辑）：

js

\`\`\`javascript
class MyPromise {constructor(executor) {this.status = "pending"; // 初始状态this.value = undefined; // 成功值this.reason = undefined; // 失败原因this.onResolvedCallbacks = []; // 成功回调队列this.onRejectedCallbacks = []; // 失败回调队列// 成功回调const resolve = (value) => {if (this.status === "pending") { // 仅pending态可修改this.status = "fulfilled";this.value = value;// 执行成功回调队列this.onResolvedCallbacks.forEach(fn => fn());}};// 失败回调const reject = (reason) => {if (this.status === "pending") {this.status = "rejected";this.reason = reason;// 执行失败回调队列this.onRejectedCallbacks.forEach(fn => fn());}};// 执行器立即执行，捕获同步错误try {executor(resolve, reject);} catch (err) {reject(err);}}// then方法（链式调用核心）then(onFulfilled, onRejected) {// 兼容不传回调的情况
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    onRejected = typeof onRejected === "function" ? onRejected : e => { throw e; };const promise2 = new MyPromise((resolve, reject) => {if (this.status === "fulfilled") {// 异步执行，确保promise2已创建setTimeout(() => {try {const x = onFulfilled(this.value);resolvePromise(promise2, x, resolve, reject); // 处理返回值} catch (err) {reject(err);}}, 0);}if (this.status === "rejected") {setTimeout(() => {try {const x = onRejected(this.reason);resolvePromise(promise2, x, resolve, reject);} catch (err) {reject(err);}}, 0);}if (this.status === "pending") {// 加入回调队列this.onResolvedCallbacks.push(() => {setTimeout(() => {try {const x = onFulfilled(this.value);resolvePromise(promise2, x, resolve, reject);} catch (err) {reject(err);}}, 0);});this.onRejectedCallbacks.push(() => {setTimeout(() => {try {const x = onRejected(this.reason);resolvePromise(promise2, x, resolve, reject);} catch (err) {reject(err);}}, 0);});}});return promise2; // 返回新Promise，实现链式调用}// catch方法（简化then的失败回调）catch(onRejected) {return this.then(null, onRejected);}}// 处理then返回值（核心：解决Promise穿透/嵌套）function resolvePromise(promise2, x, resolve, reject) {if (promise2 === x) { // 避免循环引用return reject(new TypeError("Chaining cycle detected for promise"));}if (x instanceof MyPromise) { // 返回值是Promise
    x.then(resolve, reject);} else if (x !== null && (typeof x === "object" || typeof x === "function")) { // 返回值是对象/函数let called = false; // 防止多次调用try {const then = x.then;if (typeof then === "function") { // 是thenable对象
        then.call(x, (y) => {if (called) return;
          called = true;resolvePromise(promise2, y, resolve, reject); // 递归解析}, (r) => {if (called) return;
          called = true;reject(r);});} else { // 普通对象resolve(x);}} catch (err) {if (called) return;
      called = true;reject(err);}} else { // 普通值resolve(x);}}// 测试const p = new MyPromise((resolve) => {setTimeout(() => resolve(10), 1000);});
p.then(v => v * 2).then(v => console.log(v)); // 20
\`\`\``;export{e as default};
