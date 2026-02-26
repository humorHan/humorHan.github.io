const t=`### Pinia 中如何处理异步 action？和 Vuex 的异步 mutation/action 有什么不同？

**答**：

#### Pinia 处理异步 action 的方式：

Pinia 中无 \`Mutation\` 概念，所有同步 / 异步逻辑均写在 \`action\` 中，无需区分同步 / 异步，写法与普通异步函数一致：

ts

\`\`\`typescript
// stores/user.tsimport { defineStore } from 'pinia'import { api } from '@/api'export const useUserStore = defineStore('user', {state: () => ({
    userInfo: null,
    loading: false,
    error: null}),
  actions: {// 异步 actionasync fetchUserInfo(userId) {this.loading = truethis.error = nulltry {// 调用异步接口const res = await api.getUserInfo(userId)this.userInfo = res.data
      } catch (err) {this.error = err.message
      } finally {this.loading = false}},// 同步 action（也写在 actions 中）clearUserInfo() {this.userInfo = null}}})// 组件中使用<script setup>import { useUserStore } from '@/stores/user'const userStore = useUserStore()// 调用异步 action
userStore.fetchUserInfo(1)<\/script>
\`\`\`

#### Pinia 异步 action vs Vuex 异步 mutation/action：

#### 核心差异详解：

1. **移除 Mutation 简化逻辑**：Vuex 设计 Mutation 的初衷是 “追踪状态变更”，但实际开发中增加了语法复杂度（异步逻辑需先写 action，再 commit mutation）；Pinia 移除 Mutation，直接在 action 中修改 state，且 DevTools 仍能追踪状态变更（记录 action 调用和 state 变化）。
2. **更自然的异步写法**：Pinia 的 action 支持 async/await 原生写法，无需包裹额外的 dispatch/commit；Vuex 的 action 需通过 context 调度，写法繁琐。
3. **类型友好性**：Pinia 的 action 中 \`this\` 指向明确的 store 实例，TS 可自动推导 state/action 的类型；Vuex 需手动定义 \`ActionContext\` 类型，且 mutation 的 payload 类型易丢失。
4. **模块化简化**：Vuex 模块需手动配置命名空间，调用时需写完整路径（如 \`user/fetchUserInfo\`）；Pinia 每个 store 天然独立，调用时直接导入 store 实例即可，无命名空间烦恼。`;export{t as default};
