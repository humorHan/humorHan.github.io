const e=`### HTML5 Web Worker 的作用？使用时的核心注意事项？

**答案**：Web Worker 是 HTML5 新增的后台线程技术，允许将耗时的 JS 逻辑（如大数据计算、复杂渲染）放到独立线程执行，避免阻塞主线程（UI 渲染 / 交互）。

#### 核心作用：

- 解决 JS 单线程阻塞问题（如大数据排序、Excel 解析、图像处理）；
- 提升页面响应性（主线程专注 UI 交互，Worker 处理耗时任务）。

#### 核心注意事项：

1. 通信限制：Worker 与主线程通过 \`postMessage()\`/\`onmessage\` 通信，仅能传递序列化数据（JSON），无法传递函数 / 对象引用；
2. 环境限制：Worker 中无 DOM/BOM 访问权限（不能操作 document、window），可使用 \`navigator\`/\`XMLHttpRequest\`/\`setTimeout\`；
3. 同源限制：Worker 脚本必须与主页面同源（不能加载跨域脚本）；
4. 资源管理：使用完 Worker 需手动 \`terminate()\`（主线程）/\`close()\`（Worker 内部），避免内存泄漏；
5. 兼容性：IE10 + 支持，低版本浏览器需降级（如同步计算）；
6. 性能：过多 Worker 会占用系统资源，建议按需创建（如最多同时运行 4 个）。`;export{e as default};
