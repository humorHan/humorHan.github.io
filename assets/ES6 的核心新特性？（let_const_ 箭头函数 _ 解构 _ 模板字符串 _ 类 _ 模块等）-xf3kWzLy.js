const n=`### ES6 的核心新特性？（let/const/ 箭头函数 / 解构 / 模板字符串 / 类 / 模块等）

**答案**：

#### ES6（ES2015）核心新特性（按使用频率排序）：

##### 块级作用域：let/const

- \`let\`：声明变量，块级作用域，无变量提升，不可重复声明；
- \`const\`：声明常量，块级作用域，必须初始化，不可修改引用（引用类型属性可改）；

js

\`\`\`javascript
// 块级作用域if (true) {let a = 10;const b = { name: "ES6" };
  b.name = "ES2015"; // 合法（仅引用不可改）}console.log(a); // 报错：a is not defined
\`\`\`

##### 箭头函数（=>）

- 无自身 \`this\`，继承外层非箭头函数的 \`this\`；
- 无 \`arguments\` 对象（可用剩余参数 \`...args\` 替代）；
- 不能作为构造函数（无 \`prototype\`）；

js

\`\`\`javascript
const fn = (a, b) => a + b; // 单行返回可省略{}和returnconst obj = {name: "测试",fn: () => console.log(this.name) // this指向全局};
\`\`\`

##### 解构赋值

- 数组解构：按位置匹配，支持默认值；
- 对象解构：按键名匹配，支持重命名、默认值；

js

\`\`\`javascript
// 数组解构const [a, b = 2, ...rest] = [1]; // a=1, b=2, rest=[]// 对象解构const { name: userName, age = 18 } = { name: "张三" }; // userName=张三, age=18
\`\`\`

##### 模板字符串（\`\`）

- 支持换行、变量插值（\`\${变量}\`）、表达式；

js

\`\`\`javascript
const name = "张三";const str = \`姓名：\${name}
年龄：\${18 + 2}\`; // 换行和表达式均生效
\`\`\`

##### 类（class）

- 语法糖，替代原型链继承，支持 \`constructor\`、\`extends\`、\`super\`；

js

\`\`\`javascript
class Parent {constructor(name) { this.name = name; }sayHi() { console.log(this.name); }}class Child extends Parent {constructor(name, age) {super(name); // 调用父类构造函数this.age = age;}}
\`\`\`

##### 模块化（ES Module）

- \`export\`：导出变量 / 函数 / 类；\`import\`：导入模块；
- 支持默认导出、按需导出、重命名；

js

\`\`\`javascript
// 导出模块（module.js）export const name = "张三";export default function() { console.log("默认导出"); }// 导入模块import fn, { name as userName } from "./module.js";
\`\`\`

##### 扩展运算符（...）

- 数组 / 对象展开：浅拷贝、合并；
- 剩余参数：收集函数多余参数；

js

\`\`\`javascript
// 数组展开const arr1 = [1,2];const arr2 = [...arr1,3]; // [1,2,3]// 对象展开const obj1 = { a:1 };const obj2 = { ...obj1, b:2 }; // {a:1,b:2}// 剩余参数const fn = (...args) => console.log(args); // fn(1,2,3) → [1,2,3]
\`\`\`

##### Promise

- 解决回调地狱，支持异步操作的链式调用、统一错误处理；

js

\`\`\`javascript
new Promise((resolve, reject) => {setTimeout(() => resolve("成功"), 1000);}).then(res => console.log(res)).catch(err => console.log(err));
\`\`\`

##### 新增数组方法

- \`Array.from\`：类数组转数组；\`Array.of\`：创建数组；
- \`find\`/\`findIndex\`：查找元素 / 索引；\`includes\`：判断是否包含元素；

js

\`\`\`javascript
console.log(Array.from("abc")); // ["a","b","c"]console.log([1,2,3].includes(2)); // true
\`\`\`

##### 新增对象方法

- \`Object.assign\`：对象浅拷贝；\`Object.keys/values/entries\`：遍历对象；

js

\`\`\`javascript
const obj = { a:1, b:2 };console.log(Object.values(obj)); // [1,2]
\`\`\``;export{n as default};
