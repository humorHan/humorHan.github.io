const n=`### 12. Vue3 中 Fragment（碎片）的作用是什么？为什么 Vue2 需要根节点而 Vue3 不需要？

**答**：

#### Fragment 的作用：

1. **允许组件返回多个根节点**：无需用额外的 \`<div>\` 等容器包裹，减少 DOM 层级，降低渲染开销，避免样式布局问题（如多余 div 导致的 flex/grid 布局异常）。
2. **保持语义化**：组件结构更贴合业务逻辑，无需为了满足 “单根节点” 规则添加无意义的容器节点。
3. **简化模板编写**：如表格组件可直接返回 \`<tr>\` 列表，无需包裹 \`<tbody>\`（Vue2 需包裹，否则报错）。

#### Vue2 需要根节点、Vue3 不需要的原因：

1. **Vue2 编译 / 运行时限制**：Vue2 的虚拟 DOM 设计要求组件必须返回单个根 VNode，渲染函数（\`render\`）只能返回一个节点；且模板编译阶段会强制检查单根节点，否则抛出错误。核心原因：Vue2 的 patch 算法依赖单根节点作为入口，无法处理多根节点的挂载和 diff。
2. **Vue3 重构了虚拟 DOM 和编译逻辑**：

   - Vue3 引入 Fragment 类型的 VNode（Symbol (Fragment)），作为多根节点的 “虚拟容器”；
   - 编译阶段支持多根节点，运行时的 patch 算法能处理 Fragment 类型的 VNode，遍历其下的子节点进行挂载和 diff；
   - Fragment 仅作为虚拟节点存在，渲染到 DOM 时不会生成实际的 DOM 元素，仅渲染其子节点。

#### 示例：

vue

\`\`\`
<!-- Vue3 支持多根节点 -->
<template>
  <div>节点1</div>
  <p>节点2</p>
  <span>节点3</span>
</template>

<!-- Vue2 必须单根节点，否则报错 -->
<template>
  <div> <!-- 必须的容器 -->
    <div>节点1</div>
    <p>节点2</p>
  </div>
</template>
\`\`\``;export{n as default};
