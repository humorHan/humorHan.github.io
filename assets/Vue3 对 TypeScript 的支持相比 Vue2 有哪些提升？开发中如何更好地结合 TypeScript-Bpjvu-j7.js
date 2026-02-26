const n=`### 20. Vue3 对 TypeScript 的支持相比 Vue2 有哪些提升？开发中如何更好地结合 TypeScript？

**答**：

#### Vue3 对 TS 支持的核心提升：

1. **源码重构为 TS**：Vue3 源码完全用 TS 编写，类型定义更精准，无需依赖第三方类型库（如 \`@vue/runtime-dom\` 内置完整类型）；Vue2 源码为 JS，类型定义需单独维护，存在滞后和不完整问题。
2. **Composition API 天然适配 TS**：

   - Options API 依赖 \`this\` 动态指向，TS 无法精准推导类型（如 \`this.count\` 需手动声明）；
   - Composition API 基于函数式写法，无需 \`this\`，变量 / 方法类型可自动推导，如 \`const count = ref(0)\` 自动推导为 \`Ref<number>\`。
3. **组件 props/emit 类型强化**：

   - Vue2 需用 \`Vue.extend\` 或手动声明 props 类型，繁琐且易出错；
   - Vue3 的 \`defineProps\`/\`defineEmits\` 支持 TS 泛型，可精准定义类型：
   - vue

   \`\`\`
   \`\`\`

<script setup lang="ts">
// Props 类型定义
interface Props {
  title: string
  count?: number
}
const props = defineProps<Props>()

// Emits 类型定义
const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'delete', id: number): void
}>()
<\/script>

\`\`\`

4. **全局 API 类型友好**：Vue3 的 \`createApp\`/\`app.config.globalProperties\` 等 API 支持 TS 类型扩展，如扩展全局属性：

5. ts

\`\`\`typescript
// main.tsimport { createApp } from 'vue'import type { App } from 'vue'declare module 'vue' {interface ComponentCustomProperties {
    $api: typeof import('./api').default
  }}const app = createApp(App)
app.config.globalProperties.$api = import('./api').default
\`\`\`

1. **模板类型检查**：Vue3 配合 Volar 插件，可在模板中进行类型检查（如 \`{{ count.toFixed(2) }}\` 若 count 不是数字会报错），Vue2 无此能力。
2. **组合式函数类型推导**：自定义 Composables 可自动推导返回值类型，无需手动声明，如 \`usePagination\` 返回的 \`pageNum\` 自动推导为 \`Ref<number>\`。

#### 开发中结合 TS 的最佳实践：

1. **启用 Volar 插件**：替代 Vue2 的 Vetur 插件，提供完整的模板类型检查、自动补全，是 Vue3 + TS 开发的核心工具。
2. **优先使用 ****<script setup lang="ts">**：简化类型声明，支持 \`defineProps\`/\`defineEmits\` 泛型写法，提升开发效率。
3. **精准定义 Props/Emits 类型**：避免使用 \`any\` 类型，通过接口 / 类型别名定义 props/emit 的参数类型，如：
4. ts

\`\`\`typescript
type User = { id: number; name: string }const props = defineProps<{ user: User }>()
\`\`\`

1. **扩展全局类型**：对 \`$api\`/\`$router\` 等全局属性，通过 \`declare module 'vue'\` 扩展类型，避免 \`any\`。
2. **组合式函数类型约束**：为 Composables 定义入参和返回值类型，如：
3. ts

\`\`\`typescript
export function useRequest<T>(url: string): { data: Ref<T | null>; loading: Ref<boolean> } {const data = ref<T | null>(null)const loading = ref(false)// ...return { data, loading }}
\`\`\`

1. **避免 ****any**** 类型**：若暂时无法确定类型，用 \`unknown\` 替代 \`any\`，并通过类型守卫缩小类型范围。
2. **使用 ****withDefaults**** 处理 props 默认值**：TS 写法下，props 默认值需通过 \`withDefaults\` 定义，确保类型和默认值一致：
3. ts

\`\`\`typescript
interface Props {
  title?: string
  count?: number}const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  count: 0})
\`\`\``;export{n as default};
