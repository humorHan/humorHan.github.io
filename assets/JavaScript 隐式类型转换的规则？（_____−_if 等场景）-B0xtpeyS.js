const n=`### JavaScript 隐式类型转换的规则？（==/+/−/if 等场景）

**答案**：

#### 核心原则：

JS 隐式类型转换的本质是 “将不同类型的值转为同一类型后操作”，转换优先级：\`Number > String > Boolean\`。

#### 一、相等运算符（==）的转换规则（=== 无转换）

1. **null/undefined**：\`null == undefined\` → true；与其他类型比较均为 false；
2. **数字与字符串**：字符串转数字（如 \`1 == "1"\` → true）；
3. **布尔值与其他类型**：布尔值转数字（true→1，false→0，如 \`true == 1\` → true）；
4. **对象与基本类型**：对象转基本类型（调用 \`valueOf()\` → \`toString()\`）；

js

\`\`\`javascript
// 示例console.log(null == undefined); // trueconsole.log(1 == "1"); // trueconsole.log(true == "1"); // true（true→1，"1"→1）console.log([] == 0); // true（[]→""→0）console.log({} == "[object Object]"); // true（{}→"[object Object]"）
\`\`\`

#### 二、算术运算符（+/-/*/÷）的转换规则

##### 加法（+）：特殊规则（字符串拼接优先）

- 若有一个操作数是字符串，另一个转为字符串，执行拼接；
- 否则，所有操作数转为数字，执行加法；

js

\`\`\`javascript
console.log(1 + "2"); // "12"（字符串拼接）console.log(1 + true); // 2（true→1）console.log([] + {}); // "[object Object]"（[]→""，{}→"[object Object]"）
\`\`\`

##### 减法 / 乘法 / 除法（-/*/÷）：统一转数字

- 所有操作数转为数字（无法转则为 NaN）；

js

\`\`\`javascript
console.log("5" - 2); // 3（"5"→5）console.log("5" - "2"); // 3console.log(true - false); // 1（1-0）console.log([] - 1); // -1（[]→0）
\`\`\`

#### 三、逻辑判断（if/&&/||/!）的转换规则

- 所有值转为布尔值（遵循 “假值列表”）；
- **假值**：\`false/0/""(空字符串)/null/undefined/NaN\`（共 6 个），其余均为真值；

js

\`\`\`javascript
if ([]); // 真值（执行）if({}); // 真值（执行）console.log(!!0); // falseconsole.log(!!" "); // true（空格字符串是真值）
\`\`\`

#### 四、对象转基本类型的规则

对象转基本类型时，依次调用：

1. \`valueOf()\`：优先返回原始值（如 Number 对象返回数字，Date 对象返回时间戳）；
2. \`toString()\`：若 \`valueOf()\` 返回对象，则调用 \`toString()\`（如数组返回逗号分隔字符串，普通对象返回 "[object Object]"）；

js

\`\`\`javascript
const obj = {valueOf() { return 10; },toString() { return 20; }};console.log(obj + 5); // 15（调用valueOf()）
\`\`\``;export{n as default};
