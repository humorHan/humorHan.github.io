const t=`### 本地存储（localStorage/indexedDB 等）的性能优化要点是什么？如何避免滥用？

**答案：**本地存储优化核心是 “高效使用存储空间、减少读写耗时、避免阻塞主线程、防止滥用导致性能 / 安全问题”，核心要点如下：

#### 一、性能优化要点

1. **选择合适的存储方案**
2. **优化读写性能**

   - 避免同步存储阻塞主线程：
     - localStorage 是同步 API，读写大数据会阻塞主线程（导致页面卡顿），仅用于小数据（<10KB）；
     - 大体积数据用 IndexedDB（异步），或用 Web Worker 处理 localStorage 读写；
   - 批量读写：
     - 避免频繁单次读写（如循环中调用 \`localStorage.setItem\`），批量拼接数据后一次写入；
     - 示例：
     - js

     \`\`\`javascript
     \`\`\`

// 差：频繁单次写入 for (let i = 0; i < 100; i++) {localStorage.setItem(\`key_\${i}\`, i);}// 好：批量写入 const data = {};for (let i = 0; i < 100; i++) {
data[\`key_\${i}\`] = i;}localStorage.setItem('batch_data', JSON.stringify(data));

\`\`\`
	- 缓存存储结果：
		- 读取本地存储后，缓存到内存变量中，避免重复读取；
		- 示例：
		- js
		\`\`\`javascript
let userConfig = null;// 仅首次读取本地存储function getUserConfig() {if (!userConfig) {
    userConfig = JSON.parse(localStorage.getItem('userConfig') || '{}');}return userConfig;}
\`\`\`

2. **数据序列化优化**
   - localStorage 仅支持字符串存储，使用 \`JSON.stringify/parse\` 序列化对象，避免冗余字段；
   - 大体积数据可使用压缩库（如 \`lz-string\`）压缩后存储，减少体积；
   - js

   \`\`\`javascript
   \`\`\`

import lzstring from 'lz-string';// 压缩后存储 const compressed = lzstring.compress(JSON.stringify(bigData));localStorage.setItem('big_data', compressed);// 读取时解压 const data = JSON.parse(lzstring.decompress(localStorage.getItem('big_data')));

\`\`\`

#### 二、避免滥用本地存储

1. **控制存储体积**
	- 不存储超大数据：localStorage 单条数据建议 <100KB，总存储 <4MB（留有余量）；
	- 定期清理过期数据：设置数据过期时间，读取时校验，过期则删除；
	- js
	\`\`\`javascript
// 存储带过期时间的数据function setStorageWithExpire(key, value, expire = 86400000) {const data = {
    value,expire: Date.now() + expire, // 过期时间（毫秒）};localStorage.setItem(key, JSON.stringify(data));}// 读取并校验过期function getStorageWithExpire(key) {const str = localStorage.getItem(key);if (!str) return null;const data = JSON.parse(str);if (Date.now() > data.expire) {localStorage.removeItem(key); // 过期删除return null;}return data.value;}
\`\`\`

2. **避免存储敏感数据**
   - 不存储密码、token（长期）、银行卡号等敏感数据：localStorage 易被 XSS 攻击窃取，敏感数据建议用 Cookie（设置 \`httpOnly\`）或服务端存储；
   - 示例：token 存储到 Cookie，设置安全属性：
   - js

   \`\`\`javascript
   \`\`\`

document.cookie = 'token=xxx; httpOnly; secure; sameSite=Strict';

\`\`\`

3. **避免频繁修改触发性能问题**
	- localStorage 修改会触发 \`storage\` 事件，频繁修改会导致监听该事件的页面频繁执行回调；
	- 非必要不监听 \`storage\` 事件，或对回调函数防抖。

4. **避免内存泄漏**
	- 读取大体积数据后，及时释放内存变量（如 \`bigData = null\`）；
	- IndexedDB 操作完成后，关闭数据库连接，避免资源占用。

5. **兼容处理**
	- 部分浏览器 / 环境可能禁用本地存储（如隐私模式），读写前先检测：
	- js
	\`\`\`javascript
function isLocalStorageAvailable() {try {const key = '__test_local_storage__';localStorage.setItem(key, key);localStorage.removeItem(key);return true;} catch (e) {return false;}}
\`\`\``;export{t as default};
