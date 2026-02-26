const n=`### 7. this 的 5 种绑定规则？（默认 / 隐式 / 显式 /new/ 箭头函数）如何改变 this 指向？

**答案**：

#### this 的 5 种绑定规则（优先级：new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定，箭头函数无绑定）：

##### 1. 默认绑定（全局 / 独立函数调用）

this 指向全局对象（浏览器：\`window\`，Node.js：\`global\`）；严格模式下 \`this\` 为 \`undefined\`。

js

\`\`\`javascript
function fn() {console.log(this); // window（非严格模式）/ undefined（严格模式）}fn();
\`\`\`

##### 2. 隐式绑定（对象方法调用）

this 指向调用该方法的对象（就近原则）。

js

\`\`\`javascript
const obj = {name: "张三",sayHi() {console.log(this.name); // 张三（this指向obj）}};
obj.sayHi();
\`\`\`

##### 3. 显式绑定（call/apply/bind）

手动指定 this 指向，\`call\`/\`apply\` 立即执行，\`bind\` 返回新函数（不立即执行）。

js

\`\`\`javascript
function fn() {console.log(this.name);}const obj = { name: "李四" };
fn.call(obj); // 李四
fn.apply(obj); // 李四const newFn = fn.bind(obj);newFn(); // 李四
\`\`\`

##### 4. new 绑定（构造函数调用）

this 指向新建的实例对象。

js

\`\`\`javascript
function Person(name) {this.name = name; // this指向new创建的实例}const p = new Person("王五");console.log(p.name); // 王五
\`\`\`

##### 5. 箭头函数绑定

箭头函数无自身 \`this\`，其 \`this\` 继承自外层最近的非箭头函数的 \`this\`（无法通过 \`call/apply/bind\` 修改）。

js

\`\`\`javascript
const obj = {fn: () => {console.log(this); // window（继承全局this）},fn2() {const inner = () => {console.log(this); // obj（继承fn2的this）};inner();}};
obj.fn();
obj.fn2();
\`\`\`

#### 改变 this 指向的方法：

1. \`call(thisArg, arg1, arg2...)\`：立即执行，参数逐个传递；
2. \`apply(thisArg, [arg1, arg2...])\`：立即执行，参数以数组传递；
3. \`bind(thisArg, arg1, arg2...)\`：返回新函数，参数可提前绑定（柯里化）；
4. 手动赋值：将方法赋值给变量时，手动绑定 this（如 \`const fn = obj.sayHi.bind(obj)\`）。`;export{n as default};
