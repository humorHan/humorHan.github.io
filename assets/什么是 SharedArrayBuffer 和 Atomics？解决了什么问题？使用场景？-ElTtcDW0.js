const r=`### 什么是 SharedArrayBuffer 和 Atomics？解决了什么问题？使用场景？

**答案**：

#### 一、SharedArrayBuffer 核心定义

SharedArrayBuffer 是 ES2017 新增的二进制数据类型，与 ArrayBuffer 的核心区别：

- **ArrayBuffer**：数据仅能被单个线程访问（值拷贝传递）；
- **SharedArrayBuffer**：数据可被**多个线程（主线程 / Worker）共享**（内存共享，非拷贝），大幅降低跨线程数据传递的开销。

#### 二、Atomics 核心定义

Atomics 是 ES2017 新增的全局对象，提供**原子操作**方法，解决多线程共享 SharedArrayBuffer 时的 “竞态条件” 问题：

- 竞态条件：多个线程同时读写共享内存，导致数据不一致；
- 原子操作：操作执行过程中不可中断，确保同一时间仅一个线程访问共享内存。

#### 三、核心解决的问题

1. **跨线程数据拷贝开销**：传统 Worker 通过 postMessage 传递大数组 / 二进制数据时，需拷贝数据（耗时），SharedArrayBuffer 共享内存，无拷贝开销；
2. **多线程数据竞争**：多个线程同时读写共享内存会导致数据错误，Atomics 确保操作的原子性，避免竞争。

#### 四、Atomics 常用方法

#### 五、使用示例（主线程 + Worker 共享内存）

##### 主线程代码

js

\`\`\`javascript
// 1. 创建SharedArrayBuffer（大小：4字节，存储int32）const sab = new SharedArrayBuffer(4);const arr = new Int32Array(sab); // 视图：操作共享内存// 2. 创建Workerconst worker = new Worker("shared-worker.js");// 3. 发送SharedArrayBuffer给Worker（转移所有权）
worker.postMessage(sab);// 4. 原子写入初始值Atomics.store(arr, 0, 0);// 5. 定时读取共享内存值setInterval(() => {const value = Atomics.load(arr, 0);console.log("主线程读取共享值：", value);if (value >= 10) {
    worker.terminate();}}, 100);
\`\`\`

##### Worker 线程代码（shared-worker.js）

js

\`\`\`javascript
self.onmessage = function(e) {const sab = e.data;const arr = new Int32Array(sab);// 循环原子递增共享值setInterval(() => {// 原子加法：arr[0] += 1，返回旧值const oldValue = Atomics.add(arr, 0, 1);console.log("Worker递增后：", oldValue + 1);}, 500);};
\`\`\`

#### 六、使用场景

1. **高性能计算**：多 Worker 并行处理大数据（如机器学习、3D 渲染、科学计算），共享中间结果；
2. **实时数据同步**：主线程与多个 Worker 共享实时数据（如游戏状态、实时监控数据）；
3. **低延迟通信**：跨线程高频数据交互（如音视频处理），避免拷贝开销。

#### 七、安全限制

- 因安全漏洞（Spectre），浏览器对 SharedArrayBuffer 有严格限制：
  1. 页面必须使用 HTTPS（本地开发 [localhost](https://localhost/) 除外）；
  2. 需设置跨源隔离头：\`Cross-Origin-Opener-Policy: same-site\` 和 \`Cross-Origin-Embedder-Policy: require-corp\`；
  3. 未满足条件时，SharedArrayBuffer 会被禁用（返回 null）。`;export{r as default};
