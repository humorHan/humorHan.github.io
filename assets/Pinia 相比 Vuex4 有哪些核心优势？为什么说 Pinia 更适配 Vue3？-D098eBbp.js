const e=`### 9. Pinia 相比 Vuex4 有哪些核心优势？为什么说 Pinia 更适配 Vue3？

**答**：

#### Pinia 核心优势（对比 Vuex4）：

1. **简化 API**：

   - 移除 Vuex 的 \`Mutation\`（仅保留 \`State/Action/Getter\`），Action 支持同步 / 异步，无需区分同步 \`mutation\` 和异步 \`action\`，代码更简洁；
   - 无需嵌套的模块（Module），通过创建多个 Store 实现模块化，避免 Vuex 模块嵌套的复杂度。
2. **类型友好**：Pinia 专为 TS 设计，无需手动定义类型，能自动推导 State/Action 的类型；Vuex4 需大量手动类型声明，体验差。
3. **轻量化**：Pinia 体积更小（约 1KB），Vuex4 体积更大，且 Pinia 无冗余 API，运行时性能更优。
4. **无命名空间烦恼**：Vuex 模块需手动开启命名空间（\`namespaced: true\`），调用时需指定命名空间；Pinia 每个 Store 天然独立，无需命名空间。
5. **更好的 DevTools 支持**：支持 Vue DevTools 调试，能查看 Store 的状态变化、Action 调用记录，且支持时间旅行，比 Vuex4 调试体验更好。
6. **兼容 Vue2/Vue3**：一套代码可适配两个版本，且在 Vue3 中能无缝结合 Composition API。

#### Pinia 更适配 Vue3 的原因：

1. **基于 Composition API 设计**：Pinia 的 Store 可直接在 \`<script setup>\` 中使用，支持 \`ref/reactive\` 等响应式 API，与 Vue3 生态无缝融合；
2. **无 this 依赖**：Pinia 的 Action 中无需依赖 \`this\`，通过 \`store\` 实例访问状态，适配 Vue3 的函数式写法；
3. **响应式系统适配**：Pinia 的 State 基于 Vue3 的 \`reactive\` 实现，支持 Proxy 响应式，能监听数组 / 对象的所有操作，与 Vue3 响应式原理一致；
4. **Tree Shaking 友好**：Pinia 的 API 设计为模块化导出，未使用的功能可被 Tree Shaking 移除，符合 Vue3 的打包优化理念。

#### 示例（Pinia 基本用法）：

ts

\`\`\`typescript
// stores/counter.tsimport { defineStore } from 'pinia'export const useCounterStore = defineStore('counter', {state: () => ({ count: 0 }),
  getters: {doubleCount: (state) => state.count * 2},
  actions: {increment() {this.count++ // 或 state.count++（也可解构 state）},async asyncIncrement() {await new Promise(resolve => setTimeout(resolve, 1000))this.count++}}})// 组件中使用<script setup>import { useCounterStore } from '@/stores/counter'const counterStore = useCounterStore()// 访问状态console.log(counterStore.count)// 调用 action
counterStore.increment()// 监听状态watch(() => counterStore.count, (newVal) => {})<\/script>
\`\`\``;export{e as default};
