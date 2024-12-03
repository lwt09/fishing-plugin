# 钓鱼插件 (Fishing Plugin)

一个用于增强钓鱼游戏体验的插件系统。

## 功能特点

- 🎣 自动钓鱼系统
- 📊 钓鱼数据统计
- 🏆 成就系统
- 🎮 游戏平衡性调整
- 🌈 丰富的自定义选项

## 安装

```bash
# 使用 npm 安装
npm install fishing-plugin

# 或使用 yarn
yarn add fishing-plugin
```

## 快速开始

```javascript
const FishingPlugin = require('fishing-plugin');

// 初始化插件
const fishing = new FishingPlugin({
  // 配置选项
});

// 启动钓鱼系统
fishing.start();
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| autoFish | boolean | false | 是否启用自动钓鱼 |
| catchRate | number | 1.0 | 钓鱼成功率倍率 |
| rarityBoost | number | 1.0 | 稀有鱼类出现概率倍率 |

## API 文档

### 基础方法

- `start()`: 启动钓鱼系统
- `stop()`: 停止钓鱼系统
- `getStats()`: 获取钓鱼统计数据
- `setConfig(options)`: 更新配置选项

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建项目
npm run build
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: 添加一些很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情 