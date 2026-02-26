const n=`### 3. HTTP 1.1 相比 HTTP 1.0 有哪些核心改进？

1. **持久连接（Keep-Alive）**：默认开启，同一 TCP 连接可处理多个请求 / 响应，避免频繁建连 / 断连；
2. **管道化请求**：客户端可一次性发送多个请求，无需等待前一个响应（服务器仍按序返回）；
3. **Host 头**：支持虚拟主机（一台服务器部署多个域名），解决 1.0 无法区分域名的问题；
4. **范围请求（Range）**：支持断点续传、分片下载（返回 206 Partial Content）；
5. **缓存增强**：新增 Cache-Control、ETag、Last-Modified 等缓存头，替代 1.0 简单的 Expires；
6. **分块传输编码（Transfer-Encoding: chunked）**：支持动态生成响应（无需提前知道 Content-Length）；
7. **状态码扩展**：新增 100 Continue、304 Not Modified、405 Method Not Allowed 等；
8. **内容协商**：支持 Accept、Accept-Encoding 等头，服务器返回适配客户端的内容。`;export{n as default};
