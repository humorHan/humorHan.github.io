const n=`#### TypeScript 中 \`readonly\` 和 \`const\` 的区别是什么？分别作用于哪些场景？如何让一个对象的属性既不可修改也不可新增？

**答案**：

**示例**：

\`\`\`typescript
// const：变量不可重赋值，但对象属性可修改const obj = { a: 1 };
obj.a = 2; // 合法// obj = { b: 2 }; // 报错（变量不可重赋值）// readonly：对象属性不可修改（类型层面）type ReadonlyObj = { readonly a: number };const ro: ReadonlyObj = { a: 1 };// ro.a = 2; // 报错（属性只读）
\`\`\`

**让对象既不可修改也不可新增的方案**：

\`\`\`typescript
// 1. 类型层面：Readonly + 索引签名限制type ImmutableObj = {readonly [K in keyof any]?: never; // 禁止新增属性} & {readonly a: number;readonly b: string;};// 2. 时层面：Object.freeze（冻结对象）const obj = Object.freeze({ a: 1, b: '2' });
obj.a = 2; // 严格模式下报错，非严格模式下静默失败
obj.c = 3; // 同样失败
\`\`\``;export{n as default};
