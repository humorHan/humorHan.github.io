const n=`### 前端内存泄漏的常见场景有哪些？如何检测和解决？

**答案：**内存泄漏指 JS 中不再使用的对象未被垃圾回收（GC），持续占用内存，导致页面卡顿、崩溃，核心内容如下：

#### 一、常见内存泄漏场景

1. **未清理的事件监听**
	- 场景：给 window/document/ 元素绑定事件后，未移除监听，且元素被删除 / 组件卸载；
	- 示例：
	- js
	\`\`\`javascript
// 组件挂载时绑定事件window.addEventListener('resize', handleResize);// 组件卸载时未移除，导致 window 引用 handleResize，无法回收
\`\`\`

2. **未清理的定时器 / Interval**
   - 场景：\`setTimeout\`/\`setInterval\` 未清除，且回调函数引用了外部变量；
   - 示例：
   - js

   \`\`\`javascript
   \`\`\`

const timer = setInterval(() => {console.log(data); // 引用外部 data，timer 未清除则 data 无法回收}, 1000);// 页面关闭/组件卸载时未执行 clearInterval(timer)

\`\`\`

3. **闭包泄漏**
	- 场景：闭包引用了大对象 / DOM 节点，且闭包被全局变量持有；
	- 示例：
	- js
	\`\`\`javascript
let bigObj = { data: new Array(1000000) };window.foo = function() {return bigObj; // 闭包引用 bigObj，全局 foo 持有闭包，bigObj 无法回收};
\`\`\`

4. **未清理的 DOM 引用**
   - 场景：删除 DOM 节点后，变量仍引用该节点；
   - 示例：
   - js

   \`\`\`javascript
   \`\`\`

const box = document.getElementById('box');document.body.removeChild(box); // DOM 节点已删除// 变量 box 仍引用该节点，导致内存泄漏

\`\`\`

5. **全局变量泄漏**
	- 场景：未声明的变量自动挂载到 window 上，或故意定义大量全局变量；
	- 示例：
	- js
	\`\`\`javascript
function fn() {
  leak = 'hello'; // 未声明，自动成为 window.leak，永久存在}
\`\`\`

6. **第三方库 / 框架泄漏**
   - 场景：使用第三方库（如 echarts、swiper）后，未调用销毁方法；
   - 示例：
   - js

   \`\`\`javascript
   \`\`\`

const chart = echarts.init(dom);// 组件卸载时未执行 chart.dispose()，导致 dom/chart 实例泄漏

\`\`\`

#### 二、内存泄漏检测方法

1. **Chrome DevTools Memory 面板**
	- 步骤：
		1. 打开 DevTools → 切换到「Memory」标签；
		2. 选择「Heap snapshot」（堆快照），点击「Take snapshot」生成快照；
		3. 执行操作（如加载组件、卸载组件），再生成第二个快照；
		4. 对比两个快照，查看「Difference」，筛选「Detached DOM nodes」（分离的 DOM 节点）或大对象，定位泄漏点。

2. **Performance 面板（内存时序图）**
	- 步骤：
		1. 打开 Performance 面板，勾选「Memory」；
		2. 录制操作过程，查看内存曲线：若操作后内存只增不减，说明存在泄漏。

3. **Console 工具**
	- 使用 \`console.memory\` 查看当前内存使用情况：
	- js
	\`\`\`javascript
console.log(console.memory); // { usedJSHeapSize: 已使用内存, totalJSHeapSize: 总内存 }
\`\`\`

#### 三、内存泄漏解决方法

1. **通用原则**：“谁创建，谁销毁”，在组件卸载 / 页面关闭时清理资源。
2. **针对性解决**：

   - 事件监听：卸载时执行 \`removeEventListener\`；
   - 定时器：执行 \`clearTimeout\`/\`clearInterval\`；
   - DOM 引用：删除节点后，将变量置为 \`null\`（如 \`box = null\`）；
   - 闭包泄漏：不需要时释放闭包引用（如 \`window.foo = null\`）；
   - 全局变量：避免未声明变量，使用模块化 / 局部变量替代；
   - 第三方库：调用销毁方法（如 \`chart.dispose()\`、\`swiper.destroy()\`）。
3. **优化实践**：

   - Vue 项目：在 \`onUnmounted\` 钩子中清理资源；
   - React 项目：在 \`useEffect\` 返回清理函数；
   - 定期检查：对长生命周期页面（如后台系统），定期清理无用数据。`;export{n as default};
