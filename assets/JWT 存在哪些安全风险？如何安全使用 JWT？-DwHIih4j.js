const n=`## 9. JWT 存在哪些安全风险？如何安全使用 JWT？

### 问题核心

考察 JWT 的安全短板及生产环境的正确使用方式。

### 参考答案

#### （1）JWT 核心安全风险

1. **签名算法被绕过**：若后端未严格校验签名算法，攻击者可修改 JWT 的 \`alg\` 为 \`none\`（无签名），伪造 Token 绕过验证。
2. **Token 泄露风险**：若 Token 存储在 localStorage（易被 XSS 窃取）、Cookie 未加 HttpOnly，攻击者可获取 Token 冒充用户。
3. **无法主动撤销**：JWT 一旦签发，在过期前无法主动作废（如用户改密码 / 登出，旧 Token 仍有效）。
4. **载荷未加密**：JWT 的 payload 仅做 Base64 编码（可解码），若存储敏感信息（如手机号、身份证），泄露后会被明文读取。
5. **过期时间过长**：Token 有效期过久，泄露后攻击者有充足时间利用。
6. **密钥管理不当**：对称加密（HS256）的密钥泄露，攻击者可伪造任意 Token；非对称加密（RS256）私钥泄露同理。

#### （2）安全使用 JWT 的最佳实践

1. **选择安全的签名算法**：

   - 优先用非对称加密（RS256/ES256），避免对称加密（HS256）的密钥共享风险；
   - 后端严格校验 \`alg\` 字段，禁止 \`none\` 算法，拒绝无签名的 Token。
2. **安全存储 Token**：

   - 访问令牌（Access Token）存储在 \`HttpOnly + Secure + SameSite=Lax\` 的 Cookie 中，抵御 XSS 和 CSRF；
   - 刷新令牌（Refresh Token）存储在服务端，仅返回短期 Access Token。
3. **缩短 Token 有效期**：Access Token 有效期设为 15~30 分钟，Refresh Token 设为 7~30 天，配合刷新机制。
4. **禁止存储敏感信息**：payload 仅存储非敏感标识（如用户 ID），不存放密码、手机号、权限等敏感数据。
5. **实现 Token 撤销机制**：

   - 维护「黑名单」（如 Redis 存储失效的 Token ID），后端验证时先查黑名单；
   - 结合用户会话，修改密码 / 登出时失效当前 Token。
6. **后端严格验证**：验证签名、过期时间（exp）、签发时间（iat）、受众（aud）、发行方（iss）等字段。
7. **HTTPS 传输**：所有携带 JWT 的请求必须通过 HTTPS 传输，防止 Token 被中间人窃取。`;export{n as default};
