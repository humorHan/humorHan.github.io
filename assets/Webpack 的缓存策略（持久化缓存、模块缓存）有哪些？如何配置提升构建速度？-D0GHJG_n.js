const n=`### 22. Webpack 的缓存策略（持久化缓存、模块缓存）有哪些？如何配置提升构建速度？
	**答：**
	#### 一、Webpack 核心缓存策略
	##### 1. 模块缓存（内存缓存）
	- **核心**：Webpack 内置的模块缓存，将已解析的模块存入内存，避免重复解析；
	- **配置**：默认开启，可通过 \`cache.type: 'memory'\` 显式配置。
	##### 2. 持久化缓存（硬盘缓存）
	- **核心**：将编译结果缓存到硬盘，下次构建直接复用，大幅提升二次构建速度；
	- **配置**
	\`\`\`javascript
// webpack.config.js
module.exports = {
  cache: {
    type: 'filesystem', // 硬盘缓存
    buildDependencies: {
      config: [__filename] // 配置文件变更时清空缓存
    },
    cacheDirectory: path.resolve(__dirname, '.webpack-cache'), // 缓存目录
    hashAlgorithm: 'md4' // 哈希算法（更快）
  }
\`\`\`\`

\`\`\`\`
##### 3. Loader 缓存
- **核心**：缓存 loader 处理后的结果，避免重复转换（如 babel-loader 处理 JS/TS）；
- **配置**：
\`\`\`yaml
\`\`\`\`

module: {
rules: [
{
test: /\\.js$/,
use: [
{
loader: 'babel-loader',
options: {
cacheDirectory: true // 开启 babel-loader 缓存
}
}
]
}
]
}

\`\`\`\`
	##### 4. 第三方库缓存（DllPlugin）
	- **核心**：将稳定的第三方库（如 Vue、React）提前打包为 DLL 文件，构建时直接引用，避免重复编译；
	- **配置**：需单独创建 \`webpack.dll.config.js\`，生成 DLL 文件后在主配置中引用。
	#### 二、缓存配置优化构建速度的核心要点
	1. **优先开启持久化缓存**：\`cache.type: 'filesystem'\` 是提升二次构建速度的核心；
	2. **配置缓存失效规则**：通过 \`buildDependencies\` 监听配置文件 / 依赖变更，避免缓存失效不及时；
	3. **开启 Loader 缓存**：对耗时的 loader（babel-loader、ts-loader）必开缓存；
	4. **排除动态文件**：对频繁变更的文件（如 mock 数据）不纳入缓存；
	5. **清理过期缓存**：定期清理 \`.webpack-cache\` 目录，避免缓存体积过大。`;export{n as default};
