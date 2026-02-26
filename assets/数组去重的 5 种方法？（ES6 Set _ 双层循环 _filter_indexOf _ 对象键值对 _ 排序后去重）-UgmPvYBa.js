const n=`### 数组去重的 5 种方法？（ES6 Set / 双层循环 /filter+indexOf / 对象键值对 / 排序后去重）

**答案**：

#### 测试用例：

js

\`\`\`javascript
const arr = [1, 2, 2, "2", 3, 3, null, null, undefined, undefined, NaN, NaN];
\`\`\`

##### 方法 1：ES6 Set（最简，推荐）

**原理**：Set 是无重复值的集合，通过 \`[...new Set(arr)]\` 转为数组。

js

\`\`\`javascript
function unique(arr) {return [...new Set(arr)];}console.log(unique(arr)); // [1,2,"2",3,null,undefined,NaN]
\`\`\`

**优点**：简洁高效、支持 NaN 去重；**缺点**：无法区分对象类型（如 \`{}\`）、ES6 + 兼容。

##### 方法 2：双层循环（最基础，兼容所有环境）

**原理**：外层循环遍历元素，内层循环对比，重复则删除。

js

\`\`\`javascript
function unique(arr) {const res = [];for (let i = 0; i < arr.length; i++) {let isRepeat = false;for (let j = 0; j < res.length; j++) {if (arr[i] === res[j]) {
        isRepeat = true;break;}}if (!isRepeat) res.push(arr[i]);}return res;}console.log(unique(arr)); // [1,2,"2",3,null,undefined]（不支持NaN去重）
\`\`\`

**优点**：兼容所有浏览器；**缺点**：效率低（O (n²)）、不支持 NaN 去重。

##### 方法 3：filter + indexOf

**原理**：\`indexOf\` 返回元素首次出现的索引，若当前索引 ≠ 首次索引，说明重复。

js

\`\`\`javascript
function unique(arr) {return arr.filter((item, index) => arr.indexOf(item) === index);}console.log(unique(arr)); // [1,2,"2",3,null,undefined]（不支持NaN去重）
\`\`\`

**优点**：简洁、兼容 ES5+；**缺点**：不支持 NaN 去重（\`indexOf(NaN)\` 返回 - 1）。

##### 方法 4：对象键值对（支持所有类型去重）

**原理**：利用对象键名唯一，存储元素类型 + 值，避免类型混淆（如 2 和 "2"）。

js

\`\`\`javascript
function unique(arr) {const res = [];const obj = {};for (let item of arr) {const key = typeof item + item; // 类型+值作为键名（如"number2"/"string2"）if (!obj[key]) {
      obj[key] = true;
      res.push(item);}}return res;}console.log(unique(arr)); // [1,2,"2",3,null,undefined,NaN]
\`\`\`

**优点**：支持所有类型（包括 NaN）、区分类型；**缺点**：代码稍复杂。

##### 方法 5：排序后去重

**原理**：先排序（重复元素相邻），遍历对比当前元素与前一个元素，不同则保留。

js

\`\`\`javascript
function unique(arr) {if (arr.length <= 1) return arr;const sortedArr = arr.sort();const res = [sortedArr[0]];for (let i = 1; i < sortedArr.length; i++) {if (sortedArr[i] !== sortedArr[i-1]) {
      res.push(sortedArr[i]);}}return res;}console.log(unique(arr)); // [1,2,"2",3,NaN,NaN,null,undefined]（不支持NaN去重）
\`\`\`

**优点**：效率高于双层循环（O (n log n)）；**缺点**：改变原数组顺序、不支持 NaN 去重。`;export{n as default};
