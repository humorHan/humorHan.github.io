const n=`### 19. Vue3 中如何实现组件复用？组合式函数（Composables）的设计思路和最佳实践是什么？

**答**：

#### Vue3 组件复用的核心方式：

1. **组合式函数（Composables）**：Vue3 推荐的复用方式，基于 Composition API 封装可复用逻辑；
2. **常规组件复用**：基础的父子组件、通用组件（如 Button/Input）；
3. **异步组件**：按需加载的复用组件（如弹窗、表格）；
4. **Teleport + 全局组件**：如全局弹窗、提示组件。

其中，**组合式函数** 是 Vue3 解决 “逻辑复用” 的核心方案，替代 Vue2 的 mixins/HOC。

#### 组合式函数（Composables）的设计思路：

1. **单一职责**：一个组合式函数只封装一个核心逻辑（如 \`useRequest\` 处理请求、\`usePagination\` 处理分页）；
2. **数据隔离**：函数内部的响应式数据（ref/reactive）独立，每次调用返回新的实例，避免复用冲突；
3. **暴露最小接口**：仅暴露必要的变量 / 方法（如 \`usePagination\` 暴露 \`pageNum\`/\`pageSize\`/\`changePage\`），隐藏内部实现；
4. **逻辑内聚**：将相关的响应式数据、方法、监听、生命周期钩子封装在一起，形成完整的业务逻辑单元。

#### 最佳实践：

1. **命名规范**：组合式函数以 \`use\` 开头（如 \`useCart\`/\`useUser\`），清晰标识可复用逻辑；
2. **返回响应式数据**：返回 ref/reactive 数据，确保复用后仍保持响应式；
3. **支持参数配置**：函数接收配置参数，提升灵活性（如 \`useRequest({ url: '/api/list', method: 'GET' })\`）；
4. **清理副作用**：若函数内有定时器、事件监听等，需在 \`onUnmounted\` 中清理，避免内存泄漏；
5. **避免依赖外部状态**：函数内部逻辑尽量不依赖组件的外部状态，通过参数传入，提升复用性；
6. **类型定义**：结合 TS 定义入参和返回值类型，提升可维护性。

#### 示例（usePagination 分页逻辑）：

vue

\`\`\`
// composables/usePagination.ts
import { ref, watch } from 'vue'

// 定义类型
interface PaginationOptions {
  defaultPageNum?: number
  defaultPageSize?: number
  onPageChange?: (pageNum: number, pageSize: number) => void
}

// 组合式函数
export function usePagination(options: PaginationOptions = {}) {
  // 响应式数据
  const pageNum = ref(options.defaultPageNum || 1)
  const pageSize = ref(options.defaultPageSize || 10)

  // 方法
  const changePage = (num: number) => {
    pageNum.value = num
  }

  const changePageSize = (size: number) => {
    pageSize.value = size
    pageNum.value = 1 // 切换页大小重置页码
  }

  // 监听页码变化，触发回调
  watch([pageNum, pageSize], ([newPageNum, newPageSize]) => {
    options.onPageChange?.(newPageNum, newPageSize)
  }, { immediate: true })

  // 暴露必要接口
  return {
    pageNum,
    pageSize,
    changePage,
    changePageSize
  }
}

// 组件中使用
<script setup lang="ts">
import { usePagination } from '@/composables/usePagination'

// 复用分页逻辑
const { pageNum, pageSize, changePage, changePageSize } = usePagination({
  defaultPageNum: 1,
  defaultPageSize: 10,
  onPageChange: (num, size) => {
    console.log('页码变化：', num, size)
    // 调用接口获取数据
    // fetchList({ pageNum: num, pageSize: size })
  }
})
<\/script>
\`\`\``;export{n as default};
