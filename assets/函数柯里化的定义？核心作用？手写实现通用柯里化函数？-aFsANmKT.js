const n=`### 函数柯里化的定义？核心作用？手写实现通用柯里化函数？

**答案**：

#### 一、核心定义：

柯里化（Currying）是将**多参数函数**转换为**单参数函数链**的过程，即：\`fn(a, b, c)\` → \`fn(a)(b)(c)\`，每次调用仅传入一个参数，直到参数全部传入后执行函数。

#### 二、核心作用：

1. **参数复用**：提前绑定部分参数，复用固定逻辑（如固定请求的 baseURL）；
2. **延迟执行**：分步传入参数，最后一步执行；
3. **函数粒度化**：将复杂多参数函数拆分为简单单参数函数，便于组合。

#### 三、示例（未柯里化 vs 柯里化）：

js

\`\`\`javascript
// 未柯里化：求和函数function add(a, b, c) {return a + b + c;}add(1, 2, 3); // 6// 手动柯里化function curriedAdd(a) {return function(b) {return function(c) {return a + b + c;};};}curriedAdd(1)(2)(3); // 6
\`\`\`

#### 四、通用柯里化函数（支持任意参数、任意调用方式）

js

\`\`\`javascript
/**
 * 通用柯里化函数
 * @param {Function} fn - 目标函数
 * @param {Array} args - 已传入的参数（初始为空）
 * @returns {Function} 柯里化后的函数
 */function curry(fn, args = []) {// 获取目标函数的参数长度const fnLength = fn.length;return function(...newArgs) {// 合并已传入和新传入的参数const allArgs = [...args, ...newArgs];// 若参数足够，执行函数；否则继续柯里化if (allArgs.length >= fnLength) {return fn.apply(this, allArgs);} else {return curry(fn, allArgs);}};}// 测试1：固定参数长度const add = curry((a, b, c) => a + b + c);console.log(add(1)(2)(3)); // 6console.log(add(1, 2)(3)); // 6（支持批量传参）console.log(add(1)(2, 3)); // 6// 测试2：参数复用（固定请求方法）const request = curry((method, url, data) => {console.log(\`[\${method}] \${url}\`, data);});// 复用GET方法const get = request("GET");get("/user", { id: 1 }); // [GET] /user {id:1}// 复用GET+固定URLconst getUser = get("/user");getUser({ id: 2 }); // [GET] /user {id:2}
\`\`\`

#### 五、ES6 简化版柯里化（箭头函数）

js

\`\`\`javascript
const curry = (fn, ...args) => 
  args.length >= fn.length 
    ? fn(...args) 
    : (...newArgs) => curry(fn, ...args, ...newArgs);
\`\`\``;export{n as default};
