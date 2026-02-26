const n=`### 4. script setup 语法糖相比普通 setup 有哪些简化？defineProps、defineEmits 的使用要点是什么？

**答**：

#### \`<script setup>\` 相比普通 setup 的简化：

1. **无需导出变量 / 方法**：普通 setup 需返回变量 / 方法才能在模板中使用；\`<script setup>\` 中声明的变量、方法、导入的组件默认暴露给模板，无需手动 return。
2. **组件自动注册**：导入的组件无需在 \`components\` 选项中注册，直接在模板中使用。
3. **无需手动定义 setup 函数**：无需写 \`export default { setup() {} }\`，直接编写逻辑即可，代码更简洁。
4. **支持顶层 await**：可直接在 \`<script setup>\` 中使用 \`await\`，无需包裹 async 函数（底层会自动将 setup 处理为异步，且不阻塞组件渲染）。
5. **内置宏函数**：\`defineProps\`/\`defineEmits\`/\`defineExpose\` 等宏函数无需导入，可直接使用。

#### defineProps/defineEmits 使用要点：

##### 1. defineProps（定义组件接收的 props）：

- **基本用法**：
- vue

\`\`\`
<script setup>
// 方式1：仅声明类型
const props = defineProps(['title', 'count'])

// 方式2：声明类型+验证（推荐）
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '默认标题'
  },
  count: {
    type: Number,
    validator: (v) => v >= 0
  }
})

// TS 写法
const props = defineProps<{
  title: string
  count?: number
}>()

// TS 写法+默认值（需配合 withDefaults）
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  count: 0
})
\`\`\`

- **要点**：
  - \`defineProps\` 是编译宏，无需导入，只能在 \`<script setup>\` 中使用；
  - 不能在普通 JS 函数中调用，需在顶层作用域执行；
  - props 是只读的，直接修改会报警告，需通过事件通知父组件修改。

##### 2. defineEmits（定义组件触发的事件）：

- **基本用法**：
- vue

\`\`\`
<script setup>
// 方式1：仅声明事件名
const emit = defineEmits(['change', 'delete'])

// 方式2：声明事件+参数验证
const emit = defineEmits({
  change: (value: string) => {
    return value.length > 0 // 返回 true/false 验证参数
  },
  delete: (id: number) => true
})

// TS 写法
const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'delete', id: number): void
}>()

// 触发事件
const handleClick = () => {
  emit('change', '新值')
  emit('delete', 1)
}
\`\`\`

- **要点**：
  - \`defineEmits\` 同样是编译宏，无需导入，顶层作用域执行；
  - 触发事件时的参数会透传给父组件的事件处理函数；
  - TS 写法需明确事件名和参数类型，提升类型安全性。`;export{n as default};
