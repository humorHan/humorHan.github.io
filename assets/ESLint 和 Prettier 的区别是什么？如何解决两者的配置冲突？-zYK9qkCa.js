const n=`### ESLint 和 Prettier 的区别是什么？如何解决两者的配置冲突？

**答：**

#### 核心区别

#### 解决配置冲突的方案

1. **核心思路**：禁用 ESLint 中与 Prettier 重叠的格式规则，让 Prettier 负责格式化，ESLint 负责代码质量；
2. **具体配置**：
   - 安装依赖：\`pnpm add -D eslint-config-prettier eslint-plugin-prettier\`；
   - 修改 \`.eslintrc.js\`：

   \`\`\`javascript

   \`\`\`

module.exports = {extends: ["vue-essential","eslint:recommended","prettier", // 禁用 ESLint 格式规则"plugin:prettier/recommended" // 集成 Prettier 到 ESLint 检查]};

\`\`\`\`

3. **统一执行命令**：在 \`package.json\` 中配置脚本，一键格式化 + 校验：

4. json

\`\`\`json
"scripts": {"lint": "eslint . --ext .vue,.js,.ts --fix","format": "prettier --write ."}
\`\`\`\``;export{n as default};
