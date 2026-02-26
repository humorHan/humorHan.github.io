const _=`#### 请实现一个类型工具 \`Merge<T, U>\`，将两个对象类型 T 和 U 合并，若存在相同属性，U 的属性类型覆盖 T 的类型（阿里 / 美团高频）。

**答案**：

\`\`\`typescript
type Merge<T, U> = {// 遍历 T 和 U 的所有属性[K in keyof T | keyof U]: 
    // 优先取 U 的属性类型，再取 T 的K extends keyof U 
      ? U[K] 
      : (K extends keyof T ? T[K] : never);};// 测试type A = { a: number; b: string };type B = { b: boolean; c: null };type Merged = Merge<A, B>;// Merged 类型：{ a: number; b: boolean; c: null }（b 的类型被 B 覆盖）
\`\`\``;export{_ as default};
