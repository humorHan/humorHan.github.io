const n=`### 14. Suspense 组件的作用是什么？使用 Suspense 有哪些限制和注意事项？

**答**：

#### Suspense 的作用：

Suspense（悬念）是 Vue3 新增的内置组件，用于处理异步组件的加载状态：

1. **统一管理异步加载**：包裹异步组件，在组件加载完成前显示 “加载中” 内容（fallback），加载完成后显示组件内容。
2. **支持多个异步组件**：可包裹多个异步组件，等待所有异步组件加载完成后再渲染，避免局部加载的闪烁问题。
3. **简化异步逻辑**：无需在每个组件内手动管理 \`loading\` 状态，由 Suspense 统一处理。

#### 基本用法：

vue

\`\`\`
<script setup>
import { defineAsyncComponent } from 'vue'

// 定义异步组件
const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))
<\/script>

<template>
  <Suspense>
    <!-- 异步组件 -->
    <template #default>
      <AsyncComponent />
    </template>
    <!-- 加载中占位 -->
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>
\`\`\`

#### 限制和注意事项：

1. **仅支持异步组件和有异步 setup 的组件**：Suspense 仅能捕获异步组件（\`defineAsyncComponent\` 定义）或 setup 返回 Promise 的组件的加载状态，无法捕获普通组件内的异步操作（如 \`setTimeout\`、接口请求）。
2. **不支持 SSR 完全兼容**：在服务端渲染（SSR）场景下，Suspense 的行为存在限制，部分场景可能无法正常渲染 fallback 内容。
3. **错误处理需配合 ErrorBoundary**：Suspense 不处理异步组件加载失败的情况，需结合自定义 ErrorBoundary 组件捕获错误：
4. vue

\`\`\`
<template>
  <ErrorBoundary>
    <Suspense>
      <AsyncComponent />
      <template #fallback>加载中...</template>
    </Suspense>
  </ErrorBoundary>
</template>
\`\`\`

1. **setup 中使用 await 需谨慎**：若组件 setup 中使用 \`await\`，需确保组件被 Suspense 包裹，否则会报错；且 \`await\` 后的代码需等待异步完成后执行。
2. **嵌套 Suspense 需注意优先级**：嵌套 Suspense 时，内层 Suspense 的 fallback 会优先显示，外层 Suspense 需等待内层加载完成。
3. **不支持过渡动画直接包裹**：若需为 Suspense 加过渡动画，需将 Transition 包裹在 Suspense 内部，而非外部。`;export{n as default};
