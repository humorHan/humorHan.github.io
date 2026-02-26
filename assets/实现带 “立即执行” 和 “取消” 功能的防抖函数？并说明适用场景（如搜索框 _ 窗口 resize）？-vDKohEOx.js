const e=`### 实现带 “立即执行” 和 “取消” 功能的防抖函数？并说明适用场景（如搜索框 / 窗口 resize）？

**答：**

#### （1）核心思路

- 防抖（Debounce）：触发事件后延迟 \`wait\` 毫秒执行函数，若期间再次触发则重置定时器；
- 立即执行：第一次触发事件时立即执行函数，后续触发仅重置定时器；
- 取消功能：提供 \`cancel\` 方法，清除定时器，终止待执行的函数。

#### （2）实现代码

javascript

运行

\`\`\`javascript
function debounce(fn, wait, immediate = false) {let timer = null; // 定时器标识let isInvoked = false; // 标记是否已立即执行// 防抖核心函数const debounced = function (...args) {const context = this; // 保留 this 指向// 重置定时器if (timer) clearTimeout(timer);// 立即执行逻辑if (immediate && !isInvoked) {
      fn.apply(context, args);
      isInvoked = true;} else {// 延迟执行
      timer = setTimeout(() => {
        fn.apply(context, args);
        isInvoked = false; // 重置标记，允许下次立即执行}, wait);}};// 取消方法
  debounced.cancel = function () {clearTimeout(timer);
    timer = null;
    isInvoked = false; // 重置状态};return debounced;}// 示例const log = (msg) => console.log(msg);const debouncedLog = debounce(log, 1000, true);// 触发多次debouncedLog('hello'); // 立即执行，输出 hellodebouncedLog('world'); // 重置定时器，1秒后无触发则执行// debouncedLog.cancel(); // 取消执行
\`\`\`

#### （3）适用场景`;export{e as default};
