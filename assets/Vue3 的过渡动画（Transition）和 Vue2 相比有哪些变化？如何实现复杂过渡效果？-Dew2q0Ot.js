const n=`### Vue3 的过渡动画（Transition）和 Vue2 相比有哪些变化？如何实现复杂过渡效果？

**答**：

#### Vue3 Transition 的核心变化：

1. **Fragment 兼容**：Vue2 的 Transition 仅支持包裹单个根节点；Vue3 支持包裹 Fragment（多根节点），但需为每个节点设置 \`key\`，否则过渡效果可能异常。
2. **CSS 过渡类名兼容**：保持 Vue2 的 6 个过渡类名（\`v-enter-from\`/\`v-enter-active\`/\`v-enter-to\`、\`v-leave-from\`/\`v-leave-active\`/\`v-leave-to\`），仅将 Vue2 的 \`v-enter\` 重命名为 \`v-enter-from\`、\`v-leave\` 重命名为 \`v-leave-from\`（更语义化），Vue3 仍兼容旧类名，但推荐使用新类名。
3. **JavaScript 钩子参数优化**：Vue2 的 JS 钩子（如 \`beforeEnter\`）参数为 DOM 元素；Vue3 保持参数不变，但支持结合 Composition API 在 setup 中定义钩子：
4. vue

\`\`\`
<script setup>
const beforeEnter = (el) => {
  el.style.opacity = 0
}
<\/script>
<template>
  <Transition @before-enter="beforeEnter">
    <div v-if="show">内容</div>
  </Transition>
</template>
\`\`\`

1. **过渡模式增强**：保留 \`in-out\`/\`out-in\` 模式，且对多节点过渡的支持更稳定；Vue3 中 \`mode="out-in"\` 可更精准地控制新旧节点的切换顺序。
2. **Teleport 兼容**：Transition 可包裹 Teleport 组件，实现弹窗等 teleport 元素的过渡动画；Vue2 中 Teleport 不存在，需手动处理。
3. **性能优化**：结合 Vue3 的虚拟 DOM 优化（PatchFlags），过渡动画的触发更精准，减少不必要的重渲染。

#### 实现复杂过渡效果的方式：

1. **结合 CSS 动画（@keyframes）**：实现逐帧动画、旋转 / 缩放等复杂效果：
2. vue

\`\`\`
<style>
.fade-enter-active {
  animation: fadeIn 0.5s ease;
}
.fade-leave-active {
  animation: fadeOut 0.5s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(20px); }
}
</style>

<template>
  <Transition name="fade">
    <div v-if="show" class="box">复杂过渡</div>
  </Transition>
</template>
\`\`\`

1. **JavaScript 钩子控制动画（如 GSAP）**：实现更精细的动画控制（如贝塞尔曲线、序列动画）：
2. vue

\`\`\`
<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const show = ref(false)
const enter = (el) => {
  gsap.from(el, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power2.out'
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    scale: 1.2,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: done // 必须调用 done 告知 Vue 动画结束
  })
}
<\/script>

<template>
  <Transition
    @enter="enter"
    @leave="leave"
    :css="false" // 禁用 CSS 过渡，仅使用 JS 动画
  >
    <div v-if="show" class="box">JS 控制动画</div>
  </Transition>
</template>
\`\`\`

1. **列表过渡（TransitionGroup）**：实现列表的增删 / 排序动画，Vue3 优化了列表 diff 算法，排序动画更流畅：
2. vue

\`\`\`
<style>
.list-item {
  display: inline-block;
  margin: 0 10px;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-move {
  transition: transform 0.3s ease;
}
</style>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in list" :key="item.id" class="list-item">
      {{ item.name }}
    </li>
  </TransitionGroup>
</template>
\`\`\`

1. **嵌套过渡**：父组件 Transition 包裹子组件 Transition，实现多层级动画：
2. vue

\`\`\`
<template>
  <Transition name="parent">
    <div v-if="showParent">
      <Transition name="child">
        <div v-if="showChild">子组件动画</div>
      </Transition>
    </div>
  </Transition>
</template>
\`\`\``;export{n as default};
