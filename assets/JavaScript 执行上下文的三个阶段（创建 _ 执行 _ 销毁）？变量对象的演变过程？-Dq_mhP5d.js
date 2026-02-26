const n=`### JavaScript 执行上下文的三个阶段（创建 / 执行 / 销毁）？变量对象的演变过程？

**答：**

#### （1）执行上下文的三个阶段

执行上下文（EC）是代码执行的环境，分为「全局执行上下文（GEC）」和「函数执行上下文（FEC）」，生命周期包含三个阶段：

#### （2）变量对象（VO）的演变过程

- **创建阶段（VO）**：抽象的「变量对象」，包含：

  1. 函数声明（FD）：优先挂载，覆盖同名变量；
  2. 变量声明（VD）：仅声明，值为 \`undefined\`；
  3. 全局上下文的 VO 是「全局对象（window）」，函数上下文的 VO 包含 \`arguments\`（未激活）。
- **执行阶段（VO → AO）**：变量对象转为「活动对象」，此时变量可被访问，执行赋值操作（如 \`var a = 1\` 完成赋值）；
- **销毁阶段**：函数 EC 销毁时，AO 被垃圾回收；全局 EC 的 VO（window）始终存在，直到页面关闭。

#### （3）示例

javascript

运行

\`\`\`javascript
// 全局执行上下文创建阶段：// VO = { a: undefined, fn: 函数引用 }var a = 1;function fn(b) {// 函数执行上下文创建阶段：// VO = { arguments: { 0: 2, length: 1 }, c: undefined }var c = 3;console.log(a + b + c);}fn(2); // 执行阶段：AO 赋值，输出 6
\`\`\``;export{n as default};
