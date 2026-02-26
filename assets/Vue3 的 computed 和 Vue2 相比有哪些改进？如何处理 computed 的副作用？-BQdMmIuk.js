const e=`### 8. Vue3 的 computed 和 Vue2 相比有哪些改进？如何处理 computed 的副作用？

**答**：

#### Vue3 computed 的改进：

1. **写法更灵活**：

   - 支持组合式 API 写法（\`const fullName = computed(() => {})\`），无需依赖 \`this\`；
   - 支持 TS 类型推导，返回值类型可自动推断或手动指定。
2. **可写性增强**：Vue2 的 computed 可写需定义 \`get/set\`；Vue3 保持该特性，但组合式写法更简洁：
3. vue

\`\`\`
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 只读 computed
const fullName = computed(() => \`\${firstName.value}\${lastName.value}\`)

// 可写 computed
const fullNameWritable = computed({
  get: () => \`\${firstName.value}\${lastName.value}\`,
  set: (value) => {
    const [f, l] = value.split('')
    firstName.value = f
    lastName.value = l
  }
})
<\/script>
\`\`\`

1. **性能优化**：Vue3 的 computed 基于响应式系统重构，缓存逻辑更高效，且支持惰性计算（仅当依赖变化且被访问时才重新计算）。
2. **类型友好**：结合 TS 可精准定义 computed 的返回类型，如 \`const num = computed<number>(() => 1)\`。

#### 处理 computed 的副作用：

computed 设计初衷是 “纯计算”（无副作用），但如需处理副作用（如请求数据、修改 DOM），需注意：

1. **避免直接在 computed 中写副作用**：computed 可能被多次触发，且缓存机制可能导致副作用执行时机不可控；
2. **通过 watch/watchEffect 配合 computed**：将 computed 作为依赖，在 watch 中处理副作用：
3. vue

\`\`\`
<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 监听 computed 结果，处理副作用
watch(doubleCount, (newVal) => {
  console.log('doubleCount变化，触发副作用：', newVal)
  // 如请求数据、修改 DOM 等
})
<\/script>
\`\`\`

1. **可写 computed 的 set 方法中处理副作用**：仅适用于可写 computed，且副作用需轻量（如更新依赖数据）。`;export{e as default};
