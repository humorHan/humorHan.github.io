const e=`### 7. Web Worker 的作用是什么？如何使用 Web Worker 处理耗时任务避免阻塞主线程？

**答案：**

#### 一、Web Worker 核心作用

- **核心：为 JS 提供多线程能力**，将耗时任务（如大数据计算、复杂逻辑处理）放到独立的 Worker 线程执行，避免阻塞主线程（主线程负责 UI 渲染和用户交互），解决页面卡顿、无响应问题。
- 限制：

  - 不能访问 DOM（window/document）、不能操作 UI；
  - 与主线程通过消息传递通信（序列化数据）；
  - 受同源策略限制。

#### 二、使用步骤（处理耗时任务）

##### 1. 主线程（main.js）

js

\`\`\`javascript
// 1. 创建 Worker 线程（指定 Worker 脚本文件）const worker = new Worker('worker.js');// 2. 向 Worker 发送数据（可传对象、数组等，会序列化）const bigData = new Array(1000000).fill(1); // 模拟大数据
worker.postMessage({ type: 'calculate', data: bigData });// 3. 监听 Worker 返回的结果
worker.onmessage = (e) => {console.log('计算结果：', e.data.result);
  worker.terminate(); // 任务完成，终止 Worker，释放资源};// 4. 监听错误
worker.onerror = (error) => {console.error('Worker 错误：', error.message);
  worker.terminate();};
\`\`\`

##### 2. Worker 线程（worker.js）

js

\`\`\`javascript
// 监听主线程发送的消息
self.onmessage = (e) => {const { type, data } = e.data;if (type === 'calculate') {// 处理耗时任务（如大数据求和）const result = data.reduce((sum, num) => sum + num, 0);// 将结果发送回主线程
    self.postMessage({ result });// 关闭 Worker
    self.close();}};
\`\`\`

#### 三、进阶使用（Blob 方式，无需单独文件）

适合简单任务，避免创建额外文件：

js

\`\`\`javascript
// 主线程const workerCode = \`
  self.onmessage = (e) => {
    const result = e.data.reduce((sum, num) => sum + num, 0);
    self.postMessage(result);
    self.close();
  };
\`;// 将代码转为 Blob URLconst blob = new Blob([workerCode], { type: 'application/javascript' });const worker = new Worker(URL.createObjectURL(blob));

worker.postMessage(new Array(1000000).fill(1));
worker.onmessage = (e) => {console.log('结果：', e.data);
  worker.terminate();};
\`\`\`

#### 四、适用场景

- 大数据计算（如表格排序、统计分析）；
- 复杂算法处理（如加密解密、图形处理）；
- 数据解析（如大 JSON 解析、CSV 解析）；
- 轮询接口（避免阻塞主线程）。`;export{e as default};
