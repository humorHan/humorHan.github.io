const n=`### 17. Vary 响应头的作用是什么？在缓存场景下有什么价值？

#### Vary 头作用

告诉缓存服务器（浏览器、CDN、代理）：**响应内容由哪些请求头决定**，缓存时需根据这些头的不同值分别缓存不同版本的响应。

#### 缓存场景价值

1. **避免缓存混淆**：示例：同一 URL（如 /api/lang），\`Accept-Language\` 为 zh-CN 时返回中文，为 en-US 时返回英文。若未设置 \`Vary: Accept-Language\`，缓存服务器会将中文版本缓存，所有请求都返回中文；设置后，缓存服务器会按 \`Accept-Language\` 分别缓存中文 / 英文版本。
2. **精准返回缓存**：确保客户端请求头与缓存的请求头匹配时，才返回对应的缓存内容，否则重新请求服务器；
3. **CDN 优化**：CDN 基于 Vary 头做精细化缓存，提升缓存命中率。

#### 示例

\`Vary: Accept-Encoding, Accept-Language\` —— 响应内容依赖 \`Accept-Encoding\`（压缩方式）和 \`Accept-Language\`（语言），缓存需区分这两个头的不同值。`;export{n as default};
