const n=`### 从 Vue3 框架层面（响应式、组件渲染等），如何做项目性能优化？

**答**：

#### 一、响应式系统优化

1. **避免深层嵌套响应式**：Vue3 的 reactive 是深层响应式，但深层嵌套对象会增加劫持开销；建议将复杂状态拆分为多个扁平的 reactive/ref，或使用 \`shallowReactive\`/\`shallowRef\`（浅层响应式）处理无需深层响应的场景（如纯展示的大对象）：
2. vue

\`\`\`
<script setup>
import { shallowReactive, shallowRef } from 'vue'
// 浅层响应：仅对象第一层属性响应式
const shallowObj = shallowReactive({ a: 1, b: { c: 2 } })
// 浅层 ref：仅 .value 响应式，内部对象修改无响应
const shallowRefObj = shallowRef({ a: 1 })
<\/script>
\`\`\`

1. **使用 readonly 减少劫持**：对无需修改的静态数据（如接口返回的纯展示数据），用 \`readonly\` 包装，避免 Vue 进行响应式劫持，提升性能：
2. vue

\`\`\`
<script setup>
import { readonly } from 'vue'
const staticData = readonly(await api.getStaticData())
<\/script>
\`\`\`

1. **合理使用 ref vs reactive**：基本类型用 ref，复杂对象用 reactive；避免用 reactive 包裹基本类型（会自动转换为对象，增加开销）。

#### 二、组件渲染优化

1. **减少不必要的重渲染**：
   - **使用 computed 缓存计算结果**：避免模板中写复杂表达式（如 \`{{ list.filter(item => item.visible).length }}\`），改为 computed 缓存；
   - **使用 v-memo 缓存节点**：对高频更新的列表 / 组件，用 \`v-memo\` 缓存节点，仅当依赖变化时重渲染：
   - vue

   \`\`\`
   \`\`\`

<template>
  <!-- 仅当 item.id 或 item.name 变化时重渲染 -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id, item.name]">
    {{ item.name }}
  </div>
</template>
\`\`\`
	- **组件拆分与懒加载**：将大型组件拆分为小型组件，非首屏组件用 \`defineAsyncComponent\` 懒加载：
	- vue
	\`\`\`
<script setup>
import { defineAsyncComponent } from 'vue'
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
<\/script>
\`\`\`

2. **优化 v-for 性能**：

   - 必加唯一 \`key\`（避免用 index 作为 key）；
   - 先通过 computed 过滤列表，再循环（避免 v-for 与 v-if 混用）；
   - 长列表用虚拟列表（如 \`vue-virtual-scroller\`），仅渲染可视区域节点。
3. **利用静态提升**：Vue3 自动提升静态节点，但需避免在静态节点中混入动态内容（如 \`<div>{{ msg }}</div>\` 无法静态提升）；纯静态内容（如固定文本、样式）尽量独立成节点。

#### 三、虚拟 DOM 与编译优化

1. **减少动态绑定**：避免不必要的动态属性（如 \`:class="{}"\` 无动态值时改为静态 class）；动态绑定仅保留必要的属性，减少 PatchFlags 标记的节点数量。
2. **使用 Fragment 减少 DOM 层级**：组件返回多根节点，避免无用的容器 div，减少 DOM 节点数量和 diff 开销。
3. **禁用不必要的指令**：如 \`v-cloak\`、\`v-pre\`（\`v-pre\` 可跳过静态节点的编译，提升编译速度）：
4. vue

\`\`\`
<template>
  <!-- v-pre 跳过编译，提升性能 -->
  <div v-pre>{{ 无需编译的静态内容 }}</div>
</template>
\`\`\`

#### 四、监听与计算优化

1. **精准监听依赖**：watch 仅监听必要的属性，避免监听整个对象（需开启 \`deep: true\`）；使用 \`watchEffect\` 时，回调中仅访问必要的响应式数据，减少依赖收集：
2. vue

\`\`\`
<script setup>
import { watch, reactive } from 'vue'
const user = reactive({ name: '张三', age: 20 })
// 精准监听 name，而非整个 user
watch(() => user.name, (newVal) => {})
<\/script>
\`\`\`

1. **及时停止监听**：对异步场景 / 临时监听，调用 watch/watchEffect 返回的停止函数，避免内存泄漏：
2. vue

\`\`\`
<script setup>
const stop = watchEffect(() => {})
// 组件卸载前停止监听
onUnmounted(() => stop())
<\/script>
\`\`\`

1. **computed 缓存复用**：对高频访问的计算结果，用 computed 缓存，避免重复计算（如表格的合计值、列表的过滤结果）。

#### 五、其他框架层面优化

1. **使用生产环境构建**：Vue3 生产环境会移除警告、调试代码，开启编译优化；确保打包时设置 \`process.env.NODE_ENV = 'production'\`（Vite/Webpack 自动处理）。
2. **优化全局 API 使用**：减少全局组件 / 指令的注册（仅注册必要的），避免 \`app.mixin\`（全局混入会增加所有组件的开销）。
3. **利用 Pinia 性能优势**：替代 Vuex，Pinia 无 Mutation 开销，且支持按需加载 store，减少初始打包体积；避免在 Pinia action 中执行无意义的同步操作。
4. **避免过度使用 provide/inject**：深层 inject 会增加组件的依赖追踪开销，复杂场景优先用 Pinia 管理状态。

#### 总结：

Vue3 框架层面的性能优化核心是 “减少不必要的响应式劫持、减少虚拟 DOM 对比、减少组件重渲染”，结合 Vue3 的新特性（如 shallowReactive、v-memo、静态提升），针对性优化响应式数据、组件渲染、监听逻辑，可大幅提升大型项目的运行性能。`;export{n as default};
