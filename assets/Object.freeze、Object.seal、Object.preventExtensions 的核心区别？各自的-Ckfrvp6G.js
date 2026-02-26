const n=`### Object.freeze、Object.seal、Object.preventExtensions 的核心区别？各自的使用场景？

**答：**

#### （1）核心区别对比

#### （2）各自使用场景

- **Object.preventExtensions** 场景：需限制对象添加新属性，但允许修改 / 删除现有属性。示例：配置对象，防止误加无关属性，但需动态调整现有属性。
- javascript
- 运行

\`\`\`javascript
const config = { timeout: 1000 };Object.preventExtensions(config);
config.maxRetry = 3; // 无效（严格模式抛错）
config.timeout = 2000; // 有效delete config.timeout; // 有效
\`\`\`

- **Object.seal** 场景：需固定对象的属性名（不可添加 / 删除），但允许修改属性值。示例：系统核心配置，属性名不可变，但值可动态调整。
- javascript
- 运行

\`\`\`javascript
const sysConfig = { port: 8080, host: 'localhost' };Object.seal(sysConfig);
sysConfig.port = 3000; // 有效delete sysConfig.host; // 无效（严格模式抛错）
sysConfig.protocol = 'http'; // 无效
\`\`\`

- **Object.freeze** 场景：需完全冻结对象（属性不可添加 / 删除 / 修改），适用于常量对象。示例：枚举值、静态配置（如接口地址、状态码）。
- javascript
- 运行

\`\`\`javascript
const STATUS = Object.freeze({ SUCCESS: 200, ERROR: 500 });STATUS.SUCCESS = 201; // 无效（严格模式抛错）
\`\`\``;export{n as default};
