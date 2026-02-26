const o=`### 2. 判断变量类型的 3 种方法？typeof/instanceof/Object.prototype.toString.call 的差异？

**答案**：

#### 3 种核心方法及差异：

#### 示例：

js

\`\`\`javascript
// typeofconsole.log(typeof "abc"); // "string"console.log(typeof null); // "object"（历史bug）console.log(typeof []); // "object"console.log(typeof function(){}); // "function"// instanceofconsole.log([] instanceof Array); // trueconsole.log({} instanceof Object); // trueconsole.log(123 instanceof Number); // false（基本类型）// Object.prototype.toString.callconsole.log(Object.prototype.toString.call(null)); // "[object Null]"console.log(Object.prototype.toString.call([])); // "[object Array]"console.log(Object.prototype.toString.call(123n)); // "[object BigInt]"
\`\`\``;export{o as default};
