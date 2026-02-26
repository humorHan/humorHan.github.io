const n=`### 1. JavaScript 的 7 种数据类型？基本类型与引用类型的核心区别？

**答案**：

#### 7 种数据类型（ES6+）：

- **基本类型（原始类型）**：String（字符串）、Number（数字）、Boolean（布尔）、Null（空）、Undefined（未定义）、Symbol（符号，ES6 新增，唯一值）、BigInt（大整数，ES11 新增，处理超大数）；
- **引用类型**：Object（对象），包含 Array（数组）、Function（函数）、Date（日期）、RegExp（正则）等。

#### 核心区别：

#### 示例：

js

\`\`\`javascript
// 基本类型：值拷贝，互不影响let a = 10;let b = a;
b = 20;console.log(a); // 10（a不变）// 引用类型：引用拷贝，共享对象let obj1 = { name: "张三" };let obj2 = obj1;
obj2.name = "李四";console.log(obj1.name); // 李四（obj1被修改）
\`\`\``;export{n as default};
