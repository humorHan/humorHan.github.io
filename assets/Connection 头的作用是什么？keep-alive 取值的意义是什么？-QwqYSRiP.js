const n=`### 16. Connection 头的作用是什么？keep-alive 取值的意义是什么？

#### Connection 头作用

控制 HTTP 连接的行为，核心功能：

1. 指定连接类型（持久 / 非持久）；
2. 关闭特定响应头（如 \`Connection: close\` 表示连接关闭后，删除该头）；
3. 兼容 HTTP 1.0 的持久连接。

#### keep-alive 取值意义

- **HTTP 1.1**：默认 \`Connection: keep-alive\`，启用**持久连接（长连接）** —— 同一 TCP 连接可处理多个 HTTP 请求 / 响应，避免频繁创建 / 关闭 TCP 连接（TCP 建连需 3 次握手，断连需 4 次挥手，开销大）；
- **HTTP 1.0**：默认短连接，需显式设置 \`Connection: keep-alive\` 才启用持久连接；
- **补充**：可通过 \`Keep-Alive\` 头设置超时时间（如 \`Keep-Alive: timeout=10\`，连接空闲 10 秒后关闭）。`;export{n as default};
