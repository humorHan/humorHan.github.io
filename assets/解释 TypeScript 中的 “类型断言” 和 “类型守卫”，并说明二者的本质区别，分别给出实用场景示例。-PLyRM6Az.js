const e=`#### 解释 TypeScript 中的 “类型断言” 和 “类型守卫”，并说明二者的本质区别，分别给出实用场景示例。

**答案**：

**示例 1：类型断言**

\`\`\`typescript
// 场景：DOM 元素获取（编译器无法确定元素类型）const el = document.getElementById('input') as HTMLInputElement;
el.value = 'hello'; // 断言为输入框类型，可访问 value 属性
\`\`\`

**示例 2：类型守卫**

\`\`\`typescript
// 场景：判断接口返回值类型interface SuccessRes { code: 200; data: any }interface ErrorRes { code: 500; msg: string }type Res = SuccessRes | ErrorRes;// 自定义类型守卫function isSuccess(res: Res): res is SuccessRes {return res.code === 200;}function handleRes(res: Res) {if (isSuccess(res)) {console.log(res.data); // 收窄为 SuccessRes} else {console.log(res.msg); // 收窄为 ErrorRes}}
\`\`\``;export{e as default};
