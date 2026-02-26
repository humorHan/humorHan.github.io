const _=`### 14. ETag 和 Last-Modified 的作用是什么？它们的区别和优先级如何？

#### 核心作用

均用于 **协商缓存**：服务器返回资源标识，客户端下次请求时携带该标识，服务器验证资源是否更新 —— 未更新返回 304，使用缓存；更新返回 200 和新资源。

#### 区别

#### 优先级

- **服务器验证顺序**：优先验证 ETag（If-None-Match），再验证 Last-Modified（If-Modified-Since）；
- **客户端请求头优先级**：If-None-Match > If-Modified-Since；
- **返回规则**：只要其中一个标识表明资源更新，服务器就返回 200 新资源；均未更新则返回 304。`;export{_ as default};
