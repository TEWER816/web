# 免费支持WebSocket的部署平台

## ✅ 推荐平台（支持WebSocket + 免费）

### 1. **Render.com** ⭐⭐⭐⭐⭐ 最推荐

**优点**：
- ✅ 完全支持WebSocket
- ✅ 免费套餐足够使用
- ✅ 自动HTTPS
- ✅ 自动部署（连接GitHub）
- ✅ 简单易用

**限制**：
- 15分钟无活动会休眠
- 每月750小时免费

**部署步骤**：

1. 注册 https://render.com
2. 创建新的 Web Service
3. 连接你的GitHub仓库
4. 配置：
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn --worker-class eventlet -w 1 app:app`
5. 点击 Create Web Service

**修改前端连接地址**：
```javascript
// danmaku.js
this.socket = io('https://你的应用名.onrender.com', {
    transports: ['websocket', 'polling']
});

// 修改fetch地址
const response = await fetch('https://你的应用名.onrender.com/api/danmaku/history');
```

---

### 2. **Railway.app** ⭐⭐⭐⭐⭐

**优点**：
- ✅ 完全支持WebSocket
- ✅ 每月$5免费额度
- ✅ 自动HTTPS
- ✅ 非常快速的部署
- ✅ 不会自动休眠

**限制**：
- 每月500小时免费
- 需要信用卡验证（不会扣费）

**部署步骤**：

1. 注册 https://railway.app
2. New Project → Deploy from GitHub
3. 选择仓库
4. 自动检测并部署

**修改前端连接地址**：
```javascript
this.socket = io('https://你的应用名.up.railway.app');
```

---

### 3. **Fly.io** ⭐⭐⭐⭐

**优点**：
- ✅ 完全支持WebSocket
- ✅ 免费套餐慷慨
- ✅ 全球CDN
- ✅ 性能优秀

**限制**：
- 需要信用卡验证
- 配置稍复杂

**部署步骤**：

1. 安装 Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
```

2. 登录
```bash
fly auth login
```

3. 创建应用
```bash
fly launch
```

4. 部署
```bash
fly deploy
```

---

### 4. **Glitch.com** ⭐⭐⭐

**优点**：
- ✅ 支持WebSocket
- ✅ 完全免费
- ✅ 在线编辑器
- ✅ 即时预览

**限制**：
- 5分钟无活动会休眠
- 项目大小限制

**部署步骤**：

1. 访问 https://glitch.com
2. New Project → Import from GitHub
3. 粘贴仓库URL
4. 自动部署

---

### 5. **Cyclic.sh** ⭐⭐⭐⭐

**优点**：
- ✅ 支持WebSocket
- ✅ 完全免费
- ✅ 不会休眠
- ✅ 自动HTTPS

**限制**：
- 较新的平台

**部署步骤**：

1. 注册 https://cyclic.sh
2. Connect GitHub
3. 选择仓库
4. 自动部署

---

### 6. **Koyeb** ⭐⭐⭐⭐

**优点**：
- ✅ 支持WebSocket
- ✅ 免费套餐
- ✅ 全球部署
- ✅ 自动扩展

**限制**：
- 需要信用卡验证

---

## 🎯 最佳选择对比

| 平台 | WebSocket | 免费额度 | 休眠 | 难度 | 推荐度 |
|------|-----------|----------|------|------|--------|
| **Render** | ✅ | 750h/月 | 15分钟 | ⭐ | ⭐⭐⭐⭐⭐ |
| **Railway** | ✅ | $5/月 | ❌ | ⭐ | ⭐⭐⭐⭐⭐ |
| **Fly.io** | ✅ | 慷慨 | ❌ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Glitch** | ✅ | 无限 | 5分钟 | ⭐ | ⭐⭐⭐ |
| **Cyclic** | ✅ | 无限 | ❌ | ⭐ | ⭐⭐⭐⭐ |
| **Koyeb** | ✅ | 有限 | ❌ | ⭐⭐ | ⭐⭐⭐⭐ |

---

## 📝 通用部署配置

### 需要的文件（已创建）：
- ✅ `requirements.txt`
- ✅ `Procfile`
- ✅ `runtime.txt`
- ✅ `app.py`

### 环境变量设置：
```
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
PORT=5000
```

---

## 🚀 推荐部署流程（Render.com）

### 步骤1：准备GitHub仓库
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 步骤2：在Render创建服务
1. 访问 https://render.com
2. 点击 "New +" → "Web Service"
3. 连接GitHub仓库
4. 配置：
   - Name: `danmaku-system`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:$PORT app:app`
   - Plan: `Free`

### 步骤3：添加环境变量
在Render控制台添加：
- `SECRET_KEY`: 随机字符串
- `FLASK_ENV`: `production`

### 步骤4：修改前端代码
编辑 `danmaku.js`：
```javascript
// 获取当前域名
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://你的应用名.onrender.com';

this.socket = io(API_URL, {
    transports: ['websocket', 'polling'],
    reconnection: true
});

// 修改fetch
const response = await fetch(`${API_URL}/api/danmaku/history`);
```

### 步骤5：推送更新
```bash
git add .
git commit -m "Update API URL"
git push
```

Render会自动重新部署！

---

## 🔧 防止休眠的方法

### 方法1：使用UptimeRobot（推荐）
1. 注册 https://uptimerobot.com
2. 添加监控：每5分钟ping一次你的网站
3. 完全免费

### 方法2：使用Cron-job.org
1. 注册 https://cron-job.org
2. 创建定时任务：每10分钟访问你的网站

### 方法3：GitHub Actions
创建 `.github/workflows/keep-alive.yml`：
```yaml
name: Keep Alive

on:
  schedule:
    - cron: '*/10 * * * *'  # 每10分钟

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
      - name: Ping website
        run: curl https://你的应用名.onrender.com
```

---

## 💡 性能优化建议

1. **使用CDN**：
   - Cloudflare（免费）
   - 加速静态资源

2. **数据库**：
   - 使用Redis存储弹幕（Railway提供免费Redis）
   - 或使用MongoDB Atlas（免费512MB）

3. **缓存**：
   - 启用浏览器缓存
   - 使用Service Worker

---

## ❓ 常见问题

### Q: 哪个平台最好？
A: **Render.com** 最简单，**Railway.app** 性能最好且不休眠

### Q: 如何避免休眠？
A: 使用UptimeRobot定时ping，或选择不休眠的平台（Railway/Cyclic）

### Q: 需要信用卡吗？
A: Render和Glitch不需要，Railway和Fly.io需要（但不扣费）

### Q: 如何绑定自定义域名？
A: 所有平台都支持，在设置中添加CNAME记录

---

## 🎉 总结

**最简单**: Render.com
**最稳定**: Railway.app  
**最快速**: Fly.io
**最灵活**: Cyclic.sh

选择任何一个都可以免费部署支持WebSocket的弹幕系统！
