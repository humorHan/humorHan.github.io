const n=`### 3. Vue3 的生命周期钩子函数有哪些变化？setup 中如何使用生命周期钩子？

**答**：

#### 生命周期钩子的核心变化：

1. **命名调整**：Vue2 的 \`beforeDestroy\`/\`destroyed\` 重命名为 \`beforeUnmount\`/\`unmounted\`，更贴合语义（Vue3 中 “销毁” 改为 “卸载”）。
2. **移除钩子**：移除 \`beforeCreate\` 和 \`created\`（setup 执行时机覆盖这两个钩子，无需单独定义）。
3. **组合式 API 写法**：新增以 \`on\` 开头的组合式生命周期钩子（如 \`onMounted\`），替代 Options API 的写法。
4. **执行时机**：setup 执行于 \`beforeCreate\` 之后、\`created\` 之前，无需再写这两个钩子。

#### setup 中使用生命周期钩子：

需从 \`vue\` 导入对应的钩子函数，在 setup 内调用，传入回调函数即可：

vue

\`\`\`
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

// 挂载后执行
onMounted(() => {
  console.log('组件挂载完成')
})

// 更新后执行
onUpdated(() => {
  console.log('组件更新完成')
})

// 卸载前执行
onUnmounted(() => {
  console.log('组件即将卸载')
})
<\/script>
\`\`\`

- 所有组合式生命周期钩子仅能在 setup（或 \`<script setup>\`）中同步调用，不能在异步回调中调用；
- 可多次调用同一钩子，回调会按顺序执行；
- 对应关系：`;export{n as default};
