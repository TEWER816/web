from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__, static_folder='.', static_url_path='')
app.config['SECRET_KEY'] = 'your-secret-key-here'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# 存储弹幕历史（最多保留100条）
danmaku_history = []
MAX_HISTORY = 100

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/danmaku/history', methods=['GET'])
def get_history():
    """获取弹幕历史"""
    return jsonify({
        'success': True,
        'data': danmaku_history[-50:]  # 返回最近50条
    })

@socketio.on('connect')
def handle_connect():
    """客户端连接"""
    print('客户端已连接')
    emit('connected', {'message': '连接成功'})

@socketio.on('disconnect')
def handle_disconnect():
    """客户端断开连接"""
    print('客户端已断开')

@socketio.on('send_danmaku')
def handle_danmaku(data):
    """接收并广播弹幕"""
    try:
        content = data.get('content', '').strip()
        
        # 验证弹幕内容
        if not content:
            emit('error', {'message': '弹幕内容不能为空'})
            return
        
        if len(content) > 100:
            emit('error', {'message': '弹幕内容不能超过100字'})
            return
        
        # 创建弹幕对象
        danmaku = {
            'id': len(danmaku_history) + 1,
            'content': content,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'color': data.get('color', '#3b82f6')
        }
        
        # 保存到历史记录
        danmaku_history.append(danmaku)
        if len(danmaku_history) > MAX_HISTORY:
            danmaku_history.pop(0)
        
        # 广播给所有客户端
        emit('new_danmaku', danmaku, broadcast=True)
        
        print(f'新弹幕: {content}')
        
    except Exception as e:
        print(f'处理弹幕错误: {str(e)}')
        emit('error', {'message': '发送失败，请重试'})

if __name__ == '__main__':
    import os
    
    # 获取环境变量
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV', 'development') == 'development'
    
    print('Flask服务器启动中...')
    print(f'访问地址: http://0.0.0.0:{port}')
    print(f'调试模式: {debug}')
    
    socketio.run(app, host='0.0.0.0', port=port, debug=debug)
