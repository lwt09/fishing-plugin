const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// 更新文件中的版本号
function updateVersion(filePath, version, isJSON = true) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updated;
    
    if (isJSON) {
      const json = JSON.parse(content);
      json.version = version;
      updated = JSON.stringify(json, null, 2) + '\n';
    }
    
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ 已更新 ${filePath} 的版本号为 ${version}`);
  } catch (error) {
    console.error(`❌ 更新 ${filePath} 失败:`, error.message);
    process.exit(1);
  }
}

// 执行 Git 命令
function execCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ 执行命令失败: ${command}`);
    console.error(error.message);
    return false;
  }
}

// 检查是否有未提交的更改
function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain').toString();
    if (status) {
      console.error('❌ 有未提交的更改，请先提交或存储这些更改');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 检查 Git 状态失败:', error.message);
    process.exit(1);
  }
}

// 验证版本号格式
function validateVersion(version) {
  const versionRegex = /^\d+\.\d+\.\d+$/;
  if (!versionRegex.test(version)) {
    console.error('❌ 无效的版本号格式。请使用 x.y.z 格式（例如 2.0.2）');
    process.exit(1);
  }
}

// 主发布流程
async function release(version) {
  console.log('🚀 开始发布流程...');
  
  // 验证版本号
  validateVersion(version);
  
  // 检查 Git 状态
  console.log('📋 检查 Git 状态...');
  checkGitStatus();
  
  // 确保在主分支上
  console.log('📋 切换到主分支...');
  if (!execCommand('git checkout main')) return;
  if (!execCommand('git pull origin main')) return;
  
  // 更新版本号
  console.log('📝 更新版本号...');
  updateVersion(path.join(process.cwd(), 'package.json'), version);
  updateVersion(path.join(process.cwd(), 'src/manifest.json'), version);
  
  // 提交更改
  console.log('📦 提交版本更新...');
  if (!execCommand('git add package.json src/manifest.json')) return;
  if (!execCommand(`git commit -m "chore: bump version to ${version}"`)) return;
  if (!execCommand('git push origin main')) return;
  
  // 创建并推送标签
  console.log('🏷️ 创建发布标签...');
  if (!execCommand(`git tag v${version}`)) return;
  if (!execCommand(`git push origin v${version}`)) return;
  
  console.log(`
✨ 发布流程完成！
📦 版本 ${version} 已发布
⏳ GitHub Actions 正在构建发布包...
🔍 请访问 GitHub Releases 页面查看发布状态
  `);
}

// 如果直接运行脚本
if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('请输入要发布的版本号 (例如 2.0.2): ', (version) => {
    rl.close();
    release(version);
  });
}

module.exports = release; 