const _=`### 9. Cookie 和 Session 的区别是什么？它们是如何配合实现用户登录状态保持的？

#### 核心区别

#### 登录状态保持流程

1. **登录阶段**：

   - 用户提交账号密码，服务器验证通过后，生成 Session（存储用户信息，如 userID、权限），并分配唯一 SessionID；
   - 服务器通过 Set-Cookie 头将 SessionID 写入客户端 Cookie（通常设置 HttpOnly、Secure、SameSite 防篡改 / CSRF）；
2. **后续请求阶段**：

   - 浏览器每次请求自动携带包含 SessionID 的 Cookie；
   - 服务器解析 Cookie 中的 SessionID，查找对应的 Session，验证用户登录状态；
3. **登出阶段**：

   - 服务器删除该 SessionID 对应的 Session，客户端清空 Cookie 中的 SessionID。`;export{_ as default};
