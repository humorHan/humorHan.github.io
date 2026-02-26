const e=`### 1. Vue2 的响应式原理是什么？该实现方式存在哪些核心缺陷？

**答：**

- **响应式原理**：Vue2 基于 \`Object.defineProperty()\` 实现数据响应式。核心流程为：

  1. 初始化时遍历 data 中的所有属性，使用 \`Object.defineProperty()\` 为每个属性设置 getter/setter；
  2. 当组件渲染时，会触发属性的 getter，将当前组件的 Watcher 收集到该属性的依赖收集器（Dep）中；
  3. 当属性值被修改时，会触发 setter，通知 Dep 中的所有 Watcher 执行更新，进而重新渲染组件。
- **核心缺陷**：

  1. 无法检测数组下标修改（如 \`arr[0] = 1\`）和数组长度修改（如 \`arr.length = 0\`）；
  2. 无法检测对象新增 / 删除属性（如 \`obj.newKey = 2\`）；
  3. 对嵌套对象的响应式处理需要递归遍历，数据层级过深时初始化性能较差；
  4. \`Object.defineProperty()\` 只能劫持属性，无法劫持整个对象，新增属性需手动处理。`;export{e as default};
