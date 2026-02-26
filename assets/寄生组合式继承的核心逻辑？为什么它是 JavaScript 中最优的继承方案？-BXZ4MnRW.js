const n=`### 寄生组合式继承的核心逻辑？为什么它是 JavaScript 中最优的继承方案？

**答：**

#### （1）核心逻辑

寄生组合式继承结合了「原型链继承」和「构造函数继承」的优点，同时规避了两者的缺陷，核心步骤：

1. **构造函数继承属性**：子类构造函数中调用父类构造函数（\`Parent.call(this, ...args)\`），继承实例属性，避免属性共享；
2. **寄生式继承原型**：通过「寄生函数」创建父类原型的副本，赋值给子类原型，同时修正子类原型的 \`constructor\` 指向，避免重复创建父类实例（原型链继承的缺陷）。

#### （2）实现代码

javascript

运行

\`\`\`javascript
// 父类function Parent(name) {this.name = name;this.hobbies = ['reading'];}Parent.prototype.sayName = function () {console.log(this.name);};// 寄生函数：创建父类原型的副本function inheritPrototype(Child, Parent) {const prototype = Object.create(Parent.prototype); // 继承父类原型方法
  prototype.constructor = Child; // 修正 constructor 指向Child.prototype = prototype; // 赋值给子类原型}// 子类function Child(name, age) {Parent.call(this, name); // 继承实例属性this.age = age;}// 寄生式继承原型inheritPrototype(Child, Parent);// 子类原型方法Child.prototype.sayAge = function () {console.log(this.age);};// 验证const child1 = new Child('Tom', 18);
child1.hobbies.push('running');console.log(child1.hobbies); // ['reading', 'running']const child2 = new Child('Jerry', 16);console.log(child2.hobbies); // ['reading']（属性不共享）
child1.sayName(); // Tom（继承原型方法）
\`\`\`

#### （3）为何是最优方案

- 规避原型链继承的缺陷：实例属性不共享（每个子类实例有独立属性）；
- 规避构造函数继承的缺陷：子类能继承父类原型方法（无需重复定义）；
- 原型链完整：\`instanceof\` 和 \`isPrototypeOf\` 能正常工作；
- 性能最优：仅创建一次父类原型副本，避免多余的父类实例属性挂载到子类原型。`;export{n as default};
