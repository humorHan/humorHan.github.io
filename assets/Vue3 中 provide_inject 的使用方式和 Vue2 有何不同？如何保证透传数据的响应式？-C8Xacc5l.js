const n=`### 17. Vue3 中 provide/inject 的使用方式和 Vue2 有何不同？如何保证透传数据的响应式？

**答**：

#### Vue3 provide/inject 的核心变化：

1. **写法适配 Composition API**：
   - Vue2 仅支持 Options API 写法：
   - js

   \`\`\`javascript
   \`\`\`

// 父组件 export default {provide: {msg: 'Hello'}}// 子组件 export default {inject: ['msg']}

\`\`\`
	- Vue3 支持 Composition API 写法（推荐），需从 \`vue\` 导入 \`provide/inject\`：
	- vue
	\`\`\`
<script setup>
import { provide, inject } from 'vue'

// 父组件提供数据
provide('msg', 'Hello')

// 子组件注入数据
const msg = inject('msg', '默认值') // 第二个参数是默认值
<\/script>
\`\`\`

2. **支持 Symbol 作为注入键**：Vue3 推荐用 Symbol 作为注入键，避免命名冲突：
3. vue

\`\`\`
<!-- keys.js -->
export const MSG_KEY = Symbol('msg')

<!-- 父组件 -->
<script setup>
import { provide } from 'vue'
import { MSG_KEY } from './keys.js'
provide(MSG_KEY, 'Hello')
<\/script>

<!-- 子组件 -->
<script setup>
import { inject } from 'vue'
import { MSG_KEY } from './keys.js'
const msg = inject(MSG_KEY)
<\/script>
\`\`\`

1. **注入时支持类型推导**：结合 TS，Vue3 可推导注入数据的类型，Vue2 需手动声明。

#### 保证透传数据的响应式：

provide/inject 本身不会自动保持响应式，需手动传递响应式数据（ref/reactive）：

1. **传递 ref 数据**（推荐）：
2. vue

\`\`\`
<!-- 父组件 -->
<script setup>
import { provide, ref } from 'vue'

const count = ref(0)
provide('count', count) // 传递 ref 引用
<\/script>

<!-- 子组件 -->
<script setup>
import { inject } from 'vue'

const count = inject('count')
// 修改会同步到父组件，保持响应式
const increment = () => {
  count.value++
}
<\/script>
\`\`\`

1. **传递 reactive 数据**：
2. vue

\`\`\`
<!-- 父组件 -->
<script setup>
import { provide, reactive } from 'vue'

const user = reactive({ name: '张三' })
provide('user', user)
<\/script>

<!-- 子组件 -->
<script setup>
import { inject } from 'vue'

const user = inject('user')
user.name = '李四' // 响应式生效
<\/script>
\`\`\`

1. **避免传递原始值**：若传递原始值（如 \`provide('count', 0)\`），子组件修改后不会同步到父组件，需传递 ref 包裹的原始值。

#### 注意事项：

- inject 接收的响应式数据是只读的？**否**：子组件可直接修改 ref/reactive 数据，但推荐通过 provide 传递修改方法，保持数据单向流动：
- vue

\`\`\`
<!-- 父组件 -->
<script setup>
import { provide, ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}
provide('count', {
  count,
  increment
})
<\/script>

<!-- 子组件 -->
<script setup>
import { inject } from 'vue'

const { count, increment } = inject('count')
// 调用方法修改，而非直接改 count.value
increment()
<\/script>
\`\`\``;export{n as default};
