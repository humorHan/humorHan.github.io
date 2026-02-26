const _=`## 7. Cookie 的 SameSite 属性有什么作用？各取值（Strict/Lax/None）的区别是什么？

### 问题核心

考察 SameSite 属性的核心价值及不同取值的实际行为，是防范 CSRF 的关键配置。

### 参考答案

#### （1）核心作用

SameSite 是 Cookie 的属性之一，用于限制 Cookie 在「跨站请求」中的发送行为，核心目的是**防范 CSRF 攻击**（避免跨站请求携带用户的认证 Cookie）。

#### （2）各取值区别（Chrome 80+ 后默认 Lax）

**补充**：「同站」判断标准：两个域名的「eTLD+1」相同（如 \`a.baidu.com\` 和 \`b.baidu.com\` 是同站；\`baidu.com\` 和 \`google.com\` 是跨站）。`;export{_ as default};
