const n=`### 如何用 CSS 实现三角形？核心原理？扩展到其他形状（梯形 / 圆形）？

**答案**：

#### 三角形实现（以上三角为例）：

css

\`\`\`css
.triangle {width: 0;height: 0;border-width: 0 50px 50px 50px; /* 上边框0，左右下50px */border-style: solid;border-color: transparent transparent #000 transparent; /* 左右下透明，下边框黑色 */}
\`\`\`

#### 核心原理：

- 盒模型中，边框是梯形（宽高不为 0 时），宽高设为 0 后，边框变为三角形；
- 通过控制不同方向边框的宽度 / 颜色（transparent 透明），实现不同方向的三角形（上 / 下 / 左 / 右 / 对角线）。

#### 扩展形状：

1. **梯形**：保留宽 / 高度，仅设置部分边框：
2. css

\`\`\`css
.trapezoid {width: 50px;height: 0;border-width: 50px;border-style: solid;border-color: transparent transparent #000 transparent;}
\`\`\`

1. **圆形**：\`border-radius: 50%;\`（宽高相等）：
2. css

\`\`\`css
.circle {width: 100px;height: 100px;border-radius: 50%;background: #000;}
\`\`\`

1. **半圆**：\`border-radius\` 仅设置一半（如左上 + 右上 50%），宽高为 2:1：
2. css

\`\`\`css
.semicircle {width: 100px;height: 50px;border-radius: 50px 50px 0 0;background: #000;}
\`\`\``;export{n as default};
