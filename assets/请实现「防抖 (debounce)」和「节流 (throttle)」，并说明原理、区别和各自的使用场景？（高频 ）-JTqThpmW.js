const n=`### 请实现「防抖 (debounce)」和「节流 (throttle)」，并说明原理、区别和各自的使用场景？（高频 ）

答：这是**前端手写场景题的必考王者**，必须答全「原理 + 代码 + 区别 + 场景」，缺一不可，标准答案如下：

#### 一、防抖（debounce）

1. 核心原理：**触发事件后，延迟 n 秒再执行函数**；如果在延迟时间内，事件再次被触发，则**重新计时**；最终只会执行**最后一次**触发的函数。

2. 手写核心代码（带立即执行版，面试满分版）：

3. javascript

4. 运行

\`\`\`

function debounce(fn, delay, immediate = false) {let timer = null;return function(...args) {clearTimeout(timer);if (immediate && !timer) {
fn.apply(this, args); // 立即执行一次}
timer = setTimeout(() => {
fn.apply(this, args);
timer = null;}, delay);}}

\`\`\`

#### 二、节流（throttle）

1. 核心原理：**触发事件后，每隔 n 秒，函数只会执行一次**；在规定时间内，无论事件触发多少次，都只执行一次，控制函数的执行频率。

2. 手写核心代码（时间戳版，最常用）：

3. javascript

4. 运行

\`\`\`

function throttle(fn, interval) {let lastTime = 0;return function(...args) {const now = Date.now();if (now - lastTime >= interval) {
fn.apply(this, args);
lastTime = now;}}}

\`\`\`

#### 三、防抖 vs 节流 核心区别

防抖是「**最后一次触发才执行**」，节流是「**每隔一段时间执行一次**」。

#### 四、各自的使用场景（必答）

- 防抖的使用场景：输入框搜索联想、窗口 resize 事件、滚动到底部加载、按钮防止重复点击；

- 节流的使用场景：页面滚动（scroll）事件、鼠标移动（mousemove）事件、高频点击提交按钮、视频播放进度条更新。`;export{n as default};
