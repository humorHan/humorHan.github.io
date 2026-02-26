const a=`### 9. 异步编程的核心痛点？JavaScript 实现异步的 4 种方式？（回调 / Promise/async/await/ 生成器）

**答案**：

#### 异步编程核心痛点：

1. **回调地狱**：多层回调嵌套，代码可读性差、维护成本高；
2. **错误处理复杂**：回调函数的错误无法通过 \`try/catch\` 捕获，需手动处理；
3. **顺序控制难**：多个异步操作的执行顺序难以控制（如按顺序请求多个接口）；
4. **代码耦合度高**：回调函数与主逻辑耦合，难以复用。

#### 4 种异步实现方式：

##### 1. 回调函数（Callback）

**原理**：将异步操作的结果处理逻辑作为参数传入异步函数，操作完成后执行回调。**缺点**：回调地狱、错误处理复杂。

js

\`\`\`javascript
// 示例：异步读取文件
fs.readFile("1.txt", "utf8", (err, data1) => {if (err) throw err;
  fs.readFile("2.txt", "utf8", (err, data2) => { // 嵌套回调（回调地狱）if (err) throw err;console.log(data1 + data2);});});
\`\`\`

##### 2. Promise（ES6）

**原理**：将异步操作封装为 Promise 对象，通过 \`then\`/\`catch\` 处理成功 / 失败，支持链式调用（解决回调地狱）。**优点**：链式调用、统一错误处理。

js

\`\`\`javascript
// 示例：封装异步读取文件function readFile(path) {return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {if (err) reject(err);else resolve(data);});});}// 链式调用（无嵌套）readFile("1.txt").then(data1 => readFile("2.txt").then(data2 => data1 + data2)).then(result => console.log(result)).catch(err => console.error(err));
\`\`\`

##### 3. async/await（ES7）

**原理**：基于 Promise 的语法糖，\`async\` 函数返回 Promise，\`await\` 暂停函数执行，直到 Promise 完成（同步写法实现异步）。**优点**：代码同步化、可读性最高、支持 \`try/catch\` 错误处理。

js

\`\`\`javascript
// 示例：async/await读取文件async function readFiles() {try {const data1 = await readFile("1.txt");const data2 = await readFile("2.txt");console.log(data1 + data2);} catch (err) {console.error(err);}}readFiles();
\`\`\`

##### 4. 生成器函数（Generator）

**原理**：通过 \`function*\` 定义生成器，\`yield\` 暂停执行，\`next()\` 恢复执行，配合迭代器实现异步流程控制（需手动管理，常用 \`co\` 库简化）。**优点**：可暂停 / 恢复执行；**缺点**：语法复杂，已被 async/await 替代。

js

\`\`\`javascript
// 示例：生成器+co库const co = require("co");function* gen() {const data1 = yield readFile("1.txt");const data2 = yield readFile("2.txt");return data1 + data2;}co(gen()).then(result => console.log(result)).catch(err => console.error(err));
\`\`\``;export{a as default};
