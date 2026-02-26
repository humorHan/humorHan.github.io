const n=`### 偏函数与函数柯里化的核心区别？实战中偏函数的典型使用场景？

**答：**

#### （1）核心区别

#### （2）偏函数典型使用场景

javascript

运行

\`\`\`javascript
// 偏函数实现（固定部分参数）function partial(fn, ...fixedArgs) {return function (...restArgs) {return fn(...fixedArgs, ...restArgs);};}
\`\`\`

- **场景 1：参数复用**如固定接口请求的基础 URL，简化调用：
- javascript
- 运行

\`\`\`javascript
function request(url, method, data) {console.log(\`[\${method}] \${url}\`, data);}// 固定基础 URL 和 GET 方法const get = partial(request, 'https://api.example.com', 'GET');get({ id: 1 }); // [GET] https://api.example.com { id: 1 }
\`\`\`

- **场景 2：兼容旧接口**旧函数参数格式与新需求不匹配，用偏函数适配：
- javascript
- 运行

\`\`\`javascript
// 旧函数：接收3个参数function oldFn(a, b, c) { console.log(a + b + c); }// 新需求：只需传 c，a/b 固定为 10/20const newFn = partial(oldFn, 10, 20);newFn(30); // 60
\`\`\`

- **场景 3：事件绑定传参**避免事件回调中嵌套匿名函数，提升性能：
- javascript
- 运行

\`\`\`javascript
const btn = document.querySelector('button');function handleClick(id, e) {console.log(\`点击了按钮\${id}\`, e);}// 固定 id，剩余参数（事件对象）后续传入
btn.addEventListener('click', partial(handleClick, 1));
\`\`\``;export{n as default};
