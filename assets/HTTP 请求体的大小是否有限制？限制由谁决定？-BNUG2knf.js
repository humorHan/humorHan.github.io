const _=`### 18. HTTP 请求体的大小是否有限制？限制由谁决定？

#### 核心结论

HTTP 协议本身**未规定**请求体大小限制，但实际使用中存在限制，限制由以下方决定：

#### 示例

Nginx 配置 \`client_max_body_size 100M\` —— 允许请求体最大 100MB，超过则返回 413 Request Entity Too Large。`;export{_ as default};
