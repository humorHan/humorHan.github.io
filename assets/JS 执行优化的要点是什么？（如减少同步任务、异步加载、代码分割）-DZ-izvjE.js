const n=`### 12. JS 执行优化的要点是什么？（如减少同步任务、异步加载、代码分割）

**答案：**JS 执行优化核心是 “减少主线程阻塞、降低执行耗时、提升代码加载 / 执行效率”，核心要点如下：

#### 一、减少同步长任务（避免阻塞主线程）

1. **拆分长任务**：将超过 50ms 的长任务拆分为多个小任务，用 \`requestIdleCallback\`/\`setTimeout\` 分批次执行：
2. js

\`\`\`javascript
// 长任务拆分function processData(data, batchSize = 1000) {let index = 0;function processBatch() {const end = Math.min(index + batchSize, data.length);for (; index < end; index++) {// 处理单条数据}if (index < data.length) {requestIdleCallback(processBatch); // 浏览器空闲时执行下一批}}processBatch();}
\`\`\`

1. **耗时任务移到 Web Worker**：大数据计算、复杂算法等放到 Worker 线程执行，不阻塞 UI 渲染。

#### 二、异步加载 JS（避免阻塞页面解析 / 渲染）

1. **使用 async/defer**：

   - \`async\`：异步加载，加载完成后立即执行（顺序不确定），适合独立的第三方脚本（如统计脚本）；
   - \`defer\`：异步加载，DOM 解析完成后执行（按加载顺序执行），适合依赖 DOM 的脚本；
2. html
3. 预览

\`\`\`html
<script src="third-party.js" async><\/script><script src="main.js" defer><\/script>
\`\`\`

1. **动态加载脚本**：非首屏脚本在页面加载完成后加载：
2. js

\`\`\`javascript
window.addEventListener('load', () => {const script = document.createElement('script');
  script.src = 'lazy-script.js';document.body.appendChild(script);});
\`\`\`

1. **模块异步加载**：ES6 Module 中用 \`import()\` 动态导入：
2. js

\`\`\`javascript
// 点击按钮后加载脚本
btn.addEventListener('click', async () => {const module = await import('./module.js');
  module.doSomething();});
\`\`\`

#### 三、代码分割（Code Splitting）

1. **按路由分割**：Vue/React 中路由懒加载，仅加载当前路由的代码：
2. js

\`\`\`javascript
// Vue3 路由分割const About = () => import('./views/About.vue');const router = createRouter({routes: [{ path: '/about', component: About }]});
\`\`\`

1. **按组件分割**：非首屏组件异步加载（如弹窗、图表组件）；
2. **按功能分割**：将第三方库（如 echarts、xlsx）单独分割为 chunk，避免打包到主文件；
3. **Webpack/Vite 配置**：

   - Webpack：用 \`splitChunks\` 分割公共代码 / 第三方库；
   - Vite：默认按模块分割，可通过 \`build.rollupOptions\` 自定义分割规则。

#### 四、减少 JS 体积（加快加载 / 解析速度）

1. **代码压缩**：

   - 生产环境开启 Terser 压缩（移除空格、注释、重命名变量）；
   - 移除 console.log、debugger 等调试代码；
2. **Tree Shaking**：清除未使用的代码（需使用 ES6 Module，禁用 CommonJS）；
3. **按需引入第三方库**：

   - 如 Element Plus 只导入需要的组件：
   - js

   \`\`\`javascript
   \`\`\`

import { ElButton, ElInput } from 'element-plus';

\`\`\`
	- 避免全量引入（如 \`import _ from 'lodash'\` → \`import debounce from 'lodash/debounce'\`）；

4. **替换体积大的库**：用轻量级库替代（如 dayjs 替代 moment.js，axios-mini 替代 axios）。

#### 五、优化执行效率

1. **缓存函数结果（记忆化）**：避免重复计算（如 React 的 useMemo/useCallback，手动实现缓存）：

2. js

\`\`\`javascript
const memoize = (fn) => {const cache = new Map();return (...args) => {const key = JSON.stringify(args);if (cache.has(key)) return cache.get(key);const result = fn(...args);
    cache.set(key, result);return result;};};const calculate = memoize((num) => num * 2);
\`\`\`

1. **减少原型链查找**：频繁访问的对象属性缓存到变量中；
2. **避免频繁创建函数**：循环内 / 渲染函数内避免定义函数（如 Vue 模板中避免 \`@click="() => handleClick(id)"\`）；
3. **优化事件绑定**：

   - 事件委托：父元素绑定事件，通过事件冒泡处理子元素事件（减少事件监听数）；
   - 防抖 / 节流：高频事件（resize、scroll、input）用防抖（debounce）/ 节流（throttle）：
   - js

   \`\`\`javascript
   \`\`\`

// 防抖：n 秒内只执行最后一次 const debounce = (fn, delay) => {let timer = null;return (...args) => {clearTimeout(timer);
timer = setTimeout(() => fn(...args), delay);};};
input.addEventListener('input', debounce(handleInput, 300));

\`\`\`

#### 六、其他优化要点

1. **延迟初始化**：非首屏需要的对象 / 实例，在首次使用时初始化（如图表实例、编辑器实例）；

2. **减少全局变量**：全局变量会挂载到 window 上，增加作用域链查找耗时，且易导致命名冲突；

3. **使用高效的数据结构**：频繁增删的场景用 Map/Set（比数组快），频繁查找的场景用对象 / Map。`;export{n as default};
