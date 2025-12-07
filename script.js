// 页面加载动画
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        // 延迟一点时间让用户看到加载动画
        setTimeout(() => {
            loader.classList.add('fade-out');
            // 动画结束后移除元素
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 800);
    }
});

// DOM元素
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    initSmoothScroll();
    
    // 导航栏滚动效果
    initNavScroll();
    
    // 动画效果
    initScrollAnimations();
    
    // 神经网络动画
    initNeuralNetwork();
    
    // 初始化README加载
    initReadmeLoader();
});

// 平滑滚动
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑固定导航栏的高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initNavScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
}

// 显示通知
function showNotification(message, type) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后移除
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.feature-card, .timeline-item, .section-header, .tech-item, .companionship-card, .security-item, .way-item, .contribute-text');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(element);
    });
    
    // 添加动画类
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// 神经网络动画
function initNeuralNetwork() {
    const nodes = document.querySelectorAll('.node');
    const brainCore = document.querySelector('.brain-core');
    
    // 创建连接线
    function createConnections() {
        const neuralNetwork = document.querySelector('.neural-network');
        
        nodes.forEach((node, index) => {
            // 每个节点与核心创建连接
            const line = document.createElement('div');
            line.className = 'connection-line';
            
            // 计算节点和核心的位置
            const nodeRect = node.getBoundingClientRect();
            const coreRect = brainCore.getBoundingClientRect();
            const networkRect = neuralNetwork.getBoundingClientRect();
            
            const nodeX = nodeRect.left + nodeRect.width / 2 - networkRect.left;
            const nodeY = nodeRect.top + nodeRect.height / 2 - networkRect.top;
            const coreX = coreRect.left + coreRect.width / 2 - networkRect.left;
            const coreY = coreRect.top + coreRect.height / 2 - networkRect.top;
            
            // 计算线的长度和角度
            const length = Math.sqrt(Math.pow(coreX - nodeX, 2) + Math.pow(coreY - nodeY, 2));
            const angle = Math.atan2(coreY - nodeY, coreX - nodeX) * 180 / Math.PI;
            
            // 设置线的样式
            line.style.position = 'absolute';
            line.style.height = '2px';
            line.style.width = `${length}px`;
            line.style.background = 'linear-gradient(90deg, rgba(99, 102, 241, 0.7), rgba(139, 92, 246, 0.7))';
            line.style.left = `${nodeX}px`;
            line.style.top = `${nodeY}px`;
            line.style.transformOrigin = '0 50%';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.opacity = '0.5';
            line.style.animation = `pulse 3s infinite ${index * 0.5}s`;
            
            neuralNetwork.appendChild(line);
        });
    }
    
    // 初始化连接线
    setTimeout(createConnections, 100);
    
    // 添加节点悬停效果
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.8)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// 页面内容淡入效果
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加特性图标
document.addEventListener('DOMContentLoaded', function() {
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    // 为每个特性图标添加SVG图标
    const icons = {
        'self-iteration': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',
        'self-update': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"/></svg>',
        'self-strengthening': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'
    };
    
    featureIcons.forEach(icon => {
        const iconClass = Array.from(icon.classList).find(cls => cls !== 'feature-icon');
        if (iconClass && icons[iconClass]) {
            icon.innerHTML = icons[iconClass];
            icon.style.display = 'flex';
            icon.style.justifyContent = 'center';
            icon.style.alignItems = 'center';
        }
    });
});

// GitHub README加载功能
function initReadmeLoader() {
    const refreshButton = document.getElementById('refresh-readme');
    
    // 初始加载README
    loadReadmeFromGitHub();
    
    // 刷新按钮点击事件
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            loadReadmeFromGitHub();
        });
    }
}

// 从GitHub加载README内容
async function loadReadmeFromGitHub() {
    const loadingElement = document.getElementById('readme-loading');
    const displayElement = document.getElementById('readme-display');
    const lastUpdatedElement = document.getElementById('last-updated');
    const docSizeElement = document.getElementById('doc-size');
    
    // 显示加载状态
    if (loadingElement) loadingElement.style.display = 'block';
    if (displayElement) displayElement.style.display = 'none';
    
    try {
        // GitHub API获取README内容
        const response = await fetch('https://api.github.com/repos/TEWER816/AI_neural/readme');
        
        if (!response.ok) {
            throw new Error(`GitHub API请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        
        // README内容是base64编码的，需要解码
        // 使用更健壮的base64解码方法，支持中文等非ASCII字符
        const utf8ToBase64 = (str) => {
            return window.btoa(unescape(encodeURIComponent(str)));
        };
        
        const base64ToUtf8 = (str) => {
            return decodeURIComponent(escape(window.atob(str)));
        };
        
        const readmeContent = base64ToUtf8(data.content);
        
        // 使用marked.js渲染Markdown
        const renderedHtml = marked.parse(readmeContent);
        
        // 显示渲染后的内容
        if (displayElement) {
            displayElement.innerHTML = renderedHtml;
            displayElement.style.display = 'block';
        }
        
        // 更新元数据
        if (lastUpdatedElement) {
            const updatedDate = new Date(data.updated_at);
            lastUpdatedElement.textContent = updatedDate.toLocaleString('zh-CN');
        }
        
        if (docSizeElement) {
            const sizeInKB = (readmeContent.length / 1024).toFixed(2);
            docSizeElement.textContent = `${sizeInKB} KB`;
        }
        
        // 隐藏加载状态
        if (loadingElement) loadingElement.style.display = 'none';
        
        // 添加滚动动画到README部分
        const readmeSection = document.getElementById('readme');
        if (readmeSection) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(readmeSection);
        }
        
    } catch (error) {
        console.error('加载README失败:', error);
        
        // 显示错误信息
        if (displayElement) {
            displayElement.innerHTML = `
                <div class="error-message">
                    <h3>加载README失败</h3>
                    <p>无法从GitHub加载README.md文件。请检查网络连接或稍后再试。</p>
                    <p>错误详情: ${error.message}</p>
                    <p>您也可以直接访问 <a href="https://github.com/TEWER816/AI_neural" target="_blank">GitHub仓库</a> 查看项目文档。</p>
                </div>
            `;
            displayElement.style.display = 'block';
        }
        
        if (loadingElement) loadingElement.style.display = 'none';
    }
}