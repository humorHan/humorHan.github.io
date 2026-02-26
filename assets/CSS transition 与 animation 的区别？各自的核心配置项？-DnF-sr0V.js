const n=`### CSS transition 与 animation 的区别？各自的核心配置项？

**答案**：

#### transition 核心配置项：

css

\`\`\`css
/* 简写：transition: 属性 时长 缓动 延迟; */.box {transition: all 0.3s ease 0.1s;/* 拆分 */transition-property: all; /* 过渡的属性（如width/color/all） */transition-duration: 0.3s; /* 过渡时长（必填，否则无效） */transition-timing-function: ease; /* 缓动函数（ease/linear/ease-in等） */transition-delay: 0.1s; /* 延迟执行 */}
\`\`\`

#### animation 核心配置项：

css

\`\`\`css
/* 定义关键帧 */@keyframes move {0% { transform: translateX(0); }50% { transform: translateX(100px); }100% { transform: translateX(0); }}/* 简写：animation: 名称 时长 缓动 延迟 循环 方向 填充模式; */.box {animation: move 2s linear 0.1s infinite alternate forwards;/* 拆分 */animation-name: move; /* 关键帧名称 */animation-duration: 2s; /* 动画时长（必填） */animation-timing-function: linear; /* 缓动函数 */animation-delay: 0.1s; /* 延迟执行 */animation-iteration-count: infinite; /* 循环次数（infinite无限） */animation-direction: alternate; /* 动画方向（normal/alternate反向） */animation-fill-mode: forwards; /* 填充模式（forwards保留最后状态） */animation-play-state: running; /* 播放状态（running/paused） */}
\`\`\``;export{n as default};
