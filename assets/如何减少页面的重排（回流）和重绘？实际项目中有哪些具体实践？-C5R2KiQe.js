const n=`### 4. 如何减少页面的重排（回流）和重绘？实际项目中有哪些具体实践？

**答案：**

#### 一、先理解重排 / 重绘

- **重排（回流，Reflow）**：DOM 结构 / 尺寸 / 位置变化，导致浏览器重新计算布局（耗时高）；
- **重绘（Repaint）**：元素样式（如颜色、背景）变化，不影响布局，仅重新绘制像素（耗时较低）；
- 关系：**重排必然触发重绘，重绘不一定触发重排**。

#### 二、核心优化原则

1. **减少触发重排 / 重绘的操作**；
2. **批量处理 DOM 操作**；
3. **脱离文档流后修改元素**；
4. **缓存布局属性读取**。

#### 三、实际项目具体实践

1. **批量修改 DOM**
   - 错误：多次单独修改 DOM（每次触发重排）：
   - js

   \`\`\`javascript
   \`\`\`

const list = document.getElementById('list');for (let i = 0; i < 100; i++) {
list.innerHTML += \`<li>\${i}</li>\`; // 每次循环触发重排}

\`\`\`
	- 正确：先拼接字符串 / 创建文档片段，再一次性插入：
	- js
	\`\`\`javascript
const list = document.getElementById('list');const fragment = document.createDocumentFragment();for (let i = 0; i < 100; i++) {const li = document.createElement('li');
  li.textContent = i;
  fragment.appendChild(li); // 文档片段脱离文档流，不触发重排}
list.appendChild(fragment); // 仅一次重排
\`\`\`

2. **脱离文档流修改元素**
   - 给元素设置 \`display: none\`（脱离文档流），修改完成后恢复：
   - js

   \`\`\`javascript
   \`\`\`

const box = document.getElementById('box');
box.style.display = 'none';
box.style.width = '200px';
box.style.height = '200px';
box.style.display = 'block'; // 仅一次重排

\`\`\`
	- 或使用 \`position: absolute/fixed\`（脱离普通流），修改尺寸 / 位置不影响其他元素。

3. **缓存布局属性（避免 “读写交替”）**
	- 错误：读写交替触发多次重排：
	- js
	\`\`\`javascript
const box = document.getElementById('box');for (let i = 0; i < 100; i++) {
  box.style.top = box.offsetTop + 1 + 'px'; // 读 offsetTop → 写 top，每次触发重排}
\`\`\`

\`\`\`
- 正确：先读取所有需要的属性，再批量修改：
- js
\`\`\`javascript
\`\`\`

const box = document.getElementById('box');let top = box.offsetTop; // 一次读取，缓存值 for (let i = 0; i < 100; i++) {
top += 1;}
box.style.top = top + 'px'; // 一次写入，仅一次重排

\`\`\`

4. **避免频繁操作样式**
	- 用 class 替代直接修改样式（一次修改多个样式，仅一次重排）：
	- js
	\`\`\`javascript
// 差：多次修改样式，多次重排
box.style.color = 'red';
box.style.fontSize = '16px';// 好：一次修改 class，仅一次重排
box.classList.add('active');
\`\`\`

5. **优化动画**
   - 动画元素使用 \`transform\` 和 \`opacity\`（仅触发合成层，不重排 / 重绘）：
   - css

   \`\`\`css
   \`\`\`

.animate {transition: transform 0.3s; /* transform 仅触发合成 */}.animate:hover {transform: translateX(10px); /* 无重排 */}

\`\`\`
	- 避免用 \`top/left\` 做动画（每次触发重排）。

6. **减少复杂选择器使用**
	- CSS 选择器匹配从右到左，避免深层嵌套（如 \`.parent .child .item\`），减少浏览器布局计算耗时。

7. **图片设置宽高**
	- 图片加载前指定宽高，避免加载完成后尺寸变化触发重排：
	- html
	- 预览
	\`\`\`html
<img src="image.jpg" width="800" height="600" alt="指定宽高">
\`\`\``;export{n as default};
