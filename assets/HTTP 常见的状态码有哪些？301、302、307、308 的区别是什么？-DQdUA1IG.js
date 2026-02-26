const e=`### 1. HTTP 常见的状态码有哪些？301、302、307、308 的区别是什么？

#### 常见状态码（按类别）

- **1xx（信息类）**：临时响应，如 100 Continue（客户端继续发送请求体）；
- **2xx（成功类）**：请求成功，如 200 OK（请求成功）、201 Created（资源创建成功）、206 Partial Content（范围请求成功）；
- **3xx（重定向类）**：需要进一步操作，如 301/302/307/308（重定向）、304 Not Modified（协商缓存未更新）；
- **4xx（客户端错误）**：请求有误，如 400 Bad Request（请求参数错误）、401 Unauthorized（未授权）、403 Forbidden（禁止访问）、404 Not Found（资源不存在）、405 Method Not Allowed（请求方法不支持）；
- **5xx（服务端错误）**：服务器故障，如 500 Internal Server Error（服务器内部错误）、502 Bad Gateway（网关错误）、503 Service Unavailable（服务不可用）、504 Gateway Timeout（网关超时）。

#### 301/302/307/308 核心区别`;export{e as default};
