const e=`### 10. Vue3 中 v-model 的语法和 Vue2 有哪些变化？多组件间的 v-model 绑定该如何实现？

**答**：

#### Vue3 v-model 核心变化：

1. **移除 ****.sync**** 修饰符**：Vue2 中需用 \`:value.sync\` 实现双向绑定；Vue3 统一用 \`v-model\`，并支持自定义绑定属性。
2. **默认绑定属性 / 事件变更**：

   - Vue2 组件默认绑定 \`value\` 属性 + \`input\` 事件；
   - Vue3 组件默认绑定 \`modelValue\` 属性 + \`update:modelValue\` 事件，更语义化。
3. **支持多个 v-model**：Vue2 一个组件只能有一个 \`v-model\`；Vue3 可绑定多个 \`v-model\`，通过参数区分：
4. vue

\`\`\`
<!-- Vue3 多 v-model -->
<MyComponent v-model:name="username" v-model:age="userAge" />
\`\`\`

1. **修饰符支持更灵活**：Vue3 支持自定义 v-model 修饰符（如 \`v-model.capitalize\`），组件内可接收并处理修饰符。

#### 多组件间 v-model 绑定实现：

##### 场景 1：父子组件多 v-model 绑定

vue

\`\`\`
<!-- 子组件 MyComponent.vue -->
<script setup>
// 定义 props（modelValue 是默认，name/age 是自定义）
const props = defineProps(['modelValue', 'name', 'age'])
// 定义 emit
const emit = defineEmits(['update:modelValue', 'update:name', 'update:age'])
<\/script>

<template>
  <!-- 默认 v-model -->
  <input 
    :value="modelValue" 
    @input="emit('update:modelValue', $event.target.value)"
  />
  <!-- 自定义 v-model:name -->
  <input 
    :value="name" 
    @input="emit('update:name', $event.target.value)"
  />
  <!-- 自定义 v-model:age -->
  <input 
    :value="age" 
    @input="emit('update:age', $event.target.value)"
  />
</template>

<!-- 父组件使用 -->
<script setup>
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'

const defaultValue = ref('默认值')
const username = ref('张三')
const userAge = ref(20)
<\/script>

<template>
  <MyComponent 
    v-model="defaultValue" 
    v-model:name="username" 
    v-model:age="userAge"
  />
</template>
\`\`\`

##### 场景 2：跨多级组件的 v-model 绑定（祖孙组件）

通过 \`v-model\` + \`provide/inject\` 或透传 props/emit 实现，以透传为例：

vue

\`\`\`
<!-- 祖父组件 -->
<script setup>
import { ref } from 'vue'
import ParentComponent from './ParentComponent.vue'

const msg = ref('Hello')
<\/script>

<template>
  <ParentComponent v-model="msg" />
</template>

<!-- 父组件 ParentComponent.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
<\/script>

<template>
  <!-- 透传 props 和 emit 给子组件 -->
  <ChildComponent 
    :modelValue="modelValue" 
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>

<!-- 子组件 ChildComponent.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
<\/script>

<template>
  <input 
    :value="modelValue" 
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
\`\`\``;export{e as default};
