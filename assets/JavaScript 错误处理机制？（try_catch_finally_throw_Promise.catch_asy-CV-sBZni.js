const r=`### JavaScript 错误处理机制？（try/catch/finally/throw/Promise.catch/async/await 错误捕获）

**答案**：

#### 一、同步代码错误处理（try/catch/finally/throw）

##### try/catch：捕获同步错误

js

\`\`\`javascript
try {// 可能出错的代码const a = 1;
  a = 2; // 报错：赋值给常量} catch (err) {// 捕获错误，err包含name/message/stack等信息console.error("错误类型：", err.name); // TypeErrorconsole.error("错误信息：", err.message); // Assignment to constant variable.} finally {// 无论是否出错，必执行（常用于释放资源：关闭文件/取消请求）console.log("finally执行");}
\`\`\`

##### throw：手动抛出错误

js

\`\`\`javascript
function checkAge(age) {if (age < 18) {// 手动抛出自定义错误throw new Error("年龄必须≥18");}return "验证通过";}try {checkAge(16);} catch (err) {console.error(err.message); // 年龄必须≥18}
\`\`\`

#### 二、异步代码错误处理

##### 回调函数：手动判断错误

js

\`\`\`javascript
// 示例：异步读取文件
fs.readFile("test.txt", "utf8", (err, data) => {if (err) { // 第一个参数为错误对象console.error("读取失败：", err);return;}console.log("读取成功：", data);});
\`\`\`

##### Promise 错误处理（catch）

- \`Promise.catch\`：捕获当前 Promise 链中所有错误（包括 \`reject\` 和同步错误）；
- 未捕获的 Promise 错误会触发 \`unhandledrejection\` 事件；

js

\`\`\`javascript
// 单个Promisenew Promise((resolve, reject) => {reject(new Error("异步失败"));// 或同步错误：const a = 1; a = 2;}).catch(err => console.error(err.message)); // 异步失败// Promise链Promise.resolve().then(() => { throw new Error("then错误"); }).then(() => {}).catch(err => console.error(err.message)); // then错误// 全局捕获未处理的Promise错误window.addEventListener("unhandledrejection", (event) => {
  event.preventDefault(); // 阻止浏览器默认提示console.error("未处理的Promise错误：", event.reason);});
\`\`\`

##### async/await 错误处理

- \`async/await\` 结合 \`try/catch\`：同步写法捕获异步错误；
- 未捕获的错误会触发 \`unhandledrejection\`；

js

\`\`\`javascript
// 方法1：try/catch捕获单个错误async function fetchData() {try {const res = await fetch("https://api.test.com/data");const data = await res.json();return data;} catch (err) {console.error("请求失败：", err);}}// 方法2：try/catch捕获多个异步操作async function multiFetch() {try {const res1 = await fetch("url1");const res2 = await fetch("url2"); // 若res1失败，直接进入catch} catch (err) {console.error("请求失败：", err);}}// 方法3：单独捕获（不阻塞后续操作）async function fetchParallel() {const p1 = fetch("url1").catch(err => console.error("p1失败：", err));const p2 = fetch("url2").catch(err => console.error("p2失败：", err));const [res1, res2] = await Promise.all([p1, p2]);}
\`\`\`

#### 三、错误类型（内置 Error 子类）`;export{r as default};
