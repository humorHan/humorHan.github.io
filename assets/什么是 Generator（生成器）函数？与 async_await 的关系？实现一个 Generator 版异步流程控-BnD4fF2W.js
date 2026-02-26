const e=`### 什么是 Generator（生成器）函数？与 async/await 的关系？实现一个 Generator 版异步流程控制？

**答案**：

#### 一、Generator 函数核心定义

Generator 函数是 ES6 新增的特殊函数，关键字为 \`function*\`，核心特性：

1. **暂停 / 恢复执行**：通过 \`yield\` 暂停执行，\`next()\` 恢复执行；
2. **双向通信**：\`next(value)\` 可向暂停处传递参数，\`yield\` 可返回值；
3. **迭代器接口**：Generator 函数执行后返回迭代器对象，支持 \`for...of\` 遍历。

#### 二、核心语法

js

\`\`\`javascript
function* gen() {console.log("开始执行");const a = yield 1; // 暂停，返回1；恢复时接收next的参数赋值给aconsole.log("接收参数：", a);const b = yield 2;console.log("接收参数：", b);return 3; // 最终返回，done: true}const iterator = gen();console.log(iterator.next()); // { value: 1, done: false }（执行到第一个yield）console.log(iterator.next("参数1")); // { value: 2, done: false }（恢复，a=参数1）console.log(iterator.next("参数2")); // { value: 3, done: true }（恢复，b=参数2，执行return）
\`\`\`

#### 三、与 async/await 的关系

- **async/await 是 Generator 的语法糖**：async 函数等价于 “自动执行的 Generator 函数 + 迭代器遍历器”；
- **核心对应关系**：

  - \`async function\` → \`function*\`；
  - \`await\` → \`yield\`；
  - async 函数的自动执行 → 手动编写的 Generator 执行器（如 co 库）。

#### 四、Generator 版异步流程控制（模拟 async/await）

##### 手动执行 Generator（基础版）

js

\`\`\`javascript
// 异步函数：模拟请求function fetchData(url) {return new Promise(resolve => {setTimeout(() => resolve(\`数据：\${url}\`), 1000);});}// Generator函数：定义异步流程function* genAsync() {const res1 = yield fetchData("url1");console.log(res1); // 数据：url1const res2 = yield fetchData("url2");console.log(res2); // 数据：url2return "全部完成";}// 手动执行Generatorconst iterator = genAsync();// 执行第一步
iterator.next().value.then(res1 => {// 执行第二步，传递结果
  iterator.next(res1).value.then(res2 => {// 执行第三步const result = iterator.next(res2);console.log(result.value); // 全部完成});});
\`\`\`

##### 通用执行器（模拟 co 库，自动执行 Generator）

js

\`\`\`javascript
/**
 * Generator自动执行器
 * @param {Generator} gen - Generator函数
 * @returns {Promise} 最终结果
 */function co(gen) {return new Promise((resolve, reject) => {const iterator = gen();function step(nextFn) {let next;try {
        next = nextFn(); // 执行next()} catch (err) {return reject(err); // 捕获同步错误}if (next.done) {return resolve(next.value); // 执行完成，resolve最终结果}// 将yield的结果转为Promise，递归执行Promise.resolve(next.value).then(res => step(() => iterator.next(res))) // 成功：传递结果，继续执行.catch(err => step(() => iterator.throw(err))); // 失败：抛出错误，终止执行}step(() => iterator.next()); // 启动执行});}// 测试自动执行器co(genAsync()).then(res => console.log(res)); // 全部完成
\`\`\`

#### 五、核心考点

- Generator 是 async/await 的底层实现基础，理解 Generator 有助于掌握 async/await 的本质；
- co 库是 Generator 异步流程控制的经典实现，面试中常要求手写简化版 co；
- Generator 的暂停 / 恢复特性，可用于实现无限序列、惰性求值等场景。`;export{e as default};
