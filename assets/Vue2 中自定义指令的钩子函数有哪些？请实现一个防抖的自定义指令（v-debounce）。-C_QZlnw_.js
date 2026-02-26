const n=`### 8. Vue2 中自定义指令的钩子函数有哪些？请实现一个防抖的自定义指令（v-debounce）。

**答：**

- **自定义指令的钩子函数**：

  1. \`bind\`：指令绑定到元素时执行（只执行一次，可初始化数据）；
  2. \`inserted\`：元素插入到父 DOM 时执行（可操作 DOM）；
  3. \`update\`：元素更新时执行（不保证子元素已更新）；
  4. \`componentUpdated\`：元素及子元素全部更新后执行；
  5. \`unbind\`：指令与元素解绑时执行（清理定时器 / 事件监听）。
- **防抖自定义指令实现（v-debounce）**：

javascript

运行

\`\`\`javascript
// 注册全局自定义指令Vue.directive('debounce', {// 绑定元素插入到DOM时执行inserted: function (el, binding) {// 获取防抖延迟时间（默认500ms）const delay = binding.arg || 500;// 获取防抖执行的函数const fn = binding.value;// 定义防抖定时器let timer = null;// 为元素绑定点击事件（可根据需求改为input/change等）
    el.addEventListener('click', () => {if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn && fn(); // 执行传入的回调函数}, delay);});// 存储定时器到元素上，方便解绑时清理
    el._debounceTimer = timer;},// 指令解绑时清理定时器unbind: function (el) {clearTimeout(el._debounceTimer);
    el._debounceTimer = null;}});// 组件中使用/*
<button v-debounce:300="handleClick">防抖按钮</button>
<script>
export default {
  methods: {
    handleClick() {
      console.log('点击触发（防抖300ms）');
    }
  }
}
<\/script>
*/
\`\`\``;export{n as default};
