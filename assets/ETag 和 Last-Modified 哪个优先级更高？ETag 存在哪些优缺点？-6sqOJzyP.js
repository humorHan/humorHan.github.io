const _=`#### ETag 和 Last-Modified 哪个优先级更高？ETag 存在哪些优缺点？

【核心考察点】协商缓存两种核心标识的对比，ETag 的特性理解【参考答案】

##### 一、优先级

\`ETag\` 优先级高于 \`Last-Modified\`，服务器优先校验 \`If-None-Match\`，仅当 ETag 不存在时才校验 \`If-Modified-Since\`。

##### 二、ETag 的优缺点
`;export{_ as default};
