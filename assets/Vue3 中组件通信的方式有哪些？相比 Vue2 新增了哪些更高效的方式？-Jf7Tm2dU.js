const n=`### Vue3 中组件通信的方式有哪些？相比 Vue2 新增了哪些更高效的方式？

**答**：

#### Vue3 支持的组件通信方式（含 Vue2 兼容方式）：

#### 相比 Vue2 新增的高效方式：

1. **<script setup>**** + defineExpose**：Vue2 中父组件获取子组件实例需通过 \`ref\` + 子组件 \`this\` 暴露，易污染全局；Vue3 的 \`defineExpose\` 可精准暴露子组件的属性 / 方法，且无需依赖 \`this\`：
2. vue

\`\`\`
<!-- 子组件 -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
const increment = () => count.value++
// 仅暴露 count 和 increment，其他内部逻辑隐藏
defineExpose({ count, increment })
<\/script>

<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
const childRef = ref(null)
const handleClick = () => {
  // 调用子组件方法
  childRef.value.increment()
  console.log(childRef.value.count)
}
<\/script>
<template>
  <Child ref="childRef" />
  <button @click="handleClick">调用子组件方法</button>
</template>
\`\`\`

1. **多参数 v-model**：Vue2 仅支持单个 v-model，多属性双向绑定需用 \`.sync\`（如 \`:title.sync="title"\`）；Vue3 支持 \`v-model:title\`、\`v-model:age\` 等多参数，语义更清晰且无需额外修饰符。
2. **组合式函数（Composables）**：Vue2 跨组件复用逻辑需用 mixins（命名冲突、溯源难）或 HOC（嵌套地狱）；Vue3 的组合式函数可封装独立通信逻辑（如 \`useModal\` 封装弹窗的显示 / 隐藏状态），跨组件复用且无冲突。
3. **Pinia 替代 Vuex4**：Pinia 简化了全局状态管理的 API（移除 Mutation、天然支持 TS、模块化更简洁），比 Vuex4 更适配 Vue3 的 Composition API，是 Vue3 官方推荐的全局通信方案。

#### 通信方式选型建议：

- 父子通信：优先 \`props/emit\` 或 \`v-model\`；需调用方法用 \`ref + defineExpose\`；
- 跨级通信：简单场景用 \`provide/inject\`，复杂场景用 Pinia；
- 全局通信：优先 Pinia，避免使用 EventBus（易导致数据流混乱）；
- 逻辑复用：优先组合式函数，替代 mixins/HOC。`;export{n as default};
