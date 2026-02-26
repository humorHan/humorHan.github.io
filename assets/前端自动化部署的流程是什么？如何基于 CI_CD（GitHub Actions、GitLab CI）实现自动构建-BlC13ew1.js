const n=`### 15. 前端自动化部署的流程是什么？如何基于 CI/CD（GitHub Actions、GitLab CI）实现自动构建部署？
	**答：**
	#### 一、前端自动化部署核心流程
	![](static/U2ErbiXeJo7VDzxUQJmcWFVJnag.png)
	豆包
	你的 AI 助手，助力每日工作学习
	#### 二、基于 GitHub Actions 实现自动部署
	1. **创建配置文件**：\`.github/workflows/deploy.yml\`
	yaml
	\`\`\`yaml
name: Build and Deploy
on:push:branches: [main] # 推送到 main 分支触发jobs:deploy:runs-on: ubuntu-latest
    steps:- name: 拉取代码
        uses: actions/checkout@v4

      - name: 安装 Node.js
        uses: actions/setup-node@v4
        with:node-version: 20cache: 'pnpm'- name: 安装依赖
        run: pnpm install

      - name: 执行 lint 和测试
        run: pnpm lint **&&** pnpm test

      - name: 构建产物
        run: pnpm build:prod

      - name: 部署到服务器（以 SSH 为例）
        uses: easingthemes/ssh-deploy@v5
        env:SSH_PRIVATE_KEY: \${{ secrets.SSH_PRIVATE_KEY }} # 服务器私钥（存在 GitHub Secrets）ARGS: "-rltgoDzvO --delete"SOURCE: "dist/" # 构建产物目录REMOTE_HOST: \${{ secrets.REMOTE_HOST }} # 服务器地址REMOTE_USER: \${{ secrets.REMOTE_USER }} # 服务器用户名TARGET: "/usr/share/nginx/html" # 服务器部署目录
\`\`\`\`

\`\`\`\`
#### 三、基于 GitLab CI 实现自动部署
1. **创建配置文件**：\`.gitlab-ci.yml\`
yaml
\`\`\`yaml
\`\`\`\`

stages:- install

- build
- deploy

install:stage: install
image: node:20script:- npm install -g pnpm

- pnpm install
  artifacts:paths: [node_modules/]build:stage: build
  image: node:20script: pnpm build:prod
  artifacts:paths: [dist/]deploy:stage: deploy
  script:- apt-get update **&&** apt-get install -y sshpass
- sshpass -p $SERVER_PASSWORD scp -r dist/* $SERVER_USER@$SERVER_HOST:/usr/share/nginx/html
  only:- main

\`\`\`\`
	1. **配置环境变量**：在 GitLab 项目设置中添加 \`SERVER_PASSWORD\`、\`SERVER_USER\`、\`SERVER_HOST\` 等敏感信息。`;export{n as default};
