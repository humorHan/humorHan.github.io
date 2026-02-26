const n=`### 遍历对象的 5 种方法？（for...in/Object.keys/Object.values/Object.entries/Object.getOwnPropertyNames）

**答案**：

#### 测试用例：

js

\`\`\`javascript
// 定义对象（含自有属性、原型属性、不可枚举属性）const obj = {name: "张三",age: 18};// 添加原型属性Object.prototype.gender = "男";// 添加不可枚举属性Object.defineProperty(obj, "id", {value: 1001,enumerable: false // 不可枚举});
\`\`\`

##### 方法 1：for...in（遍历自有 + 原型可枚举属性）

**原理**：遍历对象所有可枚举属性（包括原型链），需用 \`hasOwnProperty\` 过滤原型属性。

js

\`\`\`javascript
for (const key in obj) {if (obj.hasOwnProperty(key)) { // 过滤原型属性console.log(key, obj[key]); // name 张三 / age 18（不包含id/gender）}}
\`\`\`

**优点**：兼容所有浏览器；**缺点**：需过滤原型属性、不遍历不可枚举属性。

##### 方法 2：Object.keys（遍历自有可枚举属性的键）

**原理**：返回对象自有可枚举属性的键数组（不含原型 / 不可枚举属性）。

js

\`\`\`javascript
const keys = Object.keys(obj);
keys.forEach(key => {console.log(key, obj[key]); // name 张三 / age 18});
\`\`\`

**优点**：简洁、仅遍历自有属性；**缺点**：不遍历不可枚举 / 原型属性。

##### 方法 3：Object.values（遍历自有可枚举属性的值）

**原理**：返回对象自有可枚举属性的值数组。

js

\`\`\`javascript
const values = Object.values(obj);console.log(values); // ["张三", 18]
\`\`\`

**优点**：直接获取值；**缺点**：不遍历不可枚举 / 原型属性、ES6 + 兼容。

##### 方法 4：Object.entries（遍历自有可枚举属性的键值对）

**原理**：返回对象自有可枚举属性的键值对数组（\`[[key1, value1], [key2, value2]]\`）。

js

\`\`\`javascript
const entries = Object.entries(obj);
entries.forEach(([key, value]) => {console.log(key, value); // name 张三 / age 18});
\`\`\`

**优点**：同时获取键和值；**缺点**：不遍历不可枚举 / 原型属性、ES6 + 兼容。

##### 方法 5：Object.getOwnPropertyNames（遍历自有所有属性的键）

**原理**：返回对象自有所有属性的键数组（包括不可枚举属性，不含原型属性）。

js

\`\`\`javascript
const allKeys = Object.getOwnPropertyNames(obj);
allKeys.forEach(key => {console.log(key, obj[key]); // name 张三 / age 18 / id 1001});
\`\`\`

**优点**：遍历不可枚举属性；**缺点**：不遍历原型属性、ES5 + 兼容。

#### 补充：遍历 Symbol 属性

- \`Object.getOwnPropertySymbols\`：遍历自有 Symbol 属性；

js

\`\`\`javascript
const sym = Symbol("test");
obj[sym] = "Symbol属性";const symKeys = Object.getOwnPropertySymbols(obj);console.log(symKeys[0], obj[symKeys[0]]); // Symbol(test) Symbol属性
\`\`\``;export{n as default};
