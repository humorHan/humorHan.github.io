const e=`### Vue3 中如何实现自定义渲染器（Custom Renderer）？有哪些实际应用场景？

**答**：

#### 自定义渲染器的核心原理：

Vue3 将渲染逻辑与平台逻辑解耦，核心运行时（\`@vue/runtime-core\`）不依赖 DOM / 浏览器环境，通过 \`createRenderer\` 可自定义 “节点创建、属性设置、事件绑定” 等渲染行为，适配不同平台（如 Canvas、小程序、终端）。

#### 实现步骤（以极简 DOM 渲染器为例）：

ts

\`\`\`typescript
// 1. 导入 createRendererimport { createRenderer } from '@vue/runtime-core'// 2. 定义平台相关的渲染接口const renderer = createRenderer({// 创建元素createElement: (tag) => {return document.createElement(tag)},// 设置元素属性patchProp: (el, key, oldValue, newValue) => {if (key === 'class') {
      el.className = newValue
    } else if (key === 'style') {
      Object.assign(el.style, newValue)} else if (key.startsWith('on')) {// 事件绑定const event = key.slice(2).toLowerCase()
      el.removeEventListener(event, oldValue)
      el.addEventListener(event, newValue)} else {
      el.setAttribute(key, newValue)}},// 插入元素insert: (el, parent, anchor) => {
    parent.insertBefore(el, anchor || null)},// 移除元素remove: (el) => {const parent = el.parentNode
    if (parent) parent.removeChild(el)},// 创建文本节点createText: (text) => {return document.createTextNode(text)},// 创建注释节点createComment: (text) => {return document.createComment(text)},// 设置文本内容setText: (el, text) => {
    el.textContent = text
  },// 设置元素内容setElementText: (el, text) => {
    el.innerHTML = text
  }})// 3. 暴露 createApp 方法（模拟 Vue 官方的 DOM 渲染器）export function createApp(rootComponent, rootProps) {return renderer.createApp(rootComponent, rootProps)}
\`\`\`

#### 核心 API 说明：

- \`createRenderer\`：接收一个包含平台渲染逻辑的对象，返回一个包含 \`createApp\` 的渲染器实例；
- 核心钩子：\`createElement\`（创建节点）、\`patchProp\`（更新属性）、\`insert\`（插入节点）是最关键的三个钩子，需适配目标平台的节点操作逻辑。

#### 实际应用场景：

1. **非 DOM 平台渲染**：

   - **小程序适配**：如 mpvue、uni-app 底层基于 Vue3 自定义渲染器，将 Vue 组件渲染为小程序的 WXML/WXSS 节点；
   - **Canvas 渲染**：如用 Vue 语法开发 Canvas 可视化应用（如游戏、图表），自定义渲染器将 VNode 转换为 Canvas 绘制指令；
   - **终端渲染**：将 Vue 组件渲染为终端的文本 / 颜色输出（如 CLI 界面）；
   - **桌面应用**：结合 Electron，自定义渲染器适配 Electron 的原生组件。
2. **定制 DOM 渲染行为**：

   - 扩展属性处理逻辑（如自定义指令、特殊属性解析）；
   - 拦截节点创建 / 插入，实现性能监控、埋点统计；
   - 适配特殊 DOM 环境（如 Shadow DOM、跨域 iframe 渲染）。
3. **跨端框架底层**：如 Taro、Remax 等跨端框架，基于 Vue3 自定义渲染器实现 “一套代码，多端运行”（微信小程序、支付宝小程序、H5、App）。

#### 注意事项：

- 自定义渲染器需实现核心钩子，但无需实现所有钩子（非必要钩子可省略）；
- \`@vue/runtime-core\` 是平台无关的核心包，需单独安装（\`npm i @vue/runtime-core\`）；
- 复杂场景需处理节点更新、diff 算法的平台适配（如小程序的节点复用逻辑）。`;export{e as default};
