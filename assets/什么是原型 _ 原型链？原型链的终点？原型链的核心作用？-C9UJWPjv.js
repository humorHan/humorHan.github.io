const o=`### 3. 什么是原型 / 原型链？原型链的终点？原型链的核心作用？

**答案**：

#### 1. 原型（Prototype）：

- 每个函数（除箭头函数）都有 \`prototype\` 属性（原型对象），原型对象包含该函数实例共享的属性 / 方法；
- 每个对象（除 \`null\`）都有 \`proto\` 属性（隐式原型），指向其构造函数的 \`prototype\`。

#### 2. 原型链（Prototype Chain）：

当访问对象的属性 / 方法时，若对象本身没有，则会通过 \`proto\` 向上查找其构造函数的原型对象，若原型对象也没有，则继续向上查找，直到找到或到达原型链终点，这个链式查找的过程就是原型链。

#### 3. 原型链的终点：

\`Object.prototype.proto === null\`，即 \`Object.prototype\` 是原型链的最终节点，其隐式原型为 \`null\`。

#### 4. 核心作用：

- **实现继承**：通过原型链共享属性 / 方法（如所有数组都能使用 \`Array.prototype.push\`）；
- **节省内存**：实例共享原型上的方法，无需每个实例都创建一遍；
- **动态扩展**：修改原型对象，所有实例都会生效（如给 \`Array.prototype\` 添加自定义方法）。

#### 示例：

js

\`\`\`javascript
function Person(name) {this.name = name;}// 原型上添加共享方法Person.prototype.sayHi = function() {console.log(\`Hi, \${this.name}\`);};const p1 = new Person("张三");const p2 = new Person("李四");

p1.sayHi(); // Hi, 张三（p1本身无sayHi，通过__proto__找到Person.prototype.sayHi）console.log(p1.__proto__ === Person.prototype); // trueconsole.log(Person.prototype.__proto__ === Object.prototype); // trueconsole.log(Object.prototype.__proto__); // null（原型链终点）
\`\`\``;export{o as default};
