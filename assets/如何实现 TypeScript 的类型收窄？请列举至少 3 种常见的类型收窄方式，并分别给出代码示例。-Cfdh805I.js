const n=`#### 如何实现 TypeScript 的类型收窄？请列举至少 3 种常见的类型收窄方式，并分别给出代码示例。

**答案**：类型收窄是将宽泛类型（如联合类型）缩小为更具体类型的过程，常见方式：

1. **typeof 类型守卫**

\`\`\`typescript
function printValue(value: string | number) {if (typeof value === 'string') {console.log(value.length); // 收窄为 string 类型} else {console.log(value.toFixed(2)); // 收窄为 number 类型}}
\`\`\`

1. **instanceof 类型守卫**

\`\`\`typescript
class User {}class Admin extends User {}function checkUser(user: User | Admin) {if (user instanceof Admin) {console.log('是管理员'); // 收窄为 Admin 类型}}
\`\`\`

1. **自定义类型守卫**

\`\`\`typescript
interface Cat { meow: () => void }interface Dog { bark: () => void }function isCat(animal: Cat | Dog): animal is Cat {return (animal as Cat).meow !== undefined;}function play(animal: Cat | Dog) {if (isCat(animal)) {
    animal.meow(); // 收窄为 Cat 类型} else {
    animal.bark();}}
\`\`\`

（补充：还可通过字面量收窄、in 操作符收窄等）`;export{n as default};
