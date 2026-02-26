const n=`### iframe 的优缺点？实际开发中如何规避 iframe 的性能 / 安全问题？

**答案**：

#### 优点：

- 隔离上下文（如嵌入第三方页面、富文本编辑器）；
- 复用独立页面（如公共导航、页脚）；
- 加载耗时的内容不阻塞主页面（如报表、地图）。

#### 缺点：

- 阻塞主页面 onload 事件（可通过 \`async\`/ 动态创建规避）；
- 增加 HTTP 请求，影响页面加载速度；
- 跨域通信复杂；
- 搜索引擎难以解析（SEO 不友好）；
- 可能存在安全风险（如点击劫持）；
- 样式 / 布局适配复杂（如高度自适应）。

#### 规避方案：

1. 性能：动态创建 iframe（\`document.createElement('iframe')\`），避免阻塞 onload；懒加载非首屏 iframe；
2. 安全：设置 \`sandbox\` 属性（如 \`sandbox="allow-scripts allow-same-origin"\`）限制 iframe 权限；设置 \`X-Frame-Options\` 响应头（DENY/SAMEORIGIN）防止被第三方嵌入；
3. 体验：实现 iframe 高度自适应（监听子页面高度变化，同步到父页面）；
4. 替代方案：优先用组件复用、AJAX 加载内容替代 iframe。`;export{n as default};
