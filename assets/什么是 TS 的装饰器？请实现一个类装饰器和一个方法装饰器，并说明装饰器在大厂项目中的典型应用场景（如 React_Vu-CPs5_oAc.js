const n=`#### 什么是 TS 的装饰器？请实现一个类装饰器和一个方法装饰器，并说明装饰器在大厂项目中的典型应用场景（如 React/Vue 中）。

**答案**：装饰器是一种特殊类型的声明，可附加到类、方法、属性、参数上，用于扩展 / 修改其行为（TS 中需开启 \`experimentalDecorators\` 配置）。

1. **类装饰器实现**（扩展类属性 / 方法）：

typescript

\`\`\`typescript
// 类装饰器：给类添加创建时间属性function AddCreateTime(constructor: Function) {
  constructor.prototype.createTime = new Date();}@AddCreateTimeclass User {
  name: string;constructor(name: string) {this.name = name;}}const user = new User('张三');console.log(user.createTime); // 输出创建时间
\`\`\`

1. **方法装饰器实现**（拦截方法执行）：

typescript

\`\`\`typescript
// 方法装饰器：记录方法执行耗时function LogTime(target: any, methodName: string, descriptor: PropertyDescriptor) {const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {const start = Date.now();const result = originalMethod.apply(this, args);const end = Date.now();console.log(\`\${methodName} 执行耗时：\${end - start}ms\`);return result;};return descriptor;}class Calculator {@LogTimeadd(a: number, b: number) {return a + b;}}const calc = new Calculator();
calc.add(1, 2); // 输出：add 执行耗时：xxx ms
\`\`\`

**典型应用场景**：

- React：装饰器实现 \`@connect\`（Redux 连接组件）、\`@withRouter\`（路由高阶组件）；
- Vue3：装饰器实现 \`@Prop\`/\`@Watch\`（简化组件属性 / 监听声明）；
- 通用场景：日志记录、权限校验、性能监控、缓存装饰器。`;export{n as default};
