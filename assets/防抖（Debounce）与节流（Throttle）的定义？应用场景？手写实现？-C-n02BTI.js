const n=`### 防抖（Debounce）与节流（Throttle）的定义？应用场景？手写实现？

**答案**：

#### 核心定义：

- **防抖（Debounce）**：触发事件后，延迟 n 秒执行回调；若 n 秒内再次触发，重置延迟时间（核心：“最后一次触发才执行”）。
- **节流（Throttle）**：触发事件后，n 秒内仅执行一次回调；若 n 秒内多次触发，仅生效第一次（核心：“固定频率执行”）。

#### 应用场景：

#### 手写实现：

##### 防抖（含立即执行版）

js

\`\`\`javascript
/**
 * 防抖函数
 * @param {Function} fn - 目标函数
 * @param {Number} delay - 延迟时间（ms）
 * @param {Boolean} immediate - 是否立即执行（第一次触发执行）
 * @returns {Function} 包装后的函数
 */function debounce(fn, delay = 500, immediate = false) {let timer = null; // 缓存定时器return function(...args) {// 重置定时器if (timer) clearTimeout(timer);// 立即执行版：第一次触发无定时器时执行if (immediate && !timer) {
      fn.apply(this, args);}// 重新设置定时器
    timer = setTimeout(() => {if (!immediate) {
        fn.apply(this, args);}
      timer = null; // 执行后清空定时器}, 
      delay);};}
// 测试：搜索框联想const search = debounce((keyword) => {console.log(\`搜索：\${keyword}\`);}, 500);// 输入过程中频繁触发，仅停止输入500ms后执行search("js");search("js防抖");search("js防抖实现");
\`\`\`

##### 节流（时间戳版 + 定时器版）

js

\`\`\`javascript
/**
 * 节流函数（时间戳+定时器结合版，兼顾首尾触发）
 * @param {Function} fn - 目标函数
 * @param {Number} interval - 间隔时间（ms）
 * @returns {Function} 包装后的函数
 */function throttle(fn, interval = 500) {let lastTime = 0; // 上一次执行时间let timer = null; // 缓存定时器return function(...args) {const now = Date.now();// 计算剩余时间：距离下次执行的时间const remaining = interval - (now - lastTime);// 剩余时间≤0，立即执行（时间戳版核心）if (remaining <= 0) {if (timer) {clearTimeout(timer);
        timer = null;}
      fn.apply(this, args);
      lastTime = now;} else if (!timer) {// 剩余时间>0，设置定时器（保证最后一次触发也执行）
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
        timer = null;}, remaining);}};}
        // 测试：滚动加载const loadData = throttle(() => {console.log("加载更多数据");}, 1000);window.addEventListener("scroll", loadData);
\`\`\``;export{n as default};
