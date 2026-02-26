const n=`### 7. Vue3 中 watch 和 watchEffect 的区别是什么？各自的适用场景有哪些？

**答**：

#### 核心区别：

#### 适用场景：

- **watch**：

  1. 需监听特定数据变化，且要获取新旧值（如 \`watch(count, (newVal, oldVal) => {})\`）；
  2. 需按需执行（非首次执行），如表单提交后监听数据变化；
  3. 监听多个数据，且需自定义触发条件（如 \`watch([a, b], ([newA, newB], [oldA, oldB]) => {})\`）；
  4. 监听深层对象（需配置 \`deep: true\`），如 \`watch(() => user.info, () => {}, { deep: true })\`。
- **watchEffect**：

  1. 需监听 “回调中用到的所有响应式数据”，无需显式指定（如自动监听表单所有输入项变化）；
  2. 首次加载需执行的逻辑（如页面初始化时请求数据，且数据依赖响应式参数）；
  3. 简单的副作用处理（如根据多个数据变化更新 DOM、清理定时器等）。

#### 示例：

vue

\`\`\`
<script setup>
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const name = ref('张三')

// watch：显式监听 count，获取新旧值，默认不执行
watch(count, (newVal, oldVal) => {
  console.log('count变化：', newVal, oldVal)
}, { immediate: true }) // 开启首次执行

// watchEffect：自动收集 count 和 name 依赖，首次执行
const stop = watchEffect(() => {
  console.log('依赖变化：', count.value, name.value)
  // 清理副作用（如定时器）
  return () => {
    clearTimeout(timer)
  }
})

// 停止监听
// stop()
<\/script>
\`\`\``;export{n as default};
