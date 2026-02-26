const e=`### 深拷贝如何处理循环引用？如何兼容特殊类型（RegExp/Date/Function/Map/Set）？

**答：**

#### （1）循环引用处理

循环引用指对象引用自身（如 \`obj.self = obj\`），普通深拷贝会无限递归导致栈溢出。核心解决方案是**用缓存容器（如 WeakMap）记录已拷贝的对象**，拷贝时先检查缓存：若已存在则直接返回缓存的副本，避免重复拷贝。

#### （2）特殊类型兼容

不同特殊类型的拷贝逻辑需针对性处理，核心思路是「创建对应类型的新实例，复制其核心属性」：

- **Date/RegExp**：基于原实例的原始值创建新实例（RegExp 需保留 flags）；
- **Function**：函数一般直接复用（因函数拷贝无实际意义，且无法深拷贝闭包）；
- **Map/Set**：遍历键值对 / 值，递归拷贝后重新插入新实例；
- **普通对象 / 数组**：递归遍历属性 / 元素，拷贝值。

#### 完整实现代码

javascript

运行

\`\`\`javascript
function deepClone(target, cache = new WeakMap()) {// 基本类型/函数：直接返回（函数无需深拷贝）if (target === null || typeof target !== 'object') return target;// 处理循环引用if (cache.has(target)) return cache.get(target);let cloneObj;// 处理 Dateif (target instanceof Date) {
    cloneObj = new Date(target);}// 处理 RegExpelse if (target instanceof RegExp) {
    cloneObj = new RegExp(target.source, target.flags);}// 处理 Mapelse if (target instanceof Map) {
    cloneObj = new Map();
    cache.set(target, cloneObj); // 先缓存，避免循环引用
    target.forEach((val, key) => cloneObj.set(deepClone(key, cache), deepClone(val, cache)));}// 处理 Setelse if (target instanceof Set) {
    cloneObj = new Set();
    cache.set(target, cloneObj);
    target.forEach(val => cloneObj.add(deepClone(val, cache)));}// 处理数组/普通对象else {
    cloneObj = Array.isArray(target) ? [] : {};
    cache.set(target, cloneObj); // 缓存当前对象// 遍历所有可枚举属性（含Symbol）Reflect.ownKeys(target).forEach(key => {
      cloneObj[key] = deepClone(target[key], cache);});}return cloneObj;}
\`\`\``;export{e as default};
