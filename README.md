# 🌸 Sakura Dream · 个人博客

一个二次元风格的 GitHub Pages 个人博客，包含 5 个功能选项卡。

## 🎨 特性

- **🌸 樱花飘落动画** — 页面加载后自动飘落樱花花瓣
- **✨ 5 个选项卡** — 主页、文章、项目、相册、关于
- **🎭 二次元风格设计** — 粉紫渐变色、毛玻璃卡片、柔和阴影
- **📝 打字机效果** — 主页动态切换文案
- **🖼️ 相册灯箱** — 点击图片放大查看
- **📱 完全响应式** — 适配手机、平板和桌面

## 📂 项目结构

```
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件（二次元主题）
├── js/
│   └── main.js         # 交互脚本
├── README.md
└── _config.yml         # GitHub Pages 配置
```

## 🚀 部署到 GitHub Pages

1. 在 GitHub 创建一个仓库，命名为 `你的用户名.github.io`
2. 将本项目的文件推送到该仓库的 `main` 分支
3. 在仓库 Settings → Pages 中，选择 `main` 分支的 `/` (root) 作为源
4. 等待几分钟，访问 `https://你的用户名.github.io` 即可

### 或者使用 gh-pages 分支

```bash
git checkout -b gh-pages
git push origin gh-pages
```

然后在仓库 Settings → Pages 中，选择 `gh-pages` 分支。

## 🛠️ 自定义

- **修改个人信息**：编辑 `index.html` 中的名称、描述、社交链接
- **修改颜色主题**：编辑 `css/style.css` 中的 `:root` 变量
- **添加文章**：在 `index.html` 的 `<section id="blog">` 中添加新的 `article` 卡片
- **添加项目**：在 `index.html` 的 `<section id="projects">` 中添加新的 `project-card`
- **修改头像**：替换 hero 区域的 `🌸` 为你的头像图片

## 📄 许可

MIT License © 2026 Camelia
