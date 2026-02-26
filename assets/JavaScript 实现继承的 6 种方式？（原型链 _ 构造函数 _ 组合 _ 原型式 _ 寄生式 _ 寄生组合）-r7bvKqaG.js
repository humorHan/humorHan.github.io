const n=`### JavaScript 实现继承的 6 种方式？（原型链 / 构造函数 / 组合 / 原型式 / 寄生式 / 寄生组合）

**答案**：

#### 核心前提：

JS 继承的本质是**原型链的复用**，即子类原型指向父类实例 / 原型，从而共享父类属性和方法。

#### 6 种继承方式（按优劣排序）：

##### 原型链继承

**原理**：子类原型 = 父类实例，子类实例通过原型链访问父类属性 / 方法。

js

\`\`\`javascript
// 父类function Parent() {this.name = "父类";this.hobbies = ["读书", "运动"];}Parent.prototype.sayHi = function() {console.log(\`Hi, \${this.name}\`);};// 子类function Child() {}Child.prototype = new Parent(); // 核心：子类原型指向父类实例Child.prototype.constructor = Child; // 修正构造函数指向// 测试const c1 = new Child();const c2 = new Child();
c1.hobbies.push("听歌");console.log(c2.hobbies); // ["读书","运动","听歌"]（缺点：引用类型属性共享）
\`\`\`

**优点**：简单，共享父类原型方法；**缺点**：引用类型属性共享、无法向父类传参。

##### 构造函数继承

**原理**：子类构造函数中调用 \`Parent.call(this, 参数)\`，继承父类实例属性。

js

\`\`\`javascript
function Parent(name) {this.name = name;this.hobbies = ["读书", "运动"];}Parent.prototype.sayHi = function() {};function Child(name) {Parent.call(this, name); // 核心：调用父类构造函数，绑定this}// 测试const c1 = new Child("子类1");const c2 = new Child("子类2");
c1.hobbies.push("听歌");console.log(c2.hobbies); // ["读书","运动"]（解决引用类型共享）console.log(c1.sayHi); // undefined（缺点：无法继承父类原型方法）
\`\`\`

**优点**：可传参、引用类型属性独立；**缺点**：无法继承父类原型方法、方法重复创建。

##### 组合继承（原型链 + 构造函数）

**原理**：结合原型链继承（复用原型方法）和构造函数继承（独立实例属性）。

js

\`\`\`javascript
function Parent(name) {this.name = name;this.hobbies = ["读书", "运动"];}Parent.prototype.sayHi = function() {console.log(\`Hi, \${this.name}\`);};function Child(name, age) {Parent.call(this, name); // 构造函数继承：实例属性this.age = age;}Child.prototype = new Parent(); // 原型链继承：原型方法Child.prototype.constructor = Child;// 测试const c = new Child("子类", 18);
c.sayHi(); // Hi, 子类（继承原型方法）console.log(c.hobbies); // ["读书","运动"]（实例属性独立）
\`\`\`

**优点**：兼顾属性独立和方法复用；**缺点**：父类构造函数被调用两次（原型 + 子类），存在冗余属性。

##### 原型式继承

**原理**：基于已有对象创建新对象，复用对象属性（ES5 \`Object.create\` 的底层逻辑）。

js

\`\`\`javascript
function createObj(obj) {function F() {}F.prototype = obj;return new F();}// 测试const parent = { name: "父对象", sayHi: () => console.log("Hi") };const child = createObj(parent);console.log(child.name); // 父对象（继承属性）
\`\`\`

**优点**：无需定义构造函数；**缺点**：引用类型属性共享、无法传参。

##### 寄生式继承

**原理**：原型式继承基础上，增强新对象（添加自定义方法 / 属性）。

js

\`\`\`javascript
function createObj(obj) {const clone = Object.create(obj); // 原型式继承
  clone.sayAge = function() { // 增强对象console.log("年龄：18");};return clone;}// 测试const parent = { name: "父对象" };const child = createObj(parent);
child.sayAge(); // 年龄：18
\`\`\`

**优点**：灵活增强对象；**缺点**：方法重复创建、引用类型属性共享。

##### 寄生组合继承（最优方案）

**原理**：组合继承优化版，子类原型直接指向父类原型（避免父类构造函数重复调用）。

js

\`\`\`javascript
function Parent(name) {this.name = name;this.hobbies = ["读书", "运动"];}Parent.prototype.sayHi = function() {console.log(\`Hi, \${this.name}\`);};function Child(name, age) {Parent.call(this, name); // 仅调用一次父类构造函数this.age = age;}// 核心：子类原型 = 父类原型的浅拷贝（避免调用父类构造函数）Child.prototype = Object.create(Parent.prototype);Child.prototype.constructor = Child;// 测试const c = new Child("子类", 18);
c.sayHi(); // Hi, 子类console.log(c.hobbies); // ["读书","运动"]（独立）
\`\`\`

**优点**：无冗余属性、属性独立、方法复用；**缺点**：语法稍复杂（ES6 \`class extends\` 底层实现此方式）。

#### 补充：ES6 Class 继承（语法糖）

js

\`\`\`javascript
class Parent {constructor(name) {this.name = name;}sayHi() { console.log(\`Hi, \${this.name}\`); }}class Child extends Parent {constructor(name, age) {super(name); // 等价于Parent.call(this, name)this.age = age;}}const c = new Child("子类", 18);
c.sayHi(); // Hi, 子类
\`\`\``;export{n as default};
