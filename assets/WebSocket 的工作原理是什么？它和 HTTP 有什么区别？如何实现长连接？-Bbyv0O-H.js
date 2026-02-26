const _=`## 7. WebSocket 的工作原理是什么？它和 HTTP 有什么区别？如何实现长连接？

### 工作原理（基于 TCP 的全双工通信）

1. **握手升级**：客户端发送 HTTP 请求，携带 \`Upgrade: websocket\`、\`Connection: Upgrade\`、Sec-WebSocket-Key 等头，请求升级协议。
2. **服务端响应**：服务端返回 101 Switching Protocols 状态码，确认升级，同时返回 Sec-WebSocket-Accept（验证 Key）。
3. **双向通信**：协议升级后，基于 TCP 连接实现全双工通信（客户端 / 服务端可随时发消息，无需请求 - 响应）。

### 与 HTTP 的核心区别

### 如何实现长连接

1. **核心：协议升级**：通过 HTTP 握手升级到 WebSocket 协议，基于 TCP 保持连接。
2. **心跳包机制**：客户端 / 服务端定期发送空消息（心跳包），防止网关 / 防火墙因长时间无数据断开连接。
3. **重连机制**：连接断开时，前端自动重试（指数退避策略，避免频繁重试）。`;export{_ as default};
