const e=`### 6. toRef 和 toRefs 的作用是什么？和 ref 的核心区别是什么？

**答**：

#### toRef/toRefs 的作用：

- **toRef**：基于 reactive 对象的某个属性创建一个 ref，该 ref 与原属性 “联动”（修改 ref 的 \`.value\` 会同步到原对象，反之亦然）；即使原属性不存在，也能创建一个空 ref（避免报错）。
- **toRefs**：将 reactive 对象的所有属性转换为 ref 集合，返回一个新对象，每个属性都是对应的 ref；核心用于解决 reactive 对象解构丢失响应式的问题。

#### 和 ref 的核心区别：

#### 示例对比：

vue

\`\`\`
<script setup>
import { reactive, ref, toRef } from 'vue'

const user = reactive({ name: '张三' })

// ref：新建独立数据，与原对象无关
const refName = ref(user.name)
refName.value = '李四'
console.log(user.name) // 张三（原对象无变化）

// toRef：与原对象属性联动
const toRefName = toRef(user, 'name')
toRefName.value = '李四'
console.log(user.name) // 李四（原对象同步变化）
<\/script>
\`\`\``;export{e as default};
