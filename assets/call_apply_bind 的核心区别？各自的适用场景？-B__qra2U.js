const n=`### 8. call/apply/bind 的核心区别？各自的适用场景？

**答案**：

#### 核心区别：

#### 适用场景：

##### 1. call：参数数量确定时

- 借用对象方法（如类数组转数组）；
- 多参数函数调用。

js

\`\`\`javascript
// 类数组转数组const arrLike = { 0: "a", 1: "b", length: 2 };Array.prototype.push.call(arrLike, "c");console.log(arrLike); // {0: "a", 1: "b", 2: "c", length: 3}
\`\`\`

##### 2. apply：参数数量不确定 / 参数为数组时

- 数学运算（如 \`Math.max\` 求数组最大值）；
- 动态参数传递。

js

\`\`\`javascript
// 求数组最大值const arr = [1, 3, 5, 2];const max = Math.max.apply(null, arr); // 5// 等价于Math.max(...arr)（ES6扩展运算符）
\`\`\`

##### 3. bind：需延迟执行 / 重复调用同一 this 时

- 事件处理函数绑定 this；
- 柯里化（提前绑定部分参数）。

js

\`\`\`javascript
// 事件处理函数const btn = document.querySelector("button");const obj = { name: "按钮" };
btn.addEventListener("click", function() {console.log(this.name);}.bind(obj)); // 绑定this为obj// 柯里化function add(a, b) {return a + b;}const add5 = add.bind(null, 5); // 提前绑定a=5console.log(add5(3)); // 8
\`\`\``;export{n as default};
