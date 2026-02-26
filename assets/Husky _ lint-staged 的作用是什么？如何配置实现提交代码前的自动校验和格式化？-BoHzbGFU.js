const n=`### Husky + lint-staged 的作用是什么？如何配置实现提交代码前的自动校验和格式化？

**答：**

#### 核心作用

- **Husky**：Git 钩子工具，可在代码提交（commit）、推送（push）等 Git 操作前 / 后执行自定义脚本；
- **lint-staged**：仅对 Git 暂存区的文件执行校验 / 格式化，避免全量文件检查，提升效率；
- 组合作用：实现 “提交代码前自动校验格式化暂存区代码，不通过则禁止提交”，保障提交代码的规范性。

#### 配置步骤

1. **安装依赖**

\`\`\`bash
pnpm add -D husky lint-staged prettier eslint
\`\`\`

1. **启用 Husky 钩子**：

\`\`\`bash
npx husky install# 配置开机自动启用（可选）npm set-script prepare "husky install"
\`\`\`

1. **添加 pre-commit 钩子**：

\`\`\`bash
npx husky add .husky/pre-commit "npx lint-staged"
\`\`\`

1. **配置 lint-staged（根目录创建 \\*\\***.lintstagedrc.js\\***\\*）**：

\`\`\`javascript
module.exports = {
  '*.{vue,js,ts,jsx,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{html,css,less,scss}': ['prettier --write'],
}
\`\`\`

1. **测试效果**：修改代码后执行 \`git add .\` + \`git commit -m "test"\`，会自动执行 eslint 修复和 prettier 格式化，失败则终止提交。`;export{n as default};
