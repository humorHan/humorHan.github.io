const e=`### 实现一个简易的事件总线（EventBus）？需支持 on/off/emit/once 方法，且处理重复订阅？

**答：**

#### （1）核心思路

- 用对象 \`events\` 存储事件名与回调数组的映射；
- \`on\`：添加回调，检查重复（避免同一回调多次订阅）；
- \`once\`：添加一次性回调（执行后自动移除）；
- \`emit\`：触发事件，遍历回调数组执行；
- \`off\`：移除指定回调（无参数则清空所有事件）。

#### （2）实现代码

javascript

运行

\`\`\`javascript
class EventBus {constructor() {this.events = Object.create(null); // 存储事件：{ eventName: [fn1, fn2] }}// 订阅事件（去重）on(eventName, callback) {if (typeof callback !== 'function') {throw new TypeError('callback must be a function');}// 初始化事件回调数组if (!this.events[eventName]) {this.events[eventName] = [];}// 去重：避免同一回调重复订阅if (!this.events[eventName].includes(callback)) {this.events[eventName].push(callback);}return this; // 链式调用}// 一次性订阅once(eventName, callback) {// 包装回调，执行后自动取消订阅const wrapCallback = (...args) => {
      callback.apply(this, args);this.off(eventName, wrapCallback);};this.on(eventName, wrapCallback);return this;}// 触发事件emit(eventName, ...args) {const callbacks = this.events[eventName] || [];// 拷贝数组，避免执行中回调被移除导致漏执行[...callbacks].forEach(callback => {
      callback.apply(this, args);});return this;}// 取消订阅off(eventName, callback) {// 无参数：清空所有事件if (!eventName) {this.events = Object.create(null);return this;}const callbacks = this.events[eventName];if (!callbacks) return this;// 仅传 eventName：清空该事件的所有回调if (!callback) {this.events[eventName] = [];return this;}// 移除指定回调this.events[eventName] = callbacks.filter(fn => fn !== callback);return this;}}// 测试用例const bus = new EventBus();// 普通订阅const log = (msg) => console.log(msg);
bus.on('test', log);
bus.emit('test', 'hello'); // hello// 重复订阅（去重）
bus.on('test', log);
bus.emit('test', 'world'); // 仅输出一次 world// 一次性订阅
bus.once('once', (msg) => console.log('once:', msg));
bus.emit('once', 'hi'); // once: hi
bus.emit('once', 'hi'); // 无输出// 取消订阅
bus.off('test', log);
bus.emit('test', 'bye'); // 无输出
\`\`\``;export{e as default};
