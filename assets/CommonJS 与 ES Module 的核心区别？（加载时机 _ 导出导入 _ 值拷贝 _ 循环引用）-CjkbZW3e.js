const n=`### CommonJS 与 ES Module 的核心区别？（加载时机 / 导出导入 / 值拷贝 / 循环引用）

**答案**：

#### 核心区别对比表：

#### 详细说明：

##### 加载时机

- **CommonJS**：\`require()\` 在运行时执行，可写在任意位置（如 if 语句内），动态加载模块；
- js

\`\`\`javascript
// 合法（动态加载）if (true) {const fs = require("fs");}
\`\`\`

- **ES Module**：\`import\` 在编译阶段（代码执行前）解析，必须写在模块顶层；动态导入需用 \`import()\`（返回 Promise）；
- js

\`\`\`javascript
// 非法（import不能在条件内）if (true) {import fs from "fs";}// 合法（动态导入）if (true) {import("fs").then(fs => {});}
\`\`\`

##### 导出导入规则

- **CommonJS**：

  - 导出：\`module.exports\` 是真正的导出对象，\`exports\` 是 \`module.exports\` 的引用（不可直接赋值 \`exports = {}\`）；
  - 导入：\`require()\` 返回 \`module.exports\` 的拷贝；
- js

\`\`\`javascript
// 导出
exports.name = "张三";
module.exports.age = 18;// 导入const obj = require("./module.js");
\`\`\`

- **ES Module**：
  - 命名导出：\`export const name = "张三"\`，导入需 \`import { name } from "./module.js"\`；
  - 默认导出：\`export default { name: "张三" }\`，导入需 \`import obj from "./module.js"\`；
  - 导入的变量是只读的（不可修改 \`name = "李四"\`）；

##### 值的传递

- **CommonJS**：
- js

\`\`\`javascript
// moduleA.jslet count = 1;
exports.count = count;
exports.add = () => count++;// moduleB.jsconst { count, add } = require("./moduleA.js");console.log(count); // 1（值拷贝）add();console.log(count); // 1（拷贝值不变）
\`\`\`

- **ES Module**：
- js

\`\`\`javascript
// moduleA.jslet count = 1;export { count };export const add = () => count++;// moduleB.jsimport { count, add } from "./moduleA.js";console.log(count); // 1（只读引用）add();console.log(count); // 2（实时映射）
\`\`\`

##### 循环引用

- **CommonJS**：模块执行时缓存，循环引用返回已执行的部分（可能获取到未初始化的属性）；
- **ES Module**：编译时解析依赖，循环引用通过 “暂存区” 保存引用，确保能获取到完整模块。`;export{n as default};
