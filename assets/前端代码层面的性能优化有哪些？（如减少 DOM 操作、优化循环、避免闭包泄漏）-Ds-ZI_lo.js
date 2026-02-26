const n=`### 10. 前端代码层面的性能优化有哪些？（如减少 DOM 操作、优化循环、避免闭包泄漏）

**答案：**代码层面优化核心是 “减少不必要的计算、降低资源消耗、避免阻塞主线程”，核心手段如下：

#### 一、减少 DOM 操作（DOM 操作是前端性能瓶颈）

1. **批量处理 DOM**：用文档片段（DocumentFragment）、字符串拼接、虚拟 DOM 批量更新，避免频繁增删改 DOM；
2. **缓存 DOM 节点**：避免多次 \`document.getElementById\`/\`querySelector\`，缓存到变量中：
3. js

\`\`\`javascript
// 差：多次查询 DOMfor (let i = 0; i < 100; i++) {document.getElementById('box').textContent = i;}// 好：缓存 DOM 节点const box = document.getElementById('box');for (let i = 0; i < 100; i++) {
  box.textContent = i;}
\`\`\`

1. **避免频繁读写 DOM 布局属性**：先读所有需要的属性，再批量修改（减少重排）。

#### 二、优化循环 / 计算逻辑

1. **减少循环内的计算**：将循环内不变的计算移到循环外：
2. js

\`\`\`javascript
// 差：每次循环都计算 arr.lengthfor (let i = 0; i < arr.length; i++) {}// 好：缓存长度const len = arr.length;for (let i = 0; i < len; i++) {}
\`\`\`

1. **使用高效的遍历方式**：简单数组用 \`for\` 循环（比 \`forEach\`/\`map\` 快），大数据用 Web Worker 处理；
2. **避免不必要的计算**：用缓存存储计算结果（如斐波那契数列缓存、重复请求的接口数据缓存）。

#### 三、避免内存泄漏（减少资源占用）

1. **避免闭包泄漏**：闭包中不要引用不必要的大对象，及时释放引用：
2. js

\`\`\`javascript
// 泄漏：闭包引用了大对象，且全局变量持有闭包let bigObj = { data: new Array(1000000) };window.foo = function() {console.log(bigObj.data); // 闭包引用 bigObj，无法被回收};// 修复：不需要时释放引用
bigObj = null;window.foo = null;
\`\`\`

1. **清理事件监听**：组件卸载 / 页面关闭时，移除事件监听：
2. js

\`\`\`javascript
const handleClick = () => {};window.addEventListener('click', handleClick);// 组件卸载时window.removeEventListener('click', handleClick);
\`\`\`

1. **清理定时器 / Observer**：及时清除 \`setInterval\`/\`setTimeout\`/\`IntersectionObserver\`：
2. js

\`\`\`javascript
const timer = setInterval(() => {}, 1000);clearInterval(timer); // 及时清理
\`\`\`

1. **避免未清理的 DOM 引用**：删除 DOM 节点时，同时释放对该节点的变量引用。

#### 四、优化函数 / 代码结构

1. **减少同步长任务**：将耗时函数拆分为多个小任务，用 \`requestIdleCallback\`/\`setTimeout\` 分批次执行：
2. js

\`\`\`javascript
// 拆分长任务const longTask = (data, start = 0) => {const end = Math.min(start + 1000, data.length);for (let i = start; i < end; i++) {// 处理小部分数据}if (end < data.length) {requestIdleCallback(() => longTask(data, end)); // 空闲时执行下一批}};
\`\`\`

1. **避免重复代码**：封装通用函数 / 组件，减少代码体积和维护成本；
2. **使用短路求值**：减少不必要的条件判断：
3. js

\`\`\`javascript
// 差：无论 a 是否为真，都执行 b()if (a) { b(); }// 好：a 为假时，b() 不执行
a && b();
\`\`\`

#### 五、其他代码优化

1. **避免使用 with/eval**：\`with\` 会改变作用域链，\`eval\` 执行慢且有安全风险；
2. **优化对象 / 数组访问**：数组下标访问比对象属性访问快，频繁访问的对象属性可缓存到变量；
3. **减少重定向**：代码中避免跳转到重定向链接，减少网络请求耗时。`;export{n as default};
