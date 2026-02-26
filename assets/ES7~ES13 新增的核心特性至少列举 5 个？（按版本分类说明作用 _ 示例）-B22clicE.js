const n=`### ES7~ES13 新增的核心特性至少列举 5 个？（按版本分类说明作用 + 示例）

**答案**：ES7（2016）至 ES13（2022）的核心特性按版本梳理如下（覆盖高频考点）：

#### ES7（2016）核心特性

##### （1）Array.prototype.includes()

- **作用**：判断数组是否包含指定元素（支持 NaN 匹配，弥补 indexOf 不足）；
- **示例**：

js

\`\`\`javascript
const arr = [1, 2, NaN];console.log(arr.includes(2)); // trueconsole.log(arr.includes(NaN)); // true（indexOf(NaN)返回-1）console.log(arr.includes(3)); // false
\`\`\`

##### （2）指数运算符（**）

- **作用**：替代 Math.pow ()，简化幂运算；
- **示例**：

js

\`\`\`javascript
console.log(2 ** 3); // 8（等价于Math.pow(2, 3)）console.log(10 ** -2); // 0.01let a = 2;
a **= 3; // 赋值运算符，等价于a = a * a * aconsole.log(a); // 8
\`\`\`

#### ES8（2017）核心特性

##### （1）async/await

- **作用**：Promise 的语法糖，以同步写法实现异步操作，支持 try/catch 捕获错误；
- **示例**：

js

\`\`\`javascript
async function fetchData() {try {const res = await fetch("https://api.example.com/data");const data = await res.json();return data;} catch (err) {console.error("请求失败：", err);}}
\`\`\`

##### （2）Object.values()/Object.entries()

- **作用**：

  - Object.values ()：返回对象自有可枚举属性的值数组；
  - Object.entries ()：返回对象自有可枚举属性的键值对数组；
- **示例**：

js

\`\`\`javascript
const obj = { name: "张三", age: 18 };console.log(Object.values(obj)); // ["张三", 18]console.log(Object.entries(obj)); // [["name","张三"], ["age",18]]// 快速转为Mapconst map = new Map(Object.entries(obj));console.log(map.get("name")); // 张三
\`\`\`

#### ES11（2020）核心特性

##### （1）可选链操作符（?.）

- **作用**：避免访问嵌套对象属性时因中间属性不存在导致的报错；
- **示例**：

js

\`\`\`javascript
const obj = { a: { b: 1 } };console.log(obj?.a?.b); // 1console.log(obj?.c?.d); // undefined（无报错）console.log(obj?.a?.[0]); // undefinedconsole.log(obj?.fn?.()); // undefined（函数不存在时）
\`\`\`

##### （2）空值合并操作符（??）

- **作用**：仅当左侧值为 null/undefined 时，返回右侧值（区别于 ||，|| 会过滤 0/"" 等假值）；
- **示例**：

js

\`\`\`javascript
const num = 0;console.log(num || 10); // 10（||过滤0）console.log(num ?? 10); // 0（仅null/undefined触发）const name = "";console.log(name ?? "默认名"); // ""const age = undefined;console.log(age ?? 18); // 18
\`\`\`

#### ES12（2021）核心特性

##### （1）逻辑赋值运算符（||=、&&=、??=）

- **作用**：结合逻辑运算和赋值，简化代码；
- **示例**：

js

\`\`\`javascript
// ||=：左侧为假值时赋值let a = 0;
a ||= 10;console.log(a); // 10// &&=：左侧为真值时赋值let b = 5;
b &&= 20;console.log(b); // 20// ??=：左侧为null/undefined时赋值let c = null;
c ??= 30;console.log(c); // 30
\`\`\`

#### ES13（2022）核心特性

##### （1）类的私有字段（#）

- **作用**：定义类的私有属性 / 方法，仅能在类内部访问；
- **示例**：

js

\`\`\`javascript
class Person {
  #name = "张三"; // 私有属性（#开头）#sayHi() { // 私有方法console.log(\`Hi, \${this.#name}\`);}publicSayHi() {this.#sayHi(); // 类内部可访问}}const p = new Person();
p.publicSayHi(); // Hi, 张三console.log(p.#name); // 报错：私有字段不可访问
\`\`\`

##### （2）顶层 await

- **作用**：允许在模块顶层使用 await，无需包裹在 async 函数中；
- **示例**：

js

\`\`\`javascript
// module.js（ES模块）const res = await fetch("https://api.example.com/data");const data = await res.json();export default data;// 导入模块时，会等待顶层await执行完成import data from "./module.js";console.log(data);
\`\`\``;export{n as default};
