const e=`### 实现一个简易版的 Promise.all/Promise.race/Promise.allSettled？

**答案**：

#### 一、Promise.all（所有 Promise 成功才返回，任一失败则立即失败）

##### 核心逻辑：

1. 接收可迭代对象（通常是数组），返回新 Promise；
2. 遍历 Promise 数组，记录已完成的数量和结果；
3. 所有 Promise 成功：结果数组按原顺序返回；
4. 任一 Promise 失败：立即 reject 失败原因。

js

\`\`\`javascript
function myPromiseAll(promises) {return new Promise((resolve, reject) => {// 1. 处理非可迭代/空数组if (!Array.isArray(promises)) {return reject(new TypeError("Argument must be an array"));}if (promises.length === 0) {return resolve([]);}const results = []; // 存储成功结果let completedCount = 0; // 已完成的Promise数量// 2. 遍历每个Promise
    promises.forEach((promise, index) => {// 兼容非Promise值（转为resolved Promise）Promise.resolve(promise).then(res => {
          results[index] = res; // 按原顺序存储
          completedCount++;// 3. 所有完成则resolveif (completedCount === promises.length) {resolve(results);}}).catch(err => {// 4. 任一失败则rejectreject(err);});});});}// 测试const p1 = Promise.resolve(1);const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));myPromiseAll([p1, p2]).then(res => console.log(res)); // [1,2]myPromiseAll([p1, Promise.reject("error")]).catch(err => console.log(err)); // error
\`\`\`

#### 二、Promise.race（第一个完成的 Promise 决定结果，无论成功 / 失败）

##### 核心逻辑：

1. 接收可迭代对象，返回新 Promise；
2. 遍历 Promise 数组，任一 Promise 完成（resolve/reject），立即将结果传递给新 Promise。

js

\`\`\`javascript
function myPromiseRace(promises) {return new Promise((resolve, reject) => {if (!Array.isArray(promises)) {return reject(new TypeError("Argument must be an array"));}// 遍历Promise，第一个完成则触发resolve/reject
    promises.forEach(promise => {Promise.resolve(promise).then(resolve).catch(reject);});});}// 测试const p1 = new Promise(resolve => setTimeout(() => resolve(1), 100));const p2 = new Promise((_, reject) => setTimeout(() => reject(2), 50));myPromiseRace([p1, p2]).catch(err => console.log(err)); // 2（先失败）
\`\`\`

#### 三、Promise.allSettled（所有 Promise 完成后返回，无论成功 / 失败）

##### 核心逻辑：

1. 接收可迭代对象，返回新 Promise；
2. 遍历 Promise 数组，记录每个 Promise 的结果（{status: "fulfilled", value} 或 {status: "rejected", reason}）；
3. 所有 Promise 完成后，resolve 结果数组（按原顺序）。

js

\`\`\`javascript
function myPromiseAllSettled(promises) {return new Promise(resolve => {if (!Array.isArray(promises)) {return resolve([]);}if (promises.length === 0) {return resolve([]);}const results = [];let completedCount = 0;

    promises.forEach((promise, index) => {Promise.resolve(promise).then(res => {
          results[index] = { status: "fulfilled", value: res };}).catch(err => {
          results[index] = { status: "rejected", reason: err };}).finally(() => {
          completedCount++;if (completedCount === promises.length) {resolve(results);}});});});}// 测试myPromiseAllSettled([p1, p2, Promise.reject("err")]).then(res => {console.log(res);// [//   { status: 'fulfilled', value: 1 },//   { status: 'rejected', reason: 2 },//   { status: 'rejected', reason: 'err' }// ]});
\`\`\`

#### 四、核心考点

- Promise.all：强调 “全成功才成功，失败优先”，结果顺序与输入一致；
- Promise.race：强调 “第一个完成”，适用于超时控制（如请求超时）；
- Promise.allSettled：强调 “全完成才返回”，适用于需要所有结果的场景（如批量请求，不关心个别失败）。`;export{e as default};
