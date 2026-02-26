const e=`## 11. 什么是 Socket？Socket 和 HTTP、WebSocket 的关系是什么？

### Socket 定义

Socket（套接字）是「应用层 ↔ TCP/IP 协议族」的通信接口（抽象层），本质是一组编程接口，通过 IP + 端口标识网络端点，实现进程间网络通信。

### 三者关系

1. **Socket 是底层基础**：HTTP、WebSocket 均基于 TCP Socket 实现（Socket 是通信的「管道」）；
2. **HTTP 与 Socket**：HTTP 是应用层协议，定义了「请求 - 响应」的格式和规则，底层通过 TCP Socket 传输数据（每次请求建立 Socket 连接，响应后关闭 / 保持）；
3. **WebSocket 与 Socket**：WebSocket 也是应用层协议，基于 TCP Socket 建立持久连接，升级协议后通过 Socket 实现全双工通信。

**总结**：Socket 是通信接口（工具），HTTP/WebSocket 是基于 Socket 的应用层协议（规则）。`;export{e as default};
