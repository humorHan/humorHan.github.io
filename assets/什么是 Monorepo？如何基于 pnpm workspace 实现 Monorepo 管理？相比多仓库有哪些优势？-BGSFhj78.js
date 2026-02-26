const n=`### 什么是 Monorepo？如何基于 pnpm workspace 实现 Monorepo 管理？相比多仓库有哪些优势？

**答：**

#### 什么是 Monorepo

Monorepo 是一种项目管理方式，将多个相关子项目（如前端、后端、组件库、工具库）集中管理在一个代码仓库中，而非分散在多个仓库。

#### 基于 pnpm workspace 实现 Monorepo 的步骤

1. **初始化项目结构**：
2. plaintext

\`\`\`
root/
├── packages/          # 所有子项目
│   ├── app/           # 业务应用
│   ├── components/    # 组件库
│   └── utils/         # 工具库
├── package.json
└── pnpm-workspace.yaml
\`\`\`

1. **配置 \\*\\***pnpm-workspace.yaml\\*\\*：
2. yaml

\`\`\`yaml
packages:- "packages/*" # 匹配所有子项目- "apps/*"     # 可选：业务应用单独目录
\`\`\`

1. **子项目相互依赖**：在 \`packages/app/package.json\` 中依赖组件库：
2. json

\`\`\`json
"dependencies": {"@my/utils": "workspace:*", // 引用本地 utils 包"@my/components": "workspace:*"}
\`\`\`

1. **统一脚本管理**：在根目录 \`package.json\` 配置脚本，批量执行子项目命令：
2. json

\`\`\`json
"scripts": {"dev:app": "pnpm --filter @my/app dev","build:all": "pnpm --filter \\"./packages/*\\" build"}
\`\`\`

#### Monorepo 相比多仓库的优势

1. **统一管理**：所有项目在一个仓库，便于版本同步、代码复用、全局搜索；
2. **依赖共享**：子项目可直接依赖本地包，无需发布到 npm，调试便捷；
3. **统一规范**：代码规范、构建配置、CI/CD 可全局复用，降低维护成本；
4. **原子提交**：跨项目修改可一次提交，避免多仓库版本不一致；
5. **简化协作**：新人只需克隆一个仓库即可获取所有代码，无需配置多个仓库权限。`;export{n as default};
