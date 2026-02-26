const n=`### Vue3 项目的运行时性能优化有哪些？（如 v-memo、按需渲染、减少响应式依赖）

**答案：**Vue3 基于 Proxy 重构了响应式系统，性能比 Vue2 提升显著，运行时优化需聚焦 “减少不必要的渲染、降低响应式开销、优化组件执行”，核心手段如下：

#### 一、减少组件重渲染

1. **使用 v-memo 缓存渲染结果**
   - 作用：缓存元素 / 组件的渲染结果，仅当依赖的响应式数据变化时才重新渲染；
   - 适用场景：长列表、高频更新的组件（如表格、列表项）；
   - 示例：
   - vue

   \`\`\`
   \`\`\`

<template>
  <!-- 仅当 item.id 或 item.text 变化时，才重新渲染该列表项 -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id, item.text]">
    {{ item.text }}
  </div>
</template>
\`\`\`
	- 注意：避免滥用，仅用于高频更新且渲染成本高的场景。

2. **优化组件 props 传递**
   - 避免传递复杂对象 / 数组：仅传递组件需要的字段（如 \`:id="item.id"\` 而非 \`:item="item"\`），减少 props 变化触发的重渲染；
   - 用 \`toRefs\`/\`toRef\` 传递响应式数据：避免解构丢失响应式，且减少不必要的引用；
   - vue

   \`\`\`
   \`\`\`

<script setup>
import { toRefs } from 'vue';
const props = defineProps({ item: Object });
const { id, text } = toRefs(props.item); // 仅引用需要的字段
<\/script>

\`\`\`

3. **使用 shallowRef/shallowReactive 减少响应式开销**
	- 作用：浅响应式，仅监听第一层数据变化，深层数据变化不触发更新；
	- 适用场景：大数据对象 / 数组（如列表数据、图表配置），且仅需更新第一层；
	- 示例：
	- vue
	\`\`\`
<script setup>
import { shallowReactive } from 'vue';
// 大数据列表，仅监听数组本身的增删，不监听元素内部变化
const bigList = shallowReactive([{ id: 1, text: 'a' }, { id: 2, text: 'b' }]);
<\/script>
\`\`\`

#### 二、减少响应式依赖

1. **避免不必要的响应式数据**
   - 静态数据（如常量、配置项）不使用 \`ref\`/\`reactive\`，直接定义为普通变量；
   - 示例：
   - vue

   \`\`\`
   \`\`\`

<script setup>
// 静态数据，无需响应式
const staticConfig = { color: 'red', size: 16 };
// 动态数据，才用响应式
const count = ref(0);
<\/script>

\`\`\`

2. **使用 markRaw 跳过响应式转换**
	- 作用：标记对象为非响应式，避免 Vue 对其进行响应式代理（减少性能开销）；
	- 适用场景：第三方库实例（如 echarts、地图实例）、不可变对象；
	- 示例：
	- vue
	\`\`\`
<script setup>
import { markRaw, ref } from 'vue';
import * as echarts from 'echarts';
// 图表实例无需响应式，标记为 raw
const chartInstance = ref(markRaw(echarts.init(dom)));
<\/script>
\`\`\`

#### 三、优化组件执行效率

1. **按需渲染（条件渲染）**

   - 用 \`v-if\` 替代 \`v-show\`：不需要渲染的组件用 \`v-if\` 销毁，减少 DOM 节点和内存占用（\`v-show\` 仅隐藏，仍存在于 DOM）；
   - 延迟渲染非首屏组件：用 \`v-if="isShow"\` 结合 \`onMounted\` 延迟显示（如弹窗、侧边栏）。
2. **优化计算属性 / 侦听器**

   - 计算属性：缓存计算结果，避免重复计算（替代方法调用）；
   - 侦听器：设置 \`deep: false\`（默认），仅监听浅层变化；或使用 \`watchEffect\` 精准监听依赖；
   - vue

   \`\`\`
   \`\`\`

<script setup>
import { watch } from 'vue';
// 仅监听 item.id 变化，不监听深层
watch(() => props.item.id, (newVal) => {
  // 处理逻辑
});
<\/script>

\`\`\`

3. **减少模板中的复杂表达式**
	- 模板中避免复杂计算（如 \`{{ list.filter(item => item.status === 1).length }}\`），抽离到计算属性；
	- 示例：
	- vue
	\`\`\`
<script setup>
import { computed } from 'vue';
const activeCount = computed(() => list.filter(item => item.status === 1).length);
<\/script>
<template>
  <div>{{ activeCount }}</div> <!-- 替代模板中的复杂表达式 -->
</template>
\`\`\`

#### 四、其他运行时优化

1. **使用 Teleport 优化弹窗渲染**

   - 将弹窗 / 浮层渲染到 \`body\` 下，避免嵌套在复杂组件中导致的重渲染；
2. **组件异步加载**：用 \`defineAsyncComponent\` 异步加载非首屏组件，减少初始渲染耗时；
3. **清理组件资源**：在 \`onUnmounted\` 钩子中清理定时器、事件监听、第三方库实例，避免内存泄漏；
4. **使用 Composition API 替代 Options API**：Composition API 更高效，且可按需导入 API，减少运行时体积。`;export{n as default};
