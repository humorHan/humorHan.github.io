const e=`### 5. ref 和 reactive 的区别是什么？各自的使用场景如何？解构 reactive 数据时丢失响应式该如何解决？

**答**：

#### 核心区别：

#### 各自使用场景：

- **ref**：

  1. 存储基本类型数据（如 \`count: ref(0)\`、\`name: ref('张三')\`）；
  2. 需单独引用的对象属性（如 \`const inputValue = ref('')\`，便于单独传递 / 监听）；
  3. 模板中需频繁使用的简单数据（自动解包，无需 \`.value\`）。
- **reactive**：

  1. 存储复杂对象 / 数组（如 \`const form = reactive({ username: '', password: '' })\`、\`const list = reactive([{ id: 1 }])\`）；
  2. 需整体管理的业务数据（如用户信息、购物车数据），属性关联度高的场景。

#### 解构 reactive 丢失响应式的解决方法：

1. **使用 toRefs**：将 reactive 对象转换为 ref 集合，解构后仍保持响应式：
2. vue

\`\`\`
<script setup>
import { reactive, toRefs } from 'vue'

const user = reactive({ name: '张三', age: 20 })
const { name, age } = toRefs(user) // 解构后 name/age 是 ref 类型

// 修改仍能触发响应式
name.value = '李四'
<\/script>
\`\`\`

1. **使用 toRef**：仅解构单个属性时，用 \`toRef\` 包装：
2. vue

\`\`\`
<script setup>
import { reactive, toRef } from 'vue'

const user = reactive({ name: '张三', age: 20 })
const name = toRef(user, 'name') // 仅获取 name 属性的 ref
<\/script>
\`\`\`

1. **避免直接解构**：保留原 reactive 对象，通过对象访问属性（如 \`user.name\`）。`;export{e as default};
