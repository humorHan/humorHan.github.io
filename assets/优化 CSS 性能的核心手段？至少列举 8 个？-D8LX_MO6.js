const n=`### 优化 CSS 性能的核心手段？至少列举 8 个？

**答案**：

1. **减少选择器复杂度**：避免深层嵌套（如 \`.a .b .c .d\` → 简化为 \`.d\`），降低选择器匹配耗时；
2. **避免通配符选择器**：\`*\` 会遍历所有元素，性能差；
3. **使用 CSS 简写**：如 \`margin: 0 10px\` 替代 \`margin-top:0; margin-right:10px;\`，减少代码量；
4. **压缩 CSS**：移除空格 / 注释 / 重复规则（用 cssnano/postcss）；
5. **拆分 CSS 文件**：按页面 / 模块拆分（如首页.css、商品页.css），按需加载；
6. **使用 CSS Sprites/iconfont**：减少图片 HTTP 请求；
7. **避免 @import**：\`@import\` 会阻塞 CSS 加载（改用 link 标签，并行加载）；
8. **减少回流 / 重绘**：

   - 避免频繁修改布局属性（width/height），优先修改 transform/opacity；
   - 批量修改样式（如通过 class 切换，而非逐个修改属性）；
   - 使用 \`will-change\` 提前告知浏览器元素即将变化（如 \`will-change: transform\`）；
9. **使用 CSS 变量**：减少重复样式，便于维护；
10. **移除无用 CSS**：用 purgecss 删除未使用的样式；
11. **内联关键 CSS**：首屏关键样式内联到 HTML（减少 HTTP 请求），非关键样式异步加载；
12. **避免****!important**：增加样式优先级计算复杂度，且难以覆盖。`;export{n as default};
