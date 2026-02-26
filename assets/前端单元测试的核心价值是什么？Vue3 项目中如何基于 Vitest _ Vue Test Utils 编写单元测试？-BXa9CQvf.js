const t=`### 前端单元测试的核心价值是什么？Vue3 项目中如何基于 Vitest + Vue Test Utils 编写单元测试？

**答：**

#### 前端单元测试的核心价值

1. **质量保障**：提前发现代码逻辑错误，减少线上 Bug；
2. **重构安全**：重构代码后，通过测试用例验证功能是否正常，降低重构风险；
3. **文档补充**：测试用例可作为代码文档，清晰描述函数 / 组件的输入输出和预期行为；
4. **协作提效**：明确接口规范，减少团队协作中的沟通成本；
5. **覆盖度量化**：通过测试覆盖率，发现未覆盖的代码死角。

#### Vue3 + Vitest + Vue Test Utils 配置 & 编写步骤

1. **安装依赖**：

\`\`\`bash
pnpm add -D vitest @vue/test-utils jsdom @vitest/coverage-v8
\`\`\`

1. **配置 \\*\\***vite.config.ts\\*\\*：

\`\`\`typescript
import { defineConfig } from 'vite'import vue from '@vitejs/plugin-vue'export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // 模拟浏览器环境
    globals: true, // 全局使用 test/expect 等方法
    coverage: {
      reporter: ['text', 'html'] // 生成覆盖率报告}}})
\`\`\`

1. **编写组件测试用例（如 \\*\\***src/components/Button.test.ts\\***\\*）**：

\`\`\`typescript
import { mount } from '@vue/test-utils'import Button from './Button.vue'test('Button 组件渲染正常', () => {const wrapper = mount(Button, {
    props: { label: '测试按钮' }})// 断言组件渲染了正确的文本expect(wrapper.text()).toContain('测试按钮')})test('Button 点击事件触发', async () => {const onClick = vi.fn() // Vitest 模拟函数const wrapper = mount(Button, {
    props: { onClick, label: '测试按钮' }})// 模拟点击await wrapper.trigger('click')// 断言点击事件被调用expect(onClick).toHaveBeenCalled()})
\`\`\`

1. **配置测试脚本（\\*\\***package.json\\***\\*）**：
2. json

\`\`\`json
"scripts": {"test": "vitest","test:coverage": "vitest run --coverage"}
\`\`\`

1. **运行测试**：\`pnpm test\` 执行测试，\`pnpm test:coverage\` 生成覆盖率报告。`;export{t as default};
