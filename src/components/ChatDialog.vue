<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue语音聊天室</title>
    <!-- 引入Element Plus CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
    <!-- 引入Vue 3 -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <!-- 引入Element Plus -->
    <script src="https://unpkg.com/element-plus"></script>
    <!-- 引入图标库 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- 引入SignalR -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/5.0.11/signalr.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        #app {
            width: 100%;
            max-width: 1200px;
            display: flex;
            justify-content: center;
        }
        
        .chat-app-container {
            width: 1000px;
            height: 700px;
            display: grid;
            grid-template-columns: 280px 1fr;
            background: rgba(25, 25, 35, 0.9);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar {
            background: rgba(35, 35, 50, 0.95);
            padding: 20px;
            display: flex;
            flex-direction: column;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logo-area {
            text-align: center;
            padding: 20px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logo-area h1 {
            font-size: 26px;
            background: linear-gradient(to right, #4cc9f0, #f72585);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 5px;
            font-weight: 700;
        }
        
        .logo-area p {
            color: #a0a0c0;
            font-size: 14px;
        }
        
        .user-card {
            background: linear-gradient(135deg, #3a0ca3, #4361ee);
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, #4361ee, #4cc9f0);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
            color: white;
        }
        
        .user-details {
            flex: 1;
        }
        
        .user-details h3 {
            font-size: 16px;
            color: white;
            margin-bottom: 5px;
        }
        
        .user-details p {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .room-controls {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .online-users {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        .section-title {
            font-size: 16px;
            color: #4cc9f0;
            padding: 10px 0;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .user-list {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-right: 5px;
        }
        
        .user-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 10px;
            transition: background 0.3s;
        }
        
        .user-item:hover {
            background: rgba(255, 255, 255, 0.08);
        }
        
        .user-item .avatar {
            width: 36px;
            height: 36px;
            font-size: 14px;
        }
        
        .user-item .name {
            flex: 1;
            font-size: 14px;
            color: #e0e0ff;
        }
        
        .user-item .status {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #2ecc71;
        }
        
        .chat-area {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        
        .chat-header {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(30, 30, 45, 0.9);
        }
        
        .room-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .room-status {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #2ecc71;
        }
        
        .room-info h2 {
            font-size: 20px;
            color: white;
        }
        
        .room-info p {
            font-size: 14px;
            color: #a0a0c0;
        }
        
        .messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: rgba(20, 20, 30, 0.7);
        }
        
        .message {
            max-width: 80%;
            padding: 15px 20px;
            border-radius: 18px;
            position: relative;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .message.received {
            align-self: flex-start;
            background: rgba(67, 97, 238, 0.25);
            border-bottom-left-radius: 5px;
        }
        
        .message.sent {
            align-self: flex-end;
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            border-bottom-right-radius: 5px;
        }
        
        .message.system {
            align-self: center;
            background: rgba(255, 255, 255, 0.08);
            text-align: center;
            font-style: italic;
            font-size: 14px;
            color: #a0a0c0;
        }
        
        .message .sender {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 8px;
            display: block;
            color: #4cc9f0;
        }
        
        .message .content {
            font-size: 15px;
            line-height: 1.5;
            color: #e0e0ff;
        }
        
        .message .time {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            text-align: right;
            margin-top: 8px;
        }
        
        .input-area {
            padding: 20px;
            background: rgba(30, 30, 45, 0.9);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .input-row {
            display: flex;
            gap: 15px;
        }
        
        .message-input {
            flex: 1;
        }
        
        .voice-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f72585;
            margin-top: 10px;
            font-size: 14px;
            gap: 8px;
            height: 0;
            overflow: hidden;
            transition: height 0.3s, margin-top 0.3s;
        }
        
        .voice-indicator.active {
            height: 30px;
            margin-top: 10px;
        }
        
        .mic-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            font-size: 24px;
            gap: 30px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        
        .mic-animation.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .mic-icon {
            font-size: 80px;
            color: #f72585;
            animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            background: #2ecc71;
            color: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transform: translateX(200%);
            transition: transform 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.error {
            background: #e74c3c;
        }
        
        /* 自定义滚动条 */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #4361ee;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #3a0ca3;
        }
        
        .empty-state {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #a0a0c0;
            text-align: center;
            padding: 20px;
        }
        
        .empty-state i {
            font-size: 60px;
            margin-bottom: 20px;
            color: #4361ee;
        }
        
        .empty-state h3 {
            font-size: 22px;
            margin-bottom: 10px;
            color: #e0e0ff;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="chat-app-container">
            <div class="sidebar">
                <div class="logo-area">
                    <h1><i class="fas fa-comment-dots"></i> Vue语音聊天室</h1>
                    <p>实时语音交流平台</p>
                </div>
                
                <div class="user-card">
                    <div class="user-info">
                        <div class="avatar">{{ userAvatar }}</div>
                        <div class="user-details">
                            <h3>{{ currentUser.name }}</h3>
                            <p>房间: {{ currentRoom || '未加入' }}</p>
                        </div>
                    </div>
                </div>
                
                <div class="room-controls">
                    <el-input v-model="roomName" placeholder="输入房间名称" size="large">
                        <template #prefix>
                            <i class="fas fa-door-open"></i>
                        </template>
                    </el-input>
                    
                    <el-input v-model="username" placeholder="你的名字" size="large">
                        <template #prefix>
                            <i class="fas fa-user"></i>
                        </template>
                    </el-input>
                    
                    <div style="display: flex; gap: 10px;">
                        <el-button type="success" size="large" @click="createRoom" :disabled="!canJoinRoom">
                            <i class="fas fa-plus"></i> 创建房间
                        </el-button>
                        <el-button type="primary" size="large" @click="joinRoom" :disabled="!canJoinRoom">
                            <i class="fas fa-sign-in-alt"></i> 加入房间
                        </el-button>
                    </div>
                </div>
                
                <div class="online-users">
                    <div class="section-title">
                        <i class="fas fa-users"></i> 在线用户 ({{ onlineUsers.length }})
                    </div>
                    <div class="user-list">
                        <div v-if="onlineUsers.length === 0" class="empty-state">
                            <i class="fas fa-user-friends"></i>
                            <h3>暂无在线用户</h3>
                            <p>加入房间后用户将显示在这里</p>
                        </div>
                        <div v-for="user in onlineUsers" :key="user.id" class="user-item">
                            <div class="avatar">{{ generateAvatar(user.name) }}</div>
                            <div class="name">{{ user.name }}<span v-if="user.id === currentUser.id"> (我)</span></div>
                            <div class="status"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="chat-area">
                <div class="chat-header">
                    <div class="room-info">
                        <div class="room-status" :style="{background: roomStatusColor}"></div>
                        <div>
                            <h2>{{ currentRoom || '未加入房间' }}</h2>
                            <p v-if="currentRoom">{{ onlineUsers.length }} 人在线</p>
                        </div>
                    </div>
                    <el-button type="danger" size="large" @click="leaveRoom" :disabled="!currentRoom">
                        <i class="fas fa-sign-out-alt"></i> 离开房间
                    </el-button>
                </div>
                
                <div class="messages-container" ref="messagesContainer">
                    <div v-if="messages.length === 0" class="empty-state">
                        <i class="fas fa-comments"></i>
                        <h3>欢迎加入聊天室</h3>
                        <p>发送消息开始与其他人交流</p>
                    </div>
                    
                    <div v-for="(msg, index) in messages" :key="index" 
                         :class="['message', msg.type, msg.sender === '系统' ? 'system' : '']">
                        <span v-if="msg.sender !== '系统'" class="sender">{{ msg.sender }}</span>
                        <div class="content">{{ msg.content }}</div>
                        <div class="time">{{ formatTime(msg.timestamp) }}</div>
                    </div>
                </div>
                
                <div class="input-area">
                    <div class="input-row">
                        <el-input 
                            v-model="messageInput" 
                            placeholder="输入消息..." 
                            size="large"
                            :disabled="!currentRoom"
                            @keyup.enter="sendMessage"
                            class="message-input"
                        >
                            <template #prefix>
                                <i class="fas fa-comment"></i>
                            </template>
                        </el-input>
                        
                        <el-button 
                            type="primary" 
                            size="large" 
                            @click="sendMessage"
                            :disabled="!currentRoom || !messageInput"
                        >
                            <i class="fas fa-paper-plane"></i>
                        </el-button>
                        
                        <el-button 
                            type="warning" 
                            size="large" 
                            @click="toggleVoiceInput"
                            :disabled="!currentRoom"
                            :class="{ 'is-active': isListening }"
                        >
                            <i class="fas fa-microphone"></i>
                        </el-button>
                    </div>
                    
                    <div class="voice-indicator" :class="{ active: isListening }">
                        <i class="fas fa-microphone-alt"></i>
                        <span>正在聆听您的语音...</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="notification" :class="{'show': notification.show, 'error': notification.error}">
            <i :class="notification.error ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'"></i>
            <span>{{ notification.message }}</span>
        </div>
        
        <div class="mic-animation" :class="{ active: isListening }">
            <div class="mic-icon">
                <i class="fas fa-microphone-alt"></i>
            </div>
            <div>正在聆听您的语音...</div>
            <div>请开始说话</div>
        </div>
    </div>

    <script>
        const { createApp, ref, computed, onMounted, nextTick } = Vue;
        const app = createApp({
            setup() {
                // 用户和房间数据
                const roomName = ref('公共聊天室');
                const username = ref('');
                const currentRoom = ref('');
                const currentUser = ref({
                    id: '',
                    name: '匿名用户'
                });
                
                // 消息数据
                const messageInput = ref('');
                const messages = ref([]);
                const onlineUsers = ref([]);
                
                // UI状态
                const isListening = ref(false);
                const notification = ref({
                    show: false,
                    message: '',
                    error: false
                });
                
                // 语音识别
                let recognition = null;
                
                // 计算属性
                const userAvatar = computed(() => {
                    return generateAvatar(currentUser.value.name);
                });
                
                const roomStatusColor = computed(() => {
                    return currentRoom.value ? '#2ecc71' : '#e74c3c';
                });
                
                const canJoinRoom = computed(() => {
                    return roomName.value.trim() !== '';
                });
                
                // DOM 引用
                const messagesContainer = ref(null);
                
                // 初始化函数
                const init = () => {
                    // 设置默认用户名
                    const randomNames = ['匿名用户', '神秘访客', '聊天达人', '新用户', '快乐聊天者'];
                    username.value = randomNames[Math.floor(Math.random() * randomNames.length)];
                    currentUser.value.name = username.value;
                    currentUser.value.id = generateId();
                    
                    // 初始化语音识别
                    initSpeechRecognition();
                    
                    // 模拟加入公共聊天室
                    setTimeout(() => {
                        if (!currentRoom.value) {
                            joinRoom();
                        }
                    }, 2000);
                };
                
                // 生成随机ID
                const generateId = () => {
                    return 'user_' + Math.random().toString(36).substr(2, 9);
                };
                
                // 生成用户头像
                const generateAvatar = (name) => {
                    const names = name.split(' ');
                    let initials = '';
                    if (names.length > 1) {
                        initials = names[0].charAt(0) + names[1].charAt(0);
                    } else {
                        initials = name.substring(0, 2);
                    }
                    return initials.toUpperCase();
                };
                
                // 显示通知
                const showNotification = (message, isError = false) => {
                    notification.value.message = message;
                    notification.value.error = isError;
                    notification.value.show = true;
                    
                    setTimeout(() => {
                        notification.value.show = false;
                    }, 3000);
                };
                
                // 格式化时间
                const formatTime = (date) => {
                    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                };
                
                // 添加消息
                const addMessage = (sender, content, isSent = false, isSystem = false) => {
                    const message = {
                        sender: isSystem ? '系统' : sender,
                        content: content,
                        type: isSent ? 'sent' : 'received',
                        timestamp: new Date()
                    };
                    
                    messages.value.push(message);
                    
                    // 滚动到底部
                    nextTick(() => {
                        if (messagesContainer.value) {
                            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
                        }
                    });
                    
                    // 如果是接收到的消息且不是系统消息，则朗读
                    if (!isSent && !isSystem && 'speechSynthesis' in window) {
                        speakText(content);
                    }
                };
                
                // 文本转语音
                const speakText = (text) => {
                    if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(text);
                        utterance.lang = 'zh-CN';
                        utterance.rate = 1.0;
                        speechSynthesis.speak(utterance);
                    }
                };
                
                // 初始化语音识别
                const initSpeechRecognition = () => {
                    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                        recognition.continuous = false;
                        recognition.lang = 'zh-CN';
                        
                        recognition.onstart = () => {
                            isListening.value = true;
                        };
                        
                        recognition.onresult = (event) => {
                            const transcript = event.results[0][0].transcript;
                            messageInput.value = transcript;
                            isListening.value = false;
                        };
                        
                        recognition.onerror = (event) => {
                            console.error('语音识别错误:', event.error);
                            isListening.value = false;
                            showNotification('语音识别失败: ' + event.error, true);
                        };
                        
                        recognition.onend = () => {
                            isListening.value = false;
                        };
                    } else {
                        showNotification('您的浏览器不支持语音识别', true);
                    }
                };
                
                // 切换语音输入
                const toggleVoiceInput = () => {
                    if (!recognition) {
                        showNotification('语音识别不可用', true);
                        return;
                    }
                    
                    if (isListening.value) {
                        recognition.stop();
                    } else {
                        recognition.start();
                    }
                };
                
                // 创建房间
                const createRoom = () => {
                    if (!roomName.value.trim()) {
                        showNotification('请输入房间名称', true);
                        return;
                    }
                    
                    currentUser.value.name = username.value || '匿名用户';
                    joinRoom(true);
                };
                
                // 加入房间
                const joinRoom = (isNewRoom = false) => {
                    if (!roomName.value.trim()) {
                        showNotification('请输入房间名称', true);
                        return;
                    }
                    
                    currentUser.value.name = username.value || '匿名用户';
                    currentRoom.value = roomName.value;
                    
                    // 模拟用户列表
                    const users = [
                        { id: generateId(), name: '用户A' },
                        { id: generateId(), name: '用户B' },
                        { id: currentUser.value.id, name: currentUser.value.name }
                    ];
                    
                    onlineUsers.value = users;
                    
                    // 添加系统消息
                    addMessage('系统', `${currentUser.value.name} 加入了房间`, false, true);
                    
                    if (isNewRoom) {
                        addMessage('系统', '您创建了新房间', false, true);
                    }
                    
                    showNotification(`已加入房间: ${currentRoom.value}`);
                };
                
                // 离开房间
                const leaveRoom = () => {
                    addMessage('系统', `${currentUser.value.name} 离开了房间`, false, true);
                    
                    currentRoom.value = '';
                    onlineUsers.value = [];
                    
                    showNotification('已离开房间');
                };
                
                // 发送消息
                const sendMessage = () => {
                    const message = messageInput.value.trim();
                    if (!message || !currentRoom.value) return;
                    
                    addMessage(currentUser.value.name, message, true);
                    
                    // 模拟其他用户回复
                    if (Math.random() > 0.7 && onlineUsers.value.length > 1) {
                        setTimeout(() => {
                            const replies = [
                                '你好！',
                                '这个应用真棒！',
                                '语音功能好用吗？',
                                '欢迎加入聊天室！',
                                '今天天气不错',
                                '你觉得这个UI设计怎么样？'
                            ];
                            const randomUser = onlineUsers.value.find(u => u.id !== currentUser.value.id);
                            if (randomUser) {
                                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                                addMessage(randomUser.name, randomReply);
                            }
                        }, 1000 + Math.random() * 2000);
                    }
                    
                    messageInput.value = '';
                };
                
                onMounted(init);
                
                return {
                    roomName,
                    username,
                    currentRoom,
                    currentUser,
                    messageInput,
                    messages,
                    onlineUsers,
                    isListening,
                    notification,
                    userAvatar,
                    roomStatusColor,
                    canJoinRoom,
                    messagesContainer,
                    generateAvatar,
                    formatTime,
                    createRoom,
                    joinRoom,
                    leaveRoom,
                    sendMessage,
                    toggleVoiceInput
                };
            }
        });
        
        // 使用Element Plus
        app.use(ElementPlus);
        app.mount('#app');
    </script>
</body>
</html>