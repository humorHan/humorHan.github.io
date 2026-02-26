const n=`### HTML5 的 Application Cache（离线存储）原理？现在主流替代方案是什么？

**答案**：

#### 原理：

Application Cache（AppCache）通过 \`manifest\` 文件（后缀为.appcache）声明需要缓存的资源（分为 CACHE、NETWORK、FALLBACK 三类），浏览器首次加载时会下载并缓存这些资源；后续访问时，若网络离线，直接从缓存读取资源，实现离线访问。

#### 缺点：

- 缓存更新机制不灵活（需修改 manifest 文件或手动清除缓存）；
- 容易出现缓存不一致问题；
- API 设计缺陷（如缓存过大、无法精准控制缓存）；
- 已被 W3C 废弃。

#### 主流替代方案：

- Service Worker：离线缓存的核心方案，基于事件驱动的后台脚本，可拦截网络请求、精准控制缓存策略、实现推送通知等；
- PWA（渐进式 Web 应用）：结合 Service Worker + Cache API + Web App Manifest，实现离线访问、添加到桌面等原生 APP 体验；
- localStorage/sessionStorage：适用于小型键值对数据的离线存储（非资源缓存）。`;export{n as default};
