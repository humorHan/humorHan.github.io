const e=`#### 结合前端框架（React/Vue3），说明 TS 中 “泛型组件” 的实现方式，比如实现一个支持自定义值类型的通用 Select 组件，并定义其 Props 类型（快手 / 美团高频）。

**答案**：泛型组件是支持传入自定义类型参数的组件，可适配不同数据类型的场景（如通用 Select、Table 组件）。

**示例 1：React 泛型 Select 组件**

typescript

\`\`\`typescript
import React from 'react';// 定义泛型 Propsinterface SelectProps<T> {
  options: { label: string; value: T }[]; // value 类型由泛型 T 决定
  value: T;onChange: (value: T) => void;
  placeholder?: string;}// 泛型组件实现function Select<T>(props: SelectProps<T>) {const { options, value, onChange, placeholder } = props;return (<select 
      value={value} 
      onChange={(e) => onChange(e.target.value as unknown as T)}>{placeholder && <option value="">{placeholder}</option>}{options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}</select>);}// 使用泛型组件（不同值类型）// 1. value 为 string 类型<Select<string> 
  options={[{ label: '张三', value: 'zhangsan' }]}
  value="zhangsan"
  onChange={(val) => console.log(val)}/>// 2. value 为 number 类型<Select<number> 
  options={[{ label: '18岁', value: 18 }]}
  value={18}
  onChange={(val) => console.log(val)}/>
\`\`\`

**示例 2：Vue3 泛型 Select 组件**

vue

\`\`\`
<script setup lang="ts">
// 定义泛型 Props
interface SelectProps<T> {
  options: { label: string; value: T }[];
  modelValue: T;
}

// 声明泛型 Props
const props = defineProps<SelectProps<unknown>>();
// 声明泛型 Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void;
}>();
<\/script>

<template>
  <select 
    :value="props.modelValue"
    @change="(e) => emit('update:modelValue', e.target.value)"
  >
    <option 
      v-for="opt in props.options" 
      :key="opt.value" 
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>
\`\`\`

---

### 总结

1. 20 道题覆盖 TS 核心考点：基础类型区分、高级类型工具实现、泛型进阶、类型收窄 / 守卫、工程化配置、框架实战；
2. 代码示例均为大厂面试高频实现题（如 DeepReadonly、Merge、TupleToObject），可直接作为面试答题模板；
3. 重点掌握 “泛型工具编写”“类型收窄 / 守卫”“工程化问题解决” 三类考点，是大厂 TS 面试的核心评分点。`;export{e as default};
