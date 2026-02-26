const t=`### 5. Vuex 的核心五大概念（State、Getter、Mutation、Action、Module）分别是什么？Mutation 和 Action 的核心区别？

**答：**

- **五大核心概念**：

  1. State：存储全局共享的状态数据（类似组件的 data）；
  2. Getter：基于 State 派生的计算属性（类似组件的 computed，可缓存、复用）；
  3. Mutation：修改 State 的唯一方式，同步操作，通过 \`commit\` 触发；
  4. Action：处理异步逻辑，可通过 \`dispatch\` 触发，内部可提交 Mutation 修改 State；
  5. Module：将 Vuex 仓库拆分为多个模块（解决单一 State 过于臃肿的问题），每个模块拥有独立的 State、Getter、Mutation、Action。
- **Mutation 和 Action 的核心区别**：

  1. 执行类型：Mutation 只能是**同步操作**，Action 支持**异步操作**（如请求接口、定时器）；
  2. 触发方式：Mutation 通过 \`this.$store.commit('xxx')\` 触发，Action 通过 \`this.$store.dispatch('xxx')\` 触发；
  3. 修改 State：Mutation 可直接修改 State，Action 不能直接修改 State，需通过提交 Mutation 实现；
  4. 调试追踪：Vue Devtools 可追踪 Mutation 的每一次状态修改，但无法直接追踪 Action 的异步操作（需结合 Mutation 查看）。`;export{t as default};
