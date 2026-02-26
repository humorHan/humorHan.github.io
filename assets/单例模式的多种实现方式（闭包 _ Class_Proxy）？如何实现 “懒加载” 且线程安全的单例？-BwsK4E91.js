const n=`### 单例模式的多种实现方式（闭包 / Class/Proxy）？如何实现 “懒加载” 且线程安全的单例？

**答：**

#### （1）多种实现方式

##### 方式 1：闭包（懒加载）

核心：利用闭包保存实例，首次调用时创建（懒加载）。

javascript

运行

\`\`\`javascript
const Singleton = (function () {let instance = null;function createInstance() {return { name: '单例实例' };}return {getInstance() {if (!instance) {
        instance = createInstance();}return instance;}};})();// 测试const ins1 = Singleton.getInstance();const ins2 = Singleton.getInstance();console.log(ins1 === ins2); // true
\`\`\`

##### 方式 2：Class（懒加载）

核心：静态方法中判断实例是否存在，不存在则创建。

javascript

运行

\`\`\`javascript
class Singleton {constructor() {if (Singleton.instance) {return Singleton.instance;}this.name = '单例实例';Singleton.instance = this;}static getInstance() {if (!Singleton.instance) {Singleton.instance = new Singleton();}return Singleton.instance;}}// 测试const ins1 = new Singleton();const ins2 = new Singleton();console.log(ins1 === ins2); // true
\`\`\`

##### 方式 3：Proxy（拦截实例创建）

核心：用 Proxy 拦截 \`new\` 操作，确保仅创建一个实例。

javascript

运行

\`\`\`javascript
class Singleton {constructor() {this.name = '单例实例';}}const singletonProxy = new Proxy(Singleton, {construct(target, args) {if (!target.instance) {
      target.instance = new target(...args);}return target.instance;}});// 测试const ins1 = new singletonProxy();const ins2 = new singletonProxy();console.log(ins1 === ins2); // true
\`\`\`

#### （2）懒加载 + 线程安全的单例

JavaScript 是「单线程」模型，无需处理多线程竞争，但 Node.js 的 \`worker_threads\` 多线程场景下需保证线程安全。

核心方案：

- 懒加载：首次调用 \`getInstance\` 时创建实例；
- 线程安全：用「互斥锁（Mutex）」保证同一时间仅一个线程创建实例。

javascript

运行

\`\`\`javascript
// Node.js 环境（需安装 worker_threads）const { Worker, isMainThread, Worker, Mutex } = require('worker_threads');class ThreadSafeSingleton {constructor() {this.name = '线程安全单例';}static instance = null;static mutex = new Mutex(); // 互斥锁static async getInstance() {if (this.instance) return this.instance;// 加锁：保证同一时间仅一个线程进入await this.mutex.acquire();try {// 双重检查：避免锁释放后重复创建if (!this.instance) {this.instance = new ThreadSafeSingleton();}} finally {this.mutex.release(); // 释放锁}return this.instance;}}// 测试多线程if (isMainThread) {new Worker(__filename);new Worker(__filename);} else {(async () => {const ins = await ThreadSafeSingleton.getInstance();console.log(\`线程 \${process.pid}：\`, ins); // 所有线程获取同一实例})();}
\`\`\``;export{n as default};
