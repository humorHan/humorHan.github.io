const _=`### 2. GET 和 POST 请求的核心区别有哪些？为什么说 POST 比 GET 更安全？

#### 核心区别

#### POST “更安全” 的原因

并非绝对安全（HTTP 层面均明文），而是：

1. 参数不在 URL 中，避免被地址栏、历史记录、日志泄露；
2. 可配合 HTTPS 加密请求体，GET 参数即使 HTTPS 也会出现在 URL 解析层（如代理日志）；
3. 不易被 CSRF 攻击利用（GET 易被链接 / 图片触发）。`;export{_ as default};
