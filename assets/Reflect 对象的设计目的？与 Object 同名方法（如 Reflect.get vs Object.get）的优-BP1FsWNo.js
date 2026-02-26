const e=`### Reflect 对象的设计目的？与 Object 同名方法（如 Reflect.get vs Object.get）的优势？

**答：**

#### （1）Reflect 设计目的

- **统一对象操作 API**：将 Object 的「命令式操作」（如 \`delete obj.key\`、\`obj.hasOwnProperty(key)\`）转为「函数式操作」（\`Reflect.deleteProperty\`、\`Reflect.has\`）；
- **与 Proxy 配套**：Reflect 的方法与 Proxy 的陷阱方法一一对应，便于在 Proxy 中调用原生操作；
- **返回操作结果**：Object 方法失败时抛错，Reflect 方法返回布尔值表示操作成功与否；
- **函数参数更合理**：如 \`Reflect.get(target, key, receiver)\` 支持指定 \`this\`，而 \`Object.getOwnPropertyDescriptor\` 参数更直观；
- **避免全局污染**：将对象操作从 Object 上剥离，减少 Object 原型链污染风险。

#### （2）与 Object 同名方法的优势

#### （3）示例

javascript

运行

\`\`\`javascript
const obj = { a: 1 };const proxy = new Proxy(obj, {get(target, key, receiver) {// Reflect.get 支持 receiver，保证 this 指向 proxyreturn Reflect.get(target, key, receiver) * 2;}});console.log(proxy.a); // 2// Object 方法需手动处理错误const nonObj = 123;// Object.prototype.hasOwnProperty.call(nonObj, 'a'); // 需手动绑定 thisReflect.has(nonObj, 'a'); // 返回 false，不抛错
\`\`\``;export{e as default};
