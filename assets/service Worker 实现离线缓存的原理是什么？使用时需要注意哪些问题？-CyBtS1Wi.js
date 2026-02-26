const _=`#### service Worker 实现离线缓存的原理是什么？使用时需要注意哪些问题？

【核心考察点】Service Worker 的核心机制，离线缓存的实现逻辑及工程化注意事项【参考答案】

##### 一、实现原理

核心生命周期：\`注册 → 安装 → 激活 → 拦截请求\`

1. 注册：主线程调用 \`navigator.serviceWorker.register('/sw.js')\`；
2. 安装：\`install\` 事件中通过 \`caches.open()\` 缓存核心资源；
3. 激活：\`activate\` 事件清理旧缓存；
4. 拦截请求：\`fetch\` 事件优先读取缓存，网络请求失败时返回兜底资源。

##### 二、注意事项

1. 环境限制：仅支持 HTTPS（[localhost](https://localhost/) 除外），IE 不兼容；
2. 生命周期：更新需修改 SW 脚本，可通过 \`skipWaiting()\` 强制激活；
3. 性能：仅缓存核心资源，避免拦截实时接口；
4. 安全：无法访问 DOM，需通过 \`postMessage\` 通信，作用域限制请求拦截范围。
`;export{_ as default};
