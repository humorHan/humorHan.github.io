const e=`### 手动实现 Promise.allSettled 方法？需考虑参数非数组、空数组的边界情况？

**答：**

#### （1）Promise.allSettled 功能

接收「可迭代对象」（如数组），返回一个 Promise：

- 所有子 Promise 完成（成功 / 失败）后，Promise 才 resolve；
- resolve 的结果是数组，每个元素包含 \`status\`（\`fulfilled\`/\`rejected\`）和 \`value\`/\`reason\`。

#### （2）实现代码（处理边界）

javascript

运行

\`\`\`javascript
function myAllSettled(iterable) {// 边界1：参数非可迭代对象（如 null/undefined/数字），抛错if (typeof iterable[Symbol.iterator] !== 'function') {return Promise.reject(new TypeError(\`\${iterable} is not iterable\`));}// 转为数组，兼容类数组/可迭代对象const promises = Array.from(iterable);// 边界2：空数组，直接 resolve 空数组if (promises.length === 0) {return Promise.resolve([]);}let completedCount = 0; // 已完成的 Promise 数量const results = new Array(promises.length); // 存储结果return new Promise((resolve) => {
    promises.forEach((promise, index) => {// 兼容非 Promise 类型（如普通值）Promise.resolve(promise).then((value) => {
          results[index] = { status: 'fulfilled', value };}).catch((reason) => {
          results[index] = { status: 'rejected', reason };}).finally(() => {
          completedCount++;// 所有 Promise 完成后 resolveif (completedCount === promises.length) {resolve(results);}});});});}// 测试用例myAllSettled([Promise.resolve(1),Promise.reject('error'),2]).then(res => console.log(res));// 输出：// [//   { status: 'fulfilled', value: 1 },//   { status: 'rejected', reason: 'error' },//   { status: 'fulfilled', value: 2 }// ]// 边界测试：空数组myAllSettled([]).then(res => console.log(res)); // []// 边界测试：非可迭代对象myAllSettled(123).catch(err => console.log(err.message)); // 123 is not iterable
\`\`\``;export{e as default};
