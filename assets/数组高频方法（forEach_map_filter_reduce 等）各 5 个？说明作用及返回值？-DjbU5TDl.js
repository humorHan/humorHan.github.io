const r=`### 14. 数组高频方法（forEach/map/filter/reduce 等）各 5 个？说明作用及返回值？

**答案**：

#### 数组高频方法（按用途分类）：

##### 1. 遍历类（无返回值 / 返回新数组）

##### 2. 聚合类（返回单一值）

##### 3. 修改类（改变原数组）

##### 4. 其他高频方法

#### 核心示例：

js

\`\`\`javascript
// map：数组元素翻倍const arr = [1, 2, 3];const newArr = arr.map(v => v * 2); // [2,4,6]// filter：筛选偶数const evenArr = arr.filter(v => v % 2 === 0); // [2]// reduce：求和const sum = arr.reduce((prev, curr) => prev + curr, 0); // 6// find：查找大于1的元素const item = arr.find(v => v > 1); // 2// splice：删除索引1的元素
arr.splice(1, 1); // arr变为[1,3]
\`\`\``;export{r as default};
