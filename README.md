# 云水山房 (YSSF)

> 山水间的诗意栖居 —— 坐落于西湖之畔的禅意民宿

## 项目简介

云水山房官网，基于 [Hexo](https://hexo.io/) 构建的静态站点，使用自定义主题 `yssf`，展示客房、庭院、美食及预订信息。

## 技术栈

- **框架**: Hexo 7.3.0
- **主题**: yssf（自定义主题，位于 `themes/yssf`）
- **模板引擎**: EJS / Pug / Stylus
- **部署**: hexo-deployer-git → GitHub Pages
- **包管理**: Yarn

## 站点结构

```
source/
├── _posts/          # 博客文章
├── 客房介绍/        # 客房详情页
├── 庭院介绍/        # 庭院景观
├── 关于/            # 关于云水山房
├── 留言预定/        # 留言与预订
├── 预订须知/        # 预订须知
├── 退订政策/        # 退订政策
├── 常见问题/        # FAQ
├── 温馨公告/        # 公告通知
├── 还山楼/          # 还山楼介绍
├── 筛月阁/          # 筛月阁介绍
├── 筛月阁-2/        # 筛月阁二期
├── 停云馆/          # 停云馆介绍
├── 吟风亭/          # 吟风亭介绍
├── images/          # 图片资源
└── img/             # 其他图片
```

## 快速开始

### 环境要求

- Node.js >= 18
- Yarn

### 安装依赖

```bash
yarn install
```

### 本地开发

```bash
yarn dev
# 或
yarn server
```

启动后访问 `http://localhost:4000` 预览站点。

### 构建

```bash
yarn build
```

生成的静态文件位于 `public/` 目录。

### 清理缓存

```bash
yarn clean
```

### 部署

```bash
yarn deploy
```

部署至 GitHub Pages（`git@github.com:movinghorse/yssf.git`，分支 `pages`）。

## 配置说明

站点核心配置位于 `_config.yml`，主要包括：

| 配置项 | 说明 |
|--------|------|
| `title` | 站点标题：云水山房 |
| `subtitle` | 副标题：山水间的诗意栖居 |
| `theme` | 当前主题：yssf |
| `rooms` | 客房信息（山景大床房、水景双床房、庭院套房、家庭套房） |
| `transport` | 交通指南（自驾 / 高铁 / 公交） |
| `seasonal_menu` | 季节菜单（春 / 夏 / 秋 / 冬） |
| `services` | 特色服务（农家美食、茶艺体验、民俗活动、周边游览） |
| `theme_config` | 主题配置（颜色、布局、功能开关、SEO 等） |

## 主题特性

- 🎨 墨绿 + 米白 + 赭石配色方案
- 🏠 客房展示与 VR 全景浏览
- 📅 在线预订系统
- 🍵 季节菜单展示
- 🗺️ 交通指南
- 📱 响应式设计
- 🔍 SEO 优化（sitemap、keywords）

## 许可

私有项目，未经授权不得使用。