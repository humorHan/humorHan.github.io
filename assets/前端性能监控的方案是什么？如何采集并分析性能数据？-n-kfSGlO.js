const n=`### 前端性能监控的方案是什么？如何采集并分析性能数据？

**答案：**前端性能监控核心是 “采集关键性能指标、定位性能瓶颈、量化优化效果”，完整方案包括**数据采集、数据上报、数据存储、数据分析、告警可视化**五部分：

#### 一、性能数据采集（核心环节）

##### 核心指标采集

- **Web 核心指标（LCP/INP/CLS）**：
	- 使用 \`web-vitals\` 库（Google 官方）快速采集：
	- js
	\`\`\`javascript
import { getLCP, getINP, getCLS } from 'web-vitals';
// 采集 LCP
getLCP((metric) => {console.log('LCP：', metric.value); 
// 数值（秒）
reportData(metric); // 上报数据});
// 采集 INP
getINP((metric) => {console.log('INP：', metric.value); 
// 数值（毫秒）
reportData(metric);});// 采集 CLS
getCLS((metric) => {console.log('CLS：', metric.value); // 数值reportData(metric);});
\`\`\`

- **基础性能指标（FCP/TTI/TTFB）**：
  - 通过 \`Performance API\` 采集：
  - js

  \`\`\`javascript
  \`\`\`

// 页面加载完成后采集 window.addEventListener('load', () => {const perfData = performance.getEntriesByType('navigation')[0];const metrics = {fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0, // FCP（毫秒）tti: perfData.interactiveTime || 0, // TTI（毫秒）ttfb: perfData.responseStart - perfData.requestStart, // TTFB（毫秒）loadTime: perfData.loadEventEnd - perfData.navigationStart, // 页面加载总时间};reportData(metrics);});

\`\`\`

- **自定义指标（如接口耗时、组件渲染耗时）**：
	- 接口耗时：拦截 \`fetch\`/\`axios\`，记录请求开始 / 结束时间；
	- js
	\`\`\`javascript
// 拦截 fetchconst originalFetch = window.fetch;window.fetch = async (...args) => {const startTime = Date.now();const response = await originalFetch(...args);const endTime = Date.now();// 采集接口耗时const apiMetric = {url: args[0],duration: endTime - startTime, // 耗时（毫秒）status: response.status,};reportData(apiMetric);return response;};
\`\`\`

\`\`\`
- 组件渲染耗时：在组件挂载前后记录时间（Vue/React 生命周期）；
- vue
\`\`\`
\`\`\`

<script setup>
import { onMounted } from 'vue';
const startTime = Date.now();
onMounted(() => {
  const renderTime = Date.now() - startTime; // 组件渲染耗时
  reportData({ component: 'Home', renderTime });
});
<\/script>

\`\`\`

##### 异常数据采集

- JS 错误：监听 \`error\`/\`unhandledrejection\` 事件；

- 资源加载失败：监听 \`performance\` 事件，筛选失败的资源；

\`\`\`javascript
// 1. 捕获JS执行错误（ 
  captureJSError() {
    // 同步错误
    window.onerror = (message, source, lineno, colno, error) => {
      // 过滤忽略的错误
      if (this.options.ignoreErrors.some(reg => reg.test(message))) return;
      // 构建错误信息
      const errorInfo = this.buildErrorInfo({
        type: 'js_error',
        message: error?.message || message,
        stack: this.formatStack(error?.stack), // 格式化堆栈（sourcemap还原）
        source,
        lineno,
        colno
      });
      this.addToQueue(errorInfo);
      // 返回true阻止浏览器默认处理
      return true;
    };

    // 异步Promise错误
    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault(); // 阻止控制台报错
      const reason = e.reason;
      const errorInfo = this.buildErrorInfo({
        type: 'promise_error',
        message: reason?.message || 'Promise rejection',
        stack: this.formatStack(reason?.stack),
        promise: true
      });
      this.addToQueue(errorInfo);
    });
  }

  // 2. 捕获资源加载错误 
  captureResourceError() {
    // 捕获静态资源加载错误（捕获阶段）
    document.addEventListener('error', (e) => {
      const target = e.target;
      const resourceType = target.tagName.toLowerCase();
      // 过滤非资源错误（如DOM元素错误）
      if (!['img', 'script', 'link', 'iframe'].includes(resourceType)) return;
      // 过滤忽略的资源
      if (this.options.ignoreErrors.some(reg => reg.test(target.src || target.href))) return;

      const errorInfo = this.buildErrorInfo({
        type: 'resource_error',
        resourceType,
        url: target.src || target.href,
        message: \`Resource load failed: \${resourceType}\`
      });
      this.addToQueue(errorInfo);
    }, true); // 捕获阶段执行，优先于冒泡
  }

  // 3. 捕获接口请求错误（如需）
  captureRequestError() {
    // 重写fetch
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url, config = {}] = args;
      // 记录请求信息（面包屑）
      this.addBreadcrumb({
        type: 'request',
        url,
        method: config.method || 'GET',
        timestamp: Date.now()
      });
      try {
        const response = await originalFetch(...args);
        // 捕获4xx/5xx错误
        if (!response.ok) {
          const errorInfo = this.buildErrorInfo({
            type: 'request_error',
            url,
            method: config.method || 'GET',
            status: response.status,
            statusText: response.statusText,
            message: \`Request failed: \${response.status}\`
          });
          this.addToQueue(errorInfo);
        }
        return response;
      } catch (error) {
        // 捕获网络错误（如断网、跨域）
        const errorInfo = this.buildErrorInfo({
          type: 'request_error',
          url,
          method: config.method || 'GET',
          status: 0,
          message: \`Network error: \${error.message}\`
        });
        this.addToQueue(errorInfo);
        throw error;
      }
    };

    // 重写XMLHttpRequest（兼容老项目）
    const originalXhrOpen = XMLHttpRequest.prototype.open;
    const originalXhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url) {
      this._requestInfo = { method, url, timestamp: Date.now() };
      originalXhrOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function (data) {
      this.addEventListener('load', () => {
        if (this.status < 200 || this.status >= 400) {
          const errorInfo = this.buildErrorInfo({
            type: 'request_error',
            url: this._requestInfo.url,
            method: this._requestInfo.method,
            status: this.status,
            message: \`XHR failed: \${this.status}\`
          });
          this.addToQueue(errorInfo);
        }
      });
      this.addEventListener('error', () => {
        const errorInfo = this.buildErrorInfo({
          type: 'request_error',
          url: this._requestInfo.url,
          method: this._requestInfo.method,
          status: 0,
          message: 'XHR network error'
        });
        this.addToQueue(errorInfo);
      });
      originalXhrSend.apply(this, arguments);
    };
  }

  // 4. 捕获Vue错误（如需）
  captureVueError(app) {
    if (!app) return;
    app.config.errorHandler = (err, instance, info) => {
      const errorInfo = this.buildErrorInfo({
        type: 'vue_error',
        message: err.message,
        stack: this.formatStack(err.stack),
        component: instance?.type?.name || 'unknown', // 组件名称
        info, // Vue错误信息（如生命周期、指令）
        route: instance?.$route?.fullPath || '' // 当前路由
      });
      this.addToQueue(errorInfo);
    };
  }

  // 构建错误基础信息（大厂通用上下文）
  buildErrorInfo(customInfo) {
    // 通用上下文（阿里/快手必采集）
    const baseInfo = {
      appId: this.options.appId,
      userId: localStorage.getItem('userId') || 'anonymous', // 用户ID
      device: {
        ua: navigator.userAgent,
        screen: \`\${screen.width}x\${screen.height}\`,
        network: navigator.connection?.effectiveType || 'unknown', // 网络类型（4G/5G/WiFi）
        os: this.getOS() // 操作系统
      },
      page: {
        url: window.location.href,
        referrer: document.referrer,
        route: window.location.hash || window.location.pathname
      },
      timestamp: Date.now(),
      breadcrumbs: [...this.breadcrumbs], // 行为面包屑（还原操作路径）
      version: this.options.version || '1.0.0' // 应用版本
    };
    return { ...baseInfo, ...customInfo };
  }

   

   

  // 辅助方法：格式化错误堆栈（sourcemap还原，阿里方案）
  formatStack(stack) {
    if (!stack) return '';
    // 生产环境通过sourcemap还原真实代码位置（需服务端配合）
    // 开发环境直接返回原始堆栈
    return stack;
  }

  // 辅助方法：获取操作系统
  getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  
  // 上报队列（ ）
  async reportQueue() {
    if (this.queue.length === 0) return;
    const reportData = this.queue.splice(0, this.queue.length); // 取出所有待上报数据
    // 采样（高流量场景降采样）
    if (Math.random() > this.options.sampleRate) return;

    try {
      // 优先使用sendBeacon（页面卸载时也能上报）
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          this.options.reportUrl,
          JSON.stringify(reportData)
        );
      } else {
        // 降级使用fetch（keepalive保证页面卸载时完成）
        await fetch(this.options.reportUrl, {
          method: 'POST',
          body: JSON.stringify(reportData),
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          credentials: 'include'
        });
      }
    } catch (error) {
      // 上报失败：缓存到localStorage，下次页面加载时重试
      const cacheKey = \`error_monitor_cache_\${this.options.appId}\`;
      const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
      cached.push(...reportData);
      localStorage.setItem(cacheKey, JSON.stringify(cached));
    }
  }

  // 页面卸载时兜底上报（ ）
  registerUnloadHandler() {
    window.addEventListener('beforeunload', () => {
      this.reportQueue(); // 触发上报
    });

    // 初始化时检查缓存的失败上报数据，重试上报
    const cacheKey = \`error_monitor_cache_\${this.options.appId}\`;
    const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
    if (cached.length > 0) {
      this.queue = [...cached, ...this.queue];
      localStorage.removeItem(cacheKey);
      this.reportQueue();
    }
  }

  // 手动上报业务错误（阿里/快手通用）
  reportCustomError(errorInfo) {
    const formattedError = this.buildErrorInfo({
      type: 'custom_error',
      ...errorInfo
    });
    this.addToQueue(formattedError);
  }
}

// 用法示例
const errorMonitor = new ErrorMonitor({
  appId: 'web_shop_001', // 业务线唯一标识
  reportUrl: 'https://api.example.com/error/report', // 上报接口
  sampleRate: 1, // 100%采样（生产环境高流量可设0.5）
  ignoreErrors: [/Script error\\.*/, /广告加载失败/], // 忽略的错误
  version: '1.2.0' // 应用版本
});
errorMonitor.init();
\`\`\`

#### 二、数据上报

1. **上报策略**

   - 批量上报：缓存数据，达到一定数量 / 时间后批量上报（减少请求数）；
   - 防抖上报：高频数据（如 CLS）防抖后上报；
   - 失败重试：上报失败时，缓存到 localStorage，下次页面加载时重试；
   - 避开首屏：首屏加载完成后再上报，避免占用首屏资源。
2. **上报方式**

   - 异步请求：用 \`fetch\`（\`keepalive: true\`）或 \`navigator.sendBeacon\`（页面卸载时仍能上报）；
   - js

   \`\`\`javascript
   \`\`\`

// 基础上报函数 function reportData(data) {// 添加通用信息（设备、浏览器、页面 URL）const reportData = {...data,url: window.location.href,userAgent: navigator.userAgent,timestamp: Date.now(),device: {width: window.innerWidth,height: window.innerHeight,},};// 页面卸载时用 sendBeacon 上报 if (document.visibilityState === 'hidden') {navigator.sendBeacon('/api/report', JSON.stringify(reportData));} else {// 普通场景用 fetch 异步上报 fetch('/api/report', {method: 'POST',body: JSON.stringify(reportData),headers: { 'Content-Type': 'application/json' },keepalive: true,});}}

\`\`\`

#### 三、数据存储与分析

1. **数据存储**
	- 服务端接收上报数据后，存储到时序数据库（如 InfluxDB、Prometheus）或关系型数据库（如 MySQL），便于按时间 / 维度查询；
	- 核心存储字段：指标名称、数值、时间戳、页面 URL、用户设备、浏览器版本。

2. **数据分析**
	- 维度分析：按页面、设备（移动端 / PC）、浏览器、地区分析性能指标；
	- 趋势分析：监控指标随时间的变化（如 LCP 均值 / 中位数、95 分位值）；
	- 异常分析：识别异常值（如接口耗时 > 5s、LCP > 4s），定位高频错误 / 慢接口；
	- 聚合计算：计算均值、中位数、95 分位值（更能反映用户真实体验）。

3. **可视化与告警**
	- 可视化：用 Grafana/DataV/ECharts 制作仪表盘，展示核心指标趋势、Top 慢页面、错误率；
	- 告警：设置阈值（如 LCP > 4s 占比 > 10%、JS 错误率 > 5%），触发告警（邮件 / 钉钉 / 企业微信）。

#### 四、常用监控工具

1. **开源方案**：
	- \`web-vitals\`：采集核心 Web 指标；
	- \`Sentry\`：监控 JS 错误、性能指标，支持告警；
	- \`Fundebug\`：专注前端监控，支持性能 / 错误 / 接口监控；

2. **商用方案**：
	- 阿里云 ARMS、腾讯云前端性能监控、百度统计、GrowingIO。`;export{n as default};
