const n=`### 13. 浅拷贝与深拷贝的区别？实现深拷贝的 3 种方法（含循环引用处理）？

**答案**：

#### 核心区别：

#### 1. 浅拷贝实现（示例）：

js

\`\`\`javascript
const obj = { a: 1, b: { c: 2 } };// 方法1：Object.assignconst obj1 = Object.assign({}, obj);// 方法2：扩展运算符const obj2 = { ...obj };// 方法3：数组浅拷贝（slice/concat/...）const arr = [1, [2, 3]];const arr1 = arr.slice();// 验证：修改第二层属性，原对象也变（浅拷贝）
obj1.b.c = 3;console.log(obj.b.c); // 3
\`\`\`

#### 2. 深拷贝实现（3 种方法）：

##### 方法 1：JSON.parse (JSON.stringify ())（简单场景，有局限）

**原理**：将对象转为 JSON 字符串，再转回对象（自动递归拷贝）。**局限**：

- 无法拷贝函数、RegExp、Date、Symbol、BigInt；
- 无法处理循环引用；
- 拷贝 \`undefined\`/\`NaN\`/\`Infinity\` 会转为 \`null\`。

js

\`\`\`javascript
const obj = { a: 1, b: { c: 2 }, d: new Date() };const deepObj = JSON.parse(JSON.stringify(obj));console.log(deepObj.d); // 字符串（不是Date对象）
\`\`\`

##### 方法 2：自定义递归深拷贝（处理循环引用）

**原理**：递归遍历对象属性，对引用类型新建对象，用 \`WeakMap\` 缓存已拷贝对象，解决循环引用。

js

\`\`\`javascript
function deepClone(target, map = new WeakMap()) {// 处理null/undefinedif (target === null || typeof target !== "object") return target;// 处理循环引用if (map.has(target)) return map.get(target);// 处理Date/RegExpif (target instanceof Date) return new Date(target);if (target instanceof RegExp) return new RegExp(target);// 处理数组/对象（新建实例）const cloneTarget = Array.isArray(target) ? [] : {};
  map.set(target, cloneTarget); // 缓存已拷贝对象// 递归拷贝属性for (const key in target) {if (target.hasOwnProperty(key)) { // 仅拷贝自有属性
      cloneTarget[key] = deepClone(target[key], map);}}return cloneTarget;}// 测试循环引用const obj = { a: 1 };
obj.b = obj; // 循环引用const deepObj = deepClone(obj);console.log(deepObj.b.a); // 1（无栈溢出，拷贝成功）
\`\`\`

##### 方法 3：使用第三方库（如 Lodash 的_.cloneDeep）

**原理**：成熟的深拷贝实现，支持所有类型（函数 / 循环引用 / Symbol 等）。

js

\`\`\`javascript
const _ = require("lodash");const obj = { a: 1, b: { c: 2 }, fn: () => {}, symbol: Symbol("test") };const deepObj = _.cloneDeep(obj);console.log(deepObj.fn === obj.fn); // false（函数也拷贝）console.log(deepObj.symbol === obj.symbol); // false（Symbol唯一）
\`\`\``;export{n as default};
