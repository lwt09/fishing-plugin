# 钓鱼游戏增强插件

一个 Chrome 浏览器扩展插件，用于增强网页钓鱼游戏的游戏体验。

## 主要功能

- 🎯 智能提示系统
  - 自动识别最佳钓鱼时机
  - 钓鱼成功率提示
  - 鱼类品质预测

- 📊 数据统计
  - 钓鱼次数统计
  - 成功率分析
  - 稀有鱼类记录
  - 收益统计

- ⚙️ 自定义设置
  - 提示音效开关
  - 自动提示开关
  - 界面主题切换
  - 数据导出功能

## 安装方法

1. 下载插件
   ```bash
   git clone https://github.com/your-username/fishing-plugin.git
   ```

2. 构建插件
   ```bash
   npm install
   npm run build
   ```

3. 在Chrome中安装
   - 打开 Chrome 浏览器
   - 访问 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目的 `dist` 目录

## 使用说明

1. 安装插件后，在支持的钓鱼游戏页面会自动显示工具图标
2. 点击工具图标打开控制面板
3. 在控制面板中可以：
   - 开启/关闭智能提示
   - 查看统计数据
   - 调整设置选项

## 支持的游戏

- 示例游戏1 (game1.example.com)
- 示例游戏2 (game2.example.com)
- 更多游戏支持开发中...

## 开发指南

### 环境要求
- Node.js >= 14
- npm >= 6

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm test
```

### 项目结构
```
fishing-plugin/
├── src/              # 源代码
├── dist/             # 构建输出
├── test/             # 测试文件
└── public/           # 静态资源
```

## 贡献代码

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/xxx`)
3. 提交代码 (`git commit -m 'feat: 添加xxx功能'`)
4. 推送到远程 (`git push origin feature/xxx`)
5. 提交 Pull Request

## 问题反馈

如果你发现任何问题或有新功能建议，请在 GitHub Issues 页面提交。

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件