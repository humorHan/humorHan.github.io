const n=`### 8. 简述 HTTP 预检请求（OPTIONS 请求）的触发条件和作用？

#### 触发条件（跨域场景下）

满足以下任一条件，浏览器会先发送 OPTIONS 预检请求：

1. 请求方法非简单方法（GET/HEAD/POST 为简单方法，PUT/DELETE/PATCH 等非简单）；
2. POST 请求的 Content-Type 非简单类型（application/x-www-form-urlencoded/multipart/form-data/text/plain 为简单类型，application/json 非简单）；
3. 请求包含自定义头（如 Authorization、Token、X-Requested-With 等）。

#### 核心作用

1. **预检验证**：提前向服务器询问 “是否允许该跨域请求”，避免实际请求发送后被拒绝造成资源浪费；
2. **获取服务器规则**：服务器返回允许的请求方法（Access-Control-Allow-Methods）、自定义头（Access-Control-Allow-Headers）、有效期（Access-Control-Max-Age）等；
3. **决定是否发送实际请求**：若服务器允许，浏览器发送真实请求；若不允许，直接报错（不发送真实请求）。`;export{n as default};
