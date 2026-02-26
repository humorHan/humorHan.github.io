const e=`### 深拷贝时如何处理循环引用？手写支持循环引用的深拷贝函数？

**答案**：

#### 一、循环引用的定义

循环引用指对象 / 数组引用自身，或多个对象相互引用形成闭环，如：

js

\`\`\`javascript
// 自引用const obj = { a: 1 };
obj.self = obj;// 相互引用const a = { b: null };const b = { a: null };
a.b = b;
b.a = a;
\`\`\`

普通递归深拷贝会因循环引用导致栈溢出（\`RangeError: Maximum call stack size exceeded\`），需通过 “缓存已拷贝对象” 解决。

#### 二、核心解决思路

1. **缓存机制**：用 \`WeakMap\`（弱引用，不影响 GC 回收）存储已拷贝的源对象 → 目标对象的映射；
2. **递归前检查**：递归拷贝前，先检查缓存中是否已有该对象，有则直接返回缓存的目标对象；
3. **递归拷贝**：无缓存则创建新对象 / 数组，存入缓存后再递归拷贝属性。

#### 三、手写支持循环引用的深拷贝函数

js

\`\`\`javascript
/**
 * 支持循环引用的深拷贝
 * @param {any} target - 待拷贝的目标
 * @param {WeakMap} cache - 缓存已拷贝对象（避免循环引用）
 * @returns {any} 拷贝后的新对象
 */function deepClone(target, cache = new WeakMap()) {// 1. 处理基本类型和null/undefinedif (target === null || typeof target !== "object") {return target;}// 2. 检查缓存：已拷贝则直接返回if (cache.has(target)) {return cache.get(target);}// 3. 处理日期/正则if (target instanceof Date) {const newDate = new Date(target);
    cache.set(target, newDate);return newDate;}if (target instanceof RegExp) {const newReg = new RegExp(target.source, target.flags);
    cache.set(target, newReg);return newReg;}// 4. 处理数组/对象（创建新实例）const cloneTarget = Array.isArray(target) ? [] : {};// 5. 存入缓存（关键：先存缓存再递归，避免循环引用）
  cache.set(target, cloneTarget);// 6. 递归拷贝属性（遍历自有可枚举属性，包括Symbol）const keys = [...Object.keys(target), ...Object.getOwnPropertySymbols(target)];
  keys.forEach(key => {
    cloneTarget[key] = deepClone(target[key], cache);});return cloneTarget;}// 测试循环引用const obj = { a: 1, arr: [2, 3] };
obj.self = obj; // 自引用const clonedObj = deepClone(obj);console.log(clonedObj); // { a:1, arr:[2,3], self: [Circular] }console.log(clonedObj.self === clonedObj); // true（正确引用拷贝后的自身）console.log(clonedObj.arr === obj.arr); // false（数组是新实例）// 测试相互引用const a = { b: null };const b = { a: null };
a.b = b;
b.a = a;const clonedA = deepClone(a);console.log(clonedA.b.a === clonedA); // true（相互引用正确）
\`\`\`

#### 四、关键细节说明

1. **WeakMap 的优势**：

   - 弱引用：缓存的对象仅在源对象存在时保留，源对象被 GC 回收后，缓存也会自动清理，避免内存泄漏；
   - 键支持对象类型：可直接以源对象为键，映射到拷贝后的目标对象。
2. **处理 Symbol 属性**：\`Object.keys\` 仅遍历字符串键，需结合 \`Object.getOwnPropertySymbols\` 遍历 Symbol 键；
3. **先存缓存再递归**：若先递归再存缓存，循环引用时会重复进入递归，仍会栈溢出。`;export{e as default};
