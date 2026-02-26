const n=`### 18. Vue3 中自定义指令的钩子函数有哪些变化？和 Vue2 的指令钩子有什么区别？

**答**：

#### Vue2 vs Vue3 指令钩子对比：

#### Vue3 新增钩子（可选）：

- \`beforeMount\`：元素挂载前触发；
- \`beforeUpdate\`：组件更新前触发；
- \`beforeUnmount\`：元素卸载前触发。

#### 核心区别总结：

1. **钩子命名更语义化**：如 \`bind\` → \`created\`、\`inserted\` → \`mounted\`、\`unbind\` → \`unmounted\`，更贴合组件生命周期命名规则。
2. **合并冗余钩子**：Vue2 的 \`update\`（组件更新中）和 \`componentUpdated\`（组件更新完成）合并为 Vue3 的 \`updated\`（仅在更新完成后触发），简化逻辑；新增 \`beforeUpdate\` 满足更新前的操作需求。
3. **钩子参数结构变化**：

   - Vue2 钩子参数为 \`(el, binding, vnode, oldVnode)\`；
   - Vue3 钩子参数为一个对象，包含 \`el\`/\`binding\`/\`vnode\`/\`prevVNode\`（旧 VNode），更易解构和类型推导：
   - js

   \`\`\`javascript
   \`\`\`

// Vue2Vue.directive('focus', {inserted: (el) => el.focus()})// Vue3
app.directive('focus', {mounted: (el) => el.focus()})

\`\`\`

4. **Composition API 适配**：Vue3 指令钩子可在 \`<script setup>\` 中定义，支持 TS 类型，且可访问组件的响应式数据（通过 \`vnode.context\`）。

5. **函数式指令简化**：若仅需 \`mounted\` + \`updated\` 逻辑，Vue3 支持简化写法：

6. js

\`\`\`javascript
// 函数式指令（等价 mounted + updated）
app.directive('color', (el, binding) => {
  el.style.color = binding.value})
\`\`\`

#### 完整示例（Vue3 自定义指令）：

vue

\`\`\`
<script setup>
import { ref } from 'vue'

// 定义自定义指令
const vFocus = {
  beforeMount: (el) => {
    console.log('元素挂载前')
  },
  mounted: (el) => {
    el.focus() // 挂载后聚焦
  },
  beforeUpdate: (el, binding) => {
    console.log('组件更新前', binding.value)
  },
  updated: (el, binding) => {
    console.log('组件更新完成', binding.value)
  },
  beforeUnmount: (el) => {
    console.log('元素卸载前')
  },
  unmounted: (el) => {
    console.log('元素卸载完成')
  }
}

// 注册到 app（全局注册需在 createApp 后）
// app.directive('focus', vFocus)

const inputValue = ref('')
<\/script>

<template>
  <!-- 局部使用指令 -->
  <input v-focus v-model="inputValue" />
</template>
\`\`\``;export{n as default};
