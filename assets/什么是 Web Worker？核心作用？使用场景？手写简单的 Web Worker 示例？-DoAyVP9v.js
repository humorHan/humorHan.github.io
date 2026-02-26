const r=`### 什么是 Web Worker？核心作用？使用场景？手写简单的 Web Worker 示例？

**答案**：

#### 一、Web Worker 核心定义

Web Worker 是 HTML5 新增的特性，允许 JS 脚本在**后台线程**中运行，与主线程（UI 线程）分离，核心特点：

1. **线程隔离**：Worker 线程无 DOM/BOM 访问权限（不能操作 DOM、window、document）；
2. **通信机制**：主线程与 Worker 线程通过 \`postMessage()\` 传递数据（值拷贝，非引用）；
3. **单线程模型**：Worker 线程内部仍为单线程，仅能并行执行 JS 逻辑，无法创建多线程。

#### 二、核心作用

1. **解放主线程**：将耗时的计算（如大数据处理、复杂算法、文件解析）移到 Worker 线程，避免主线程阻塞导致页面卡顿；
2. **并行处理**：实现 JS 的 “伪多线程”，提升复杂计算场景的性能；
3. **不阻塞 UI**：Worker 线程执行耗时操作时，主线程仍可响应用户交互（点击、滚动等）。

#### 三、典型使用场景

1. 大数据量处理（如 Excel/CSV 解析、大数据排序 / 过滤）；
2. 复杂数学计算（如加密算法、3D 建模计算、数据可视化渲染计算）；
3. 后台任务（如实时数据同步、日志上报）；
4. 图片 / 视频处理（如像素级操作、格式转换）。

#### 四、手写 Web Worker 示例

##### 主线程代码（main.js）

js

\`\`\`javascript
// 1. 创建Worker线程（指定Worker脚本文件）const worker = new Worker("worker.js");// 2. 监听Worker线程的消息
worker.onmessage = function(e) {console.log("主线程接收结果：", e.data); // 主线程接收结果： 5000000050000000// 3. 任务完成后关闭Worker
  worker.terminate();};// 4. 监听Worker错误
worker.onerror = function(err) {console.error(\`Worker错误：\${err.message}（行\${err.lineno}）\`);
  worker.terminate();};// 5. 向Worker线程发送数据console.log("主线程发送任务：计算1到1亿的和");
worker.postMessage(100000000);
\`\`\`

##### Worker 线程代码（worker.js）

js

\`\`\`javascript
// 1. 监听主线程的消息
self.onmessage = function(e) {const max = e.data;console.log("Worker接收任务：计算1到", max, "的和");// 2. 耗时计算（1到max的和）let sum = 0;for (let i = 1; i <= max; i++) {
    sum += i;}// 3. 向主线程发送结果
  self.postMessage(sum);// 4. 主动关闭Worker（可选）
  self.close();};
\`\`\`

#### 五、关键注意事项

1. **数据传递限制**：

   - \`postMessage()\` 传递的是数据拷贝（结构化克隆算法），支持基本类型、数组、对象、Blob 等，但不支持函数、Symbol、循环引用对象；
   - 若需传递大量数据，建议使用 \`Transferable Objects\`（转移所有权，如 ArrayBuffer），避免拷贝开销。
2. **Worker 限制**：

   - 不能访问 DOM（document、window、body 等）；
   - 不能使用 alert/confirm/prompt；
   - 受同源策略限制，Worker 脚本必须与主线程页面同源；
3. **资源管理**：

   - 主线程可通过 \`worker.terminate()\` 强制关闭 Worker；
   - Worker 内部可通过 \`self.close()\` 主动关闭；
   - 页面卸载时需手动关闭 Worker，避免内存泄漏。`;export{r as default};
