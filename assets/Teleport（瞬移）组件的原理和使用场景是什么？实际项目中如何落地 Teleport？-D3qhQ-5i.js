const n=`### 13. Teleport（瞬移）组件的原理和使用场景是什么？实际项目中如何落地 Teleport？

**答**：

#### Teleport 的原理：

Teleport（瞬移 / 传送）允许将组件的 DOM 节点 “传送” 到页面的任意位置（如 \`<body>\` 下），但组件的逻辑（响应式、事件、生命周期）仍归属于原组件，仅 DOM 结构发生移动。核心原理：

1. 编译阶段：Teleport 组件会标记目标容器和子节点；
2. 挂载阶段：将子节点的 DOM 元素插入到目标容器中，而非原组件的 DOM 层级下；
3. 卸载阶段：从目标容器中移除子节点 DOM，保持组件逻辑与 DOM 操作的一致性。

#### 核心使用场景：

1. **模态框（Modal）/ 弹窗（Dialog）**：解决模态框嵌套在组件中导致的 z-index 失效、样式继承（如父组件 overflow:hidden 导致弹窗被截断）问题，将弹窗 DOM 挂载到 \`<body>\` 下。
2. **悬浮窗 / 通知提示（Toast/Notification）**：统一挂载到 \`<body>\` 下，避免受父组件样式影响。
3. **全屏组件（如全屏日历、编辑器）**：脱离原组件层级，避免父组件的样式 / 布局限制。

#### 实际项目落地示例：

vue

\`\`\`
<!-- 弹窗组件 MyModal.vue -->
<template>
  <teleport to="body"> <!-- 传送至 body 下 -->
    <div class="modal-mask" v-if="visible">
      <div class="modal-content">
        <h3>{{ title }}</h3>
        <slot></slot>
        <button @click="close">关闭</button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '弹窗标题'
  }
})

const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}
<\/script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
}
</style>

<!-- 父组件使用 -->
<script setup>
import { ref } from 'vue'
import MyModal from './MyModal.vue'

const modalVisible = ref(false)
const openModal = () => {
  modalVisible.value = true
}
<\/script>

<template>
  <button @click="openModal">打开弹窗</button>
  <MyModal :visible="modalVisible" @close="modalVisible = false">
    弹窗内容
  </MyModal>
</template>
\`\`\`

#### 注意事项：

- \`to\` 属性需是有效的 CSS 选择器（如 \`#app\`、\`.container\`）或 DOM 元素；
- Teleport 仅移动 DOM 结构，组件的 \`props\`/\`emit\`/\`provide/inject\` 等逻辑仍正常工作；
- 若目标容器不存在，Teleport 会静默失败，需确保目标容器已挂载。`;export{n as default};
