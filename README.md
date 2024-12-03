# 摸鱼插件

一个简单的 Chrome 浏览器扩展插件，帮助你在浏览网页时更舒适地"摸鱼"。

## 功能特点

- 🌓 页面图片亮度调节
  - 一键调整当前页面所有图片的亮度
  - 帮助降低浏览图片时的视觉注意度
  - 让摸鱼更加隐蔽自然

## 安装方法

1. 下载插件

   ```bash
   git clone https://github.com/your-username/fishing-plugin.git
   ```

2. 在 Chrome 中安装
   - 打开 Chrome 浏览器
   - 访问 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目目录

## 使用方法

1. 安装插件后，在 Chrome 浏览器右上角会出现插件图标
2. 在任意网页中点击插件图标
3. 使用亮度调节滑块来调整页面中所有图片的亮度

## 开发相关

### 环境要求

- Chrome 浏览器

### 项目结构

```
fishing-plugin/
├── manifest.json    # 插件配置文件
├── popup.html      # 弹出窗口界面
├── popup.js        # 弹出窗口逻辑
└── content.js      # 页面内容脚本
```

## 问题反馈

如果你发现任何问题或有新功能建议，请在 GitHub Issues 页面提交。
