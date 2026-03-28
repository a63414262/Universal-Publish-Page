🚀 Universal Publish Page (Cloudflare Workers Edition)
一个基于 Cloudflare Workers + KV 的极致轻量化、可视化永久发布页系统。
✨ 项目特性 (Features)

    ⚡ 零成本托管：完全运行在 Cloudflare Workers 上，无需购买服务器，全球 CDN 加速。

    🎨 可视化后台：无需修改代码，直接通过 /admin 后台修改链接、标题、公告和样式。

    👗 高清动态背景：内置 5 重随机美女图片 API 源，支持自动重试逻辑，告别黑屏。

    🕶️ 现代视觉设计：1:1 复刻主流发布页 UI，支持毛玻璃 (Glassmorphism) 特效。

    📏 高度自定义：后台支持动态调节容器宽度和整体缩放比例，完美适配各类背景。

    📊 访问统计：内置简单的全局访问计数器，实时掌握流量情况。

🛠️ 快速部署 (Quick Start)
1. 创建 Worker

登录 Cloudflare Dashboard，进入 Workers & Pages，点击 Create Application -> Create Worker。

2. 配置 KV 数据库 (必须)

    在左侧菜单进入 Workers & Pages -> KV。

    点击 Create a namespace，名称随意（如 SITE_DB）。

    回到你新建的 Worker 页面，点击 Settings -> Variables。

    在 KV Namespace Bindings 中点击 Add binding：

        Variable name: 必须填 KV

        KV namespace: 选择你刚才创建的命名空间。

3. 部署代码

    点击 Edit Code，将 worker.js 中的代码全部替换为本项目提供的通用版代码。

    修改密钥：找到代码顶部的 const ADMIN_TOKEN = "..."，将其修改为你专属的后台管理密码。

    点击 Save and Deploy。

🔧 后台管理 (Management)

    后台地址：你的域名/admin

    默认密码：即你在代码中设置的 ADMIN_TOKEN。

    功能模块：

        容器缩放：调节发布页在网页上的显示大小。

        公告编辑：支持 HTML 标签（如 <b>, <br>, <a>）。

        链接管理：支持自定义颜色、备注、URL。

📸 预览说明 (Visuals)

    背景逻辑：每次刷新页面都会从多源 API 随机抓取一张高清美女图片。

    容错处理：如果主 API 加载缓慢，系统会自动轮询备用 API，确保背景始终能够显示。

⚠️ 免责声明 (Disclaimer)

本项目仅供技术交流与个人学习使用。背景图片均来自第三方公开 API，项目本身不存储任何图片资源。请遵守当地法律法规，切勿用于非法用途。
🤝 贡献与反馈

如果你有更好的建议或发现了 BUG，欢迎随时提出！
