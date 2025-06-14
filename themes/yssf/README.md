# 云栖山舍主题

一个融合中式禅意与现代简约风格的民宿主题，突出「隐于山水、静享自然」的客栈理念。

## 特性

- 响应式设计，支持移动端、平板和桌面端
- 视差滚动效果
- VR全景看房
- 在线预订系统
- 会员体系
- 节气主题自动切换
- 多语言支持

## 安装

1. 在 Hexo 根目录下执行：
```bash
git clone https://github.com/yourusername/yssf.git themes/yssf
```

2. 修改 Hexo 根目录下的 `_config.yml`：
```yaml
theme: yssf
```

## 配置

在 Hexo 根目录下的 `_config.yml` 中配置主题：

```yaml
theme_config:
  # 主题信息
  name: YSSF
  version: 1.0.0
  
  # 主题颜色
  colors:
    primary: '#3A5A40'    # 墨绿
    secondary: '#F5F1E6'  # 米白
    accent: '#8B4513'     # 赭石
  
  # 布局设置
  layout:
    sidebar: right
    sidebar_width: 300
    toc: true
    toc_number: true
    social_links:
      wechat: true
      weibo: true
      xiaohongshu: true
  
  # 功能特性
  features:
    parallax: true
    vr_view: true
    booking_system: true
    member_system: true
    season_theme: true
  
  # 自定义设置
  custom:
    booking_phone: '400-888-8888'
    address: '浙江省杭州市西湖区云栖路88号'
    business_hours: '24小时'
    wechat_qr: '/images/wechat-qr.png'
```

## 使用

1. 创建新文章：
```bash
hexo new post "文章标题"
```

2. 本地预览：
```bash
hexo server
```

3. 生成静态文件：
```bash
hexo generate
```

4. 部署：
```bash
hexo deploy
```

## 目录结构

```
themes/yssf/
├── _config.yml          # 主题配置文件
├── layout/             # 布局文件
│   ├── index.ejs       # 首页布局
│   └── partial/        # 局部布局
│       ├── head.ejs    # 头部
│       └── footer.ejs  # 底部
├── source/             # 资源文件
│   ├── css/           # 样式文件
│   ├── js/            # 脚本文件
│   ├── images/        # 图片资源
│   └── fonts/         # 字体文件
└── README.md          # 说明文档
```

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

MIT License 