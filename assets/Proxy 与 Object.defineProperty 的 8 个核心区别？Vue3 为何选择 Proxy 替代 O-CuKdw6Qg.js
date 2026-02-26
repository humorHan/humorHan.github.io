const e=`### Proxy 与 Object.defineProperty 的 8 个核心区别？Vue3 为何选择 Proxy 替代 Object.defineProperty？

**答：**

#### （1）8 个核心区别

#### （2）Vue3 选择 Proxy 的原因

Vue2 用 \`Object.defineProperty\` 实现响应式，存在以下缺陷：

1. **数组监听缺陷**：无法监听数组索引修改、长度修改，需重写 \`push/pop/shift/unshift/splice/sort/reverse\` 7 个方法；
2. **动态属性缺陷**：新增 / 删除对象属性时，需手动调用 \`Vue.set/Vue.delete\` 触发响应式；
3. **性能缺陷**：需遍历对象所有属性逐个监听，属性越多性能越差；
4. **深度监听缺陷**：需递归遍历嵌套对象，初始化成本高。

Vue3 用 Proxy 解决了上述问题：

- 原生支持数组监听，无需重写数组方法；
- 自动监听新增 / 删除属性，无需手动触发；
- 监听整个对象，初始化性能更优；
- 懒监听嵌套对象（访问时才递归监听），减少初始化开销。`;export{e as default};
