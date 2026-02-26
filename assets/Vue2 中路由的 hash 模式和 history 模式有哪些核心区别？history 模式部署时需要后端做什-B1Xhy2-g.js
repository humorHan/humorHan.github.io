const _=`### 10. Vue2 中路由的 hash 模式和 history 模式有哪些核心区别？history 模式部署时需要后端做什么配置？

**答：**

- **核心区别**：
- **history 模式部署的后端配置**：原因：history 模式下刷新页面时，浏览器会向服务器请求 \`xxx.com/home\`，但服务器上无该路径的资源，会返回 404。解决方式（以 Nginx 为例）：
- nginx

\`\`\`nginx
server {listen 80;server_name xxx.com;root /usr/share/nginx/html; # 前端打包文件目录index index.html;# 核心配置：所有请求转发到 index.htmllocation / {try_files $uri $uri/ /index.html;}}
\`\`\`

- 其他后端（如 Node.js/Java）：需将所有非静态资源的请求转发到前端入口文件 \`index.html\`，让 Vue 路由接管页面跳转。`;export{_ as default};
