const n=`### 什么是反柯里化？实现一个通用的反柯里化函数，并说明应用场景？

**答：**

#### （1）反柯里化定义

反柯里化（Uncurrying）的核心是**剥离函数与特定 ****this**** 的绑定关系**，让原本只能由特定对象调用的方法（如 \`Array.prototype.push\`）可以被任意对象调用，本质是「泛化函数的 \`this\` 范围」。

柯里化是「多参数函数拆解为单参数链式调用」，反柯里化则是「让函数的 \`this\` 不局限于原对象，参数更灵活」。

#### （2）通用反柯里化实现

javascript

运行

\`\`\`javascript
// 方式1：原型方法扩展Function.prototype.uncurrying = function () {const self = this; // 保存原函数（如 Array.prototype.push）return function (...args) {// 用 call 改变 this，第一个参数是新 this，剩余是原函数参数return self.call(...args);};};// 方式2：通用工具函数function uncurrying(fn) {return function (...args) {return fn.call(...args);};}// 示例：复用 Array.prototype.pushconst push = uncurrying(Array.prototype.push);const obj = { length: 0 };push(obj, 1, 2); // 等价于 Array.prototype.push.call(obj, 1, 2)console.log(obj); // { 0: 1, 1: 2, length: 2 }
\`\`\`

#### （3）应用场景

- **复用内置方法**：如用 \`Array.prototype\` 方法操作类数组对象（arguments、DOM NodeList）；
- **简化函数调用**：避免重复写 \`call/apply\`，提升代码可读性；
- **兼容不同对象的同名方法**：统一调用方式（如不同对象的 \`toString\` 方法）。`;export{n as default};
