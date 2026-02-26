const n=`#### 如何在 TypeScript 中定义一个 “可索引类型”？请分别举例说明数字索引和字符串索引的使用场景，以及二者的约束关系。

**答案**：可索引类型用于定义 “通过索引访问的对象”（如数组、普通对象），支持两种索引签名：字符串索引（\`[key: string]: T\`）、数字索引（\`[index: number]: T\`）。

1. **数字索引（适用于数组 / 类数组）**：

\`\`\`typescript
// 定义数字索引类型：索引为数字，值为字符串interface StringArray {[index: number]: string;}const arr: StringArray = ['a', 'b', 'c'];console.log(arr[0]); // 合法，值为 string 类型
\`\`\`

1. **字符串索引（适用于普通对象）**：

\`\`\`typescript
// 定义字符串索引类型：索引为字符串，值为 numberinterface NumberDict {[key: string]: number;
  age: number; // 符合索引类型，合法// name: string; // 不符合索引类型，报错}const dict: NumberDict = { age: 18, score: 90 };console.log(dict['age']); // 合法
\`\`\`

**约束关系**：

- 若同时定义数字索引和字符串索引，**数字索引的类型必须是字符串索引类型的子类型**（因为 JS 中数字索引会被转换为字符串索引）；
- 示例：

\`\`\`typescript
interface MyObj {[index: number]: string; // 数字索引类型为 string[key: string]: string | number; // 字符串索引类型包含 string，合法}
\`\`\``;export{n as default};
