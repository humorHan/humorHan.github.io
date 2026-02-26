const n=`### 什么是 BigInt？解决了什么问题？使用注意事项？

**答案**：

#### 一、BigInt 核心定义

BigInt 是 ES11（2020）新增的基本数据类型，用于表示**任意精度的整数**，解决 Number 类型无法精确表示超大整数的问题。

#### 二、Number 的局限性

- Number 基于 64 位双精度浮点数存储，仅能精确表示 \`-2^53 + 1\` 到 \`2^53 - 1\`（即 \`Number.MIN_SAFE_INTEGER\` 到 \`Number.MAX_SAFE_INTEGER\`）；
- 超出该范围的整数，Number 会丢失精度：

js

\`\`\`javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991console.log(9007199254740992 === 9007199254740993); // true（精度丢失）
\`\`\`

#### 三、BigInt 的解决方式

1. **定义方式**：

   - 数字后加后缀 \`n\`：\`123n\`、\`9007199254740992n\`；
   - 通过 \`BigInt()\` 构造函数：\`BigInt(123)\`、\`BigInt("9007199254740992")\`；
2. **任意精度**：可精确表示超大整数，无精度丢失。

js

\`\`\`javascript
const bigNum1 = 9007199254740992n;const bigNum2 = 9007199254740993n;console.log(bigNum1 === bigNum2); // false（精确）console.log(bigNum1 + 1n === bigNum2); // true
\`\`\`

#### 四、使用注意事项

1. **不能与 Number 混合运算**：BigInt 与 Number 运算需显式转换，否则报错；

js

\`\`\`javascript
console.log(1n + 1); // 报错：Cannot mix BigInt and other typesconsole.log(1n + BigInt(1)); // 2n（正确）console.log(Number(1n) + 1); // 2（正确，注意精度）
\`\`\`

1. **不支持 Math 对象方法**：Math 的所有方法（如 Math.max、Math.sqrt）均不支持 BigInt；

js

\`\`\`javascript
console.log(Math.max(1n, 2n)); // 报错console.log(BigInt(Math.max(Number(1n), Number(2n)))); // 2n（间接实现）
\`\`\`

1. **比较运算兼容**：BigInt 与 Number 可进行相等 / 大小比较（值比较）；

js

\`\`\`javascript
console.log(1n == 1); // trueconsole.log(2n > 1); // trueconsole.log(3n === 3); // false（类型不同）
\`\`\`

1. **JSON 序列化 / 反序列化**：JSON 不原生支持 BigInt，序列化需手动转换；

js

\`\`\`javascript
const obj = { num: 123n };// 序列化：转为字符串const json = JSON.stringify(obj, (key, value) => 
  typeof value === "bigint" ? value.toString() : value
);// 反序列化：转回BigIntconst parsed = JSON.parse(json, (key, value) => 
  key === "num" ? BigInt(value) : value
);console.log(parsed.num); // 123n
\`\`\`

1. **类型判断**：\`typeof 123n\` 返回 \`"bigint"\`；

js

\`\`\`javascript
console.log(typeof 123n); // "bigint"console.log(Object.prototype.toString.call(123n)); // "[object BigInt]"
\`\`\`

#### 五、典型使用场景

1. 处理超大整数（如数据库主键、分布式 ID、区块链区块高度）；
2. 高精度计算（如金融计算、加密算法）；
3. 与后端交互时接收 / 返回超大整数（避免 Number 精度丢失）。`;export{n as default};
