const n=`## 6. 什么是 CSP（内容安全策略）？如何配置 CSP 来提升网页安全性？

### 问题核心

考察 CSP 的定义、核心作用及实际配置方式。

### 参考答案

#### （1）CSP 定义

CSP（内容安全策略，Content Security Policy）是一种安全层机制，通过 HTTP 响应头或 \`<meta>\` 标签指定网页允许加载的资源来源（脚本、样式、图片、iframe 等），禁止未授权资源的加载 / 执行，从根源上防御 XSS、点击劫持等攻击。核心是「白名单机制」，仅信任指定来源的资源。

#### （2）CSP 配置方式

##### 方式 1：HTTP 响应头（推荐，优先级更高）

服务端返回 \`Content-Security-Policy\` 头，示例：

http

\`\`\`http
Content-Security-Policy: default-src 'self';  # 所有资源默认仅允许同域加载
  script-src 'self' https://cdn.jsdelivr.net;  # 脚本仅允许同域+指定CDN
  style-src 'self' 'unsafe-inline';  # 样式允许同域+内联样式（需谨慎）
  img-src 'self' data:;  # 图片允许同域+dataURI
  frame-ancestors 'self';  # 禁止跨域iframe嵌入（替代X-Frame-Options）
  object-src 'none';  # 禁止加载插件（如Flash）
  eval 'none';  # 禁止eval执行
\`\`\`

##### 方式 2：HTML meta 标签

html

预览

\`\`\`html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net;">
\`\`\`

#### （3）核心配置原则

1. **最小权限**：仅开放必要的资源来源，避免 \`*\`（允许所有来源）。
2. **禁用危险项**：禁止 \`unsafe-inline\`（内联脚本 / 样式）、\`unsafe-eval\`（eval 执行），如需内联脚本可使用「哈希值 / 非 ce」授权。
3. **分层控制**：用 \`script-src\`/\`style-src\` 等细分指令，替代单一的 \`default-src\`。`;export{n as default};
