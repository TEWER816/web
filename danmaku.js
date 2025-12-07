// 弹幕系统
class DanmakuSystem {
    constructor() {
        this.socket = null;
        this.container = null;
        this.inputBox = null;
        this.sendButton = null;
        this.toggleButton = null;
        this.isVisible = true;
        this.colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
        this.currentColor = this.colors[0];
        
        this.init();
    }

    init() {
        this.createUI();
        this.connectSocket();
        this.bindEvents();
    }

    createUI() {
        // 创建弹幕容器
        const danmakuWrapper = document.createElement('div');
        danmakuWrapper.className = 'danmaku-wrapper';
        danmakuWrapper.innerHTML = `
            <div class="danmaku-container" id="danmaku-container"></div>
            <div class="danmaku-input-panel">
                <div class="danmaku-controls">
                    <button class="danmaku-toggle" id="danmaku-toggle" title="显示/隐藏弹幕">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                    <div class="danmaku-color-picker">
                        ${this.colors.map(color => `
                            <button class="color-btn ${color === this.currentColor ? 'active' : ''}" 
                                    data-color="${color}" 
                                    style="background: ${color}"></button>
                        `).join('')}
                    </div>
                    <input type="text" 
                           class="danmaku-input" 
                           id="danmaku-input" 
                           placeholder="发送弹幕..." 
                           maxlength="100">
                    <button class="danmaku-send" id="danmaku-send">发送</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(danmakuWrapper);
        
        this.container = document.getElementById('danmaku-container');
        this.inputBox = document.getElementById('danmaku-input');
        this.sendButton = document.getElementById('danmaku-send');
        this.toggleButton = document.getElementById('danmaku-toggle');
    }

    connectSocket() {
        // 自动检测环境（本地或生产）
        const API_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:5000' 
            : window.location.origin;
        
        console.log('连接到:', API_URL);
        
        // 连接Socket.IO服务器
        this.socket = io(API_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });

        this.socket.on('connect', () => {
            console.log('弹幕系统已连接');
            this.showNotification('弹幕系统已连接', 'success');
            // 连接成功后加载历史弹幕
            this.loadHistory();
        });

        this.socket.on('disconnect', () => {
            console.log('弹幕系统已断开');
        });

        this.socket.on('connect_error', (error) => {
            console.log('连接失败，请确保Flask服务器已启动');
        });

        this.socket.on('new_danmaku', (data) => {
            this.displayDanmaku(data);
        });

        this.socket.on('error', (data) => {
            this.showNotification(data.message, 'error');
        });
    }

    async loadHistory() {
        try {
            const API_URL = window.location.hostname === 'localhost' 
                ? 'http://localhost:5000' 
                : window.location.origin;
            
            const response = await fetch(`${API_URL}/api/danmaku/history`);
            if (!response.ok) {
                throw new Error('服务器响应错误');
            }
            const result = await response.json();
            if (result.success && result.data.length > 0) {
                // 显示最近几条历史弹幕
                result.data.slice(-5).forEach(danmaku => {
                    this.displayDanmaku(danmaku);
                });
            }
        } catch (error) {
            console.log('等待服务器启动...');
        }
    }

    bindEvents() {
        // 发送按钮点击
        this.sendButton.addEventListener('click', () => {
            this.sendDanmaku();
        });

        // 输入框回车发送
        this.inputBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendDanmaku();
            }
        });

        // 切换显示/隐藏
        this.toggleButton.addEventListener('click', () => {
            this.toggleVisibility();
        });

        // 颜色选择
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentColor = e.target.dataset.color;
            });
        });
    }

    sendDanmaku() {
        const content = this.inputBox.value.trim();
        
        if (!content) {
            this.showNotification('请输入弹幕内容', 'error');
            return;
        }

        if (content.length > 100) {
            this.showNotification('弹幕内容不能超过100字', 'error');
            return;
        }

        // 发送到服务器
        this.socket.emit('send_danmaku', {
            content: content,
            color: this.currentColor
        });

        // 清空输入框
        this.inputBox.value = '';
    }

    displayDanmaku(data) {
        if (!this.isVisible) return;

        const danmaku = document.createElement('div');
        danmaku.className = 'danmaku-item';
        danmaku.textContent = data.content;
        danmaku.style.color = data.color || '#3b82f6';
        
        // 随机垂直位置（避免重叠）
        const top = Math.random() * 70 + 10; // 10% - 80%
        danmaku.style.top = `${top}%`;
        
        // 随机动画时长（15-20秒，更慢）
        const duration = Math.random() * 5 + 15;
        danmaku.style.animationDuration = `${duration}s`;
        
        this.container.appendChild(danmaku);
        
        // 动画结束后移除
        setTimeout(() => {
            danmaku.remove();
        }, duration * 1000);
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.container.style.display = this.isVisible ? 'block' : 'none';
        this.toggleButton.style.opacity = this.isVisible ? '1' : '0.5';
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `danmaku-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
}

// 页面加载完成后初始化弹幕系统
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，等待页面加载动画完成
    setTimeout(() => {
        window.danmakuSystem = new DanmakuSystem();
    }, 2500);
});
