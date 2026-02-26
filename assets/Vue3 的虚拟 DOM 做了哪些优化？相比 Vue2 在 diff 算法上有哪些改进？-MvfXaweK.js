const n=`### 11. Vue3 的虚拟 DOM 做了哪些优化？相比 Vue2 在 diff 算法上有哪些改进？

**答**：

#### Vue3 虚拟 DOM 核心优化：

1. **静态提升（Static Hoisting）**：

   - Vue2 中，每次渲染都会重新创建所有 VNode（包括静态节点，如 \`<div>静态文本</div>\`）；
   - Vue3 会将静态节点（无动态绑定的节点）提升到渲染函数外部，只创建一次，后续渲染直接复用，减少 VNode 创建开销。
2. **PatchFlags 标记动态节点**：

   - Vue2 的 diff 算法会遍历所有节点对比，无论是否有动态变化；
   - Vue3 在编译阶段为动态节点添加 PatchFlags（补丁标记），标记节点的动态类型（如文本、class、style 等），diff 时仅遍历带标记的节点，大幅减少对比开销。
3. js

\`\`\`javascript
// 编译后示例：PatchFlags.TEXT 表示仅文本动态createVNode("div", { class: "static-class" }, [createVNode("p", { patchFlag: PatchFlags.TEXT }, [ctx.msg])])
\`\`\`

1. **缓存事件处理函数**：Vue3 会缓存 \`@click="handleClick"\` 等事件处理函数，避免每次渲染重新创建函数，减少内存占用和 diff 对比。
2. **Fragment 支持**：Vue3 支持组件返回多个根节点（Fragment），无需包裹额外的 div，减少无用 DOM 节点，降低 diff 开销。

#### diff 算法的改进：

1. **基于最长递增子序列的快速 diff**：

   - Vue2 的 diff 算法处理列表时，若节点顺序变化（如删除中间元素），会导致后续所有节点重新渲染；
   - Vue3 借鉴 React 的 diff 思路，通过计算 “最长递增子序列”，找到无需移动的节点，仅移动必要的节点，减少 DOM 操作次数。例：列表 \`[a,b,c,d]\` 变为 \`[a,c,b,d]\`，Vue2 会重新渲染 b/c，Vue3 仅移动 b 节点。
2. **非对称节点对比优化**：Vue3 会先对比节点的 key 和类型，若不匹配直接销毁旧节点、创建新节点，避免无效的深层对比。
3. **静态节点跳过对比**：带静态标记的节点在 diff 阶段直接跳过，无需对比，减少遍历次数。`;export{n as default};
