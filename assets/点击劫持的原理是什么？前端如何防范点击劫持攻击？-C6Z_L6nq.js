const n=`## 5. 点击劫持的原理是什么？前端如何防范点击劫持攻击？

### 问题核心

考察点击劫持的攻击方式及前端核心防护手段。

### 参考答案

#### （1）攻击原理

点击劫持（Clickjacking）：攻击者通过透明的 \`<iframe>\` 将目标网站嵌入恶意页面，覆盖在诱导性按钮 / 链接上方，诱导用户点击恶意页面的可视区域，实际点击的是 iframe 内目标网站的敏感按钮（如「确认转账」「删除账号」）。核心是**利用视觉欺骗，让用户无意识执行目标网站的操作**。

#### （2）前端防范手段

1. **设置 X-Frame-Options 响应头（核心）**：

   - \`X-Frame-Options: DENY\`：禁止任何页面嵌入当前网站的 iframe；
   - \`X-Frame-Options: SAMEORIGIN\`：仅允许同域名页面嵌入；
   - \`X-Frame-Options: ALLOW-FROM [域名]\`：仅允许指定域名嵌入（兼容性较差）。
2. **CSP 限制 frame 嵌入**：通过 \`Content-Security-Policy: frame-ancestors 'self'\`（仅允许同域嵌入）或 \`frame-ancestors 'none'\`（禁止所有嵌入），替代 X-Frame-Options（更灵活）。
3. **JS 检测 iframe 嵌套**：通过 \`window.top !== window.self\` 判断是否被嵌入，若为嵌套则跳转 / 隐藏内容：
4. js

\`\`\`javascript
if (window.top !== window.self) {window.top.location = window.self.location; // 跳转到自身，打破嵌套}
\`\`\`

1. **视觉防护**：敏感操作按钮添加验证码、二次确认，降低误操作风险。`;export{n as default};
