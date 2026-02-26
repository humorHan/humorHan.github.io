const n=`### 37  flex 布局的主轴和侧轴是什么？如何切换？

答：flex 布局是基于**主轴 + 侧轴**的二维布局方式，两个轴相互垂直：

1. 主轴（main axis）：flex 子项**默认排列的方向轴**，默认是**水平方向（从左到右）**；
2. 侧轴（cross axis）：与主轴垂直的轴，默认是**垂直方向（从上到下）**。

切换主轴 / 侧轴的方式：给 flex 父容器设置 \`flex-direction\` 属性，对应取值及效果如下：

- \`flex-direction: row\`：默认值，主轴水平从左到右，侧轴垂直从上到下；
- \`flex-direction: row-reverse\`：主轴水平从右到左，侧轴不变；
- \`flex-direction: column\`：主轴改为垂直从上到下，侧轴改为水平从左到右；
- \`flex-direction: column-reverse\`：主轴垂直从下到上，侧轴不变。

> 补充考点：主轴 / 侧轴切换后，\`justify-content\`（主轴对齐）、\`align-items\`（侧轴对齐）的作用方向也会跟着切换。

---`;export{n as default};
