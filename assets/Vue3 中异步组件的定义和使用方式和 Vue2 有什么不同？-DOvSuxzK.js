const n=`### 15. Vue3 中异步组件的定义和使用方式和 Vue2 有什么不同？

**答**：

#### 核心区别：

#### Vue2 异步组件定义：

js

\`\`\`javascript
// Vue2 组件注册export default {components: {AsyncComponent: () => import('./AsyncComponent.vue')}}
\`\`\`

仅支持基础的异步加载，无加载中 / 错误处理、延迟等配置，需手动管理 \`loading\` 状态。

#### Vue3 异步组件定义：

1. **基础用法**：
2. vue

\`\`\`
<script setup>
import { defineAsyncComponent } from 'vue'

// 基础定义（等价 Vue2）
const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))
<\/script>
\`\`\`

1. **带配置项（核心改进）**：
2. vue

\`\`\`
<script setup>
import { defineAsyncComponent } from 'vue'
import LoadingComponent from './LoadingComponent.vue'
import ErrorComponent from './ErrorComponent.vue'

const AsyncComponent = defineAsyncComponent({
  // 加载函数
  loader: () => import('./AsyncComponent.vue'),
  // 加载中组件
  loadingComponent: LoadingComponent,
  // 加载失败组件
  errorComponent: ErrorComponent,
  // 延迟显示 loading（默认 200ms）
  delay: 100,
  // 超时时间（超时触发 errorComponent）
  timeout: 3000,
  // 是否挂起（配合 Suspense，默认 true）
  suspensible: true,
  // 错误回调
  onError: (err, retry, fail, attempts) => {
    if (attempts < 3) {
      // 重试加载（最多 3 次）
      retry()
    } else {
      // 失败
      fail()
    }
  }
})
<\/script>
\`\`\`

#### 核心改进总结：

1. **标准化定义**：Vue3 引入 \`defineAsyncComponent\` 统一封装异步组件，API 更规范；
2. **内置状态管理**：支持配置加载中 / 错误组件，无需手动管理 \`loading\`/\`error\` 状态；
3. **灵活的加载控制**：支持延迟、超时、重试等配置，适配复杂场景；
4. **Suspense 适配**：默认支持 Suspense 捕获加载状态，简化异步渲染逻辑；
5. **类型支持**：结合 TS 可定义异步组件的 props/emit 类型，提升类型安全性。`;export{n as default};
