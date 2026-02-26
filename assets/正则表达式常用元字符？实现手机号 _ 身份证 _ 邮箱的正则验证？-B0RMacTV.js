const n=`### 正则表达式常用元字符？实现手机号 / 身份证 / 邮箱的正则验证？

**答案**：

#### 一、常用元字符（按功能分类）

#### 二、高频正则验证（附测试示例）

##### 手机号验证（中国大陆）

- 规则：11 位数字，以 1 开头，第二位为 3-9（13/14/15/16/17/18/19 段）

js

\`\`\`javascript
const phoneReg = /^1[3-9]\\d{9}$/;// 测试console.log(phoneReg.test("13812345678")); // trueconsole.log(phoneReg.test("12812345678")); // false（第二位非法）console.log(phoneReg.test("1381234567")); // false（长度不足）
\`\`\`

##### 身份证号验证（中国大陆 18 位）

- 规则：17 位数字 + 最后 1 位（数字 / X/x），前 6 位为地址码，8 位出生日期，3 位顺序码，1 位校验码

js

\`\`\`javascript
const idCardReg = /^[1-9]\\d{5}(19|20)\\d{2}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\\d)|(3[0-1]))\\d{3}[\\dXx]$/;// 测试console.log(idCardReg.test("110101199001011234")); // trueconsole.log(idCardReg.test("11010119900101123X")); // trueconsole.log(idCardReg.test("11010199001011234")); // false（长度不足）
\`\`\`

##### 邮箱验证

- 规则：用户名 @ 域名，用户名含字母 / 数字 / 下划线 / 点 / 减号，域名为多级（如 [xxx.com/xxx.cn.net](https://xxx.com/xxx.cn.net)）

js

\`\`\`javascript
const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;// 测试console.log(emailReg.test("test@163.com")); // trueconsole.log(emailReg.test("test.123@qq.com.cn")); // trueconsole.log(emailReg.test("test@com")); // false（域名后缀长度不足）
\`\`\``;export{n as default};
