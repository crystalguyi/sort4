
<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
            height: 100vh;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #f8f8f8;
        }
        
        .game-container {
            position: relative;
            width: 95%;
            max-width: 1400px;
            height: 85vh;
            background-image: url('https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80');
            background-size: cover;
            background-position: center;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 20px;
            border: 15px solid #5d4037;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.8);
        }
        
        .game-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(30, 15, 5, 0.7);
            z-index: 0;
        }
        
        .header {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            background: rgba(93, 64, 55, 0.85);
            border-radius: 12px;
            margin-bottom: 20px;
            z-index: 2;
            border: 2px solid #8d6e63;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
        
        .game-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: #ffd54f;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            letter-spacing: 1px;
        }
        
        .game-info {
            display: flex;
            gap: 25px;
        }
        
        .info-box {
            background: rgba(69, 39, 30, 0.9);
            padding: 10px 20px;
            border-radius: 10px;
            text-align: center;
            min-width: 120px;
            border: 1px solid #a1887f;
        }
        
        .info-label {
            font-size: 0.9rem;
            color: #bcaaa4;
            margin-bottom: 5px;
        }
        
        .info-value {
            font-size: 1.4rem;
            font-weight: 700;
            color: #fff;
        }
        
        .main-content {
            position: relative;
            display: flex;
            flex: 1;
            gap: 20px;
            z-index: 1;
        }
        
        .notes-section {
            width: 25%;
            background: rgba(69, 39, 30, 0.85);
            border-radius: 15px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            border: 2px solid #8d6e63;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        
        .notes-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #8d6e63;
        }
        
        .notes-header i {
            font-size: 1.8rem;
            margin-right: 12px;
            color: #ffd54f;
        }
        
        .notes-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #ffd54f;
        }
        
        .notes-content {
            flex: 1;
            background: rgba(40, 20, 10, 0.8);
            border-radius: 10px;
            padding: 15px;
            overflow-y: auto;
            border: 1px solid #5d4037;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .notes-content textarea {
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            color: #f8f8f8;
            font-size: 1.1rem;
            line-height: 1.6;
            resize: none;
            outline: none;
            padding: 5px;
        }
        
        .words-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .word-display {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px 40px;
            text-align: center;
            max-width: 90%;
            margin-bottom: 40px;
            border: 3px solid #ffd54f;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .word-label {
            font-size: 1.2rem;
            color: #bcaaa4;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .word {
            font-size: 3.5rem;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
            margin: 15px 0;
        }
        
        .word-hint {
            font-size: 1.1rem;
            color: #bcaaa4;
            margin-top: 15px;
            font-style: italic;
        }
        
        .word-cards {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 20px;
        }
        
        .word-card {
            background: linear-gradient(145deg, #8d6e63, #5d4037);
            width: 150px;
            height: 200px;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
            border: 2px solid #ffd54f;
            padding: 15px;
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        
        .word-card:hover {
            transform: translateY(-10px);
        }
        
        .word-card .word {
            font-size: 1.8rem;
            color: #ffd54f;
        }
        
        .word-card .hint {
            font-size: 0.9rem;
            color: #d7ccc8;
            margin-top: 10px;
            text-align: center;
        }
        
        .game-controls {
            display: flex;
            gap: 20px;
            margin-top: 30px;
        }
        
        .btn {
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-primary {
            background: linear-gradient(to right, #ffd54f, #ffb300);
            color: #5d4037;
            box-shadow: 0 5px 15px rgba(255, 213, 79, 0.4);
        }
        
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(255, 213, 79, 0.6);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.15);
            color: #fff;
            border: 1px solid #ffd54f;
        }
        
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.25);
        }
        
        .team-section {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 15px;
            z-index: 2;
        }
        
        .team-member {
            background: rgba(121, 85, 72, 0.8);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
            border: 2px solid #ffd54f;
            transition: transform 0.3s ease;
        }
        
        .team-member.active {
            transform: scale(1.2);
            box-shadow: 0 0 20px rgba(255, 213, 79, 0.8);
        }
        
        .timer {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            background: rgba(255, 213, 79, 0.2);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            font-weight: 700;
            color: #ffd54f;
            border: 3px solid #ffd54f;
            z-index: 3;
        }
        
        .status-indicator {
            position: absolute;
            top: 120px;
            right: 20px;
            background: rgba(69, 39, 30, 0.9);
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 1.1rem;
            color: #ffd54f;
            border: 1px solid #ffd54f;
            z-index: 3;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(40, 40, 40, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.4s ease;
        }
        
        .notification.success {
            border-left: 5px solid #4CAF50;
        }
        
        .notification.error {
            border-left: 5px solid #f44336;
        }
        
        .notification.info {
            border-left: 5px solid #2196F3;
        }
        
        .api-response {
            background: rgba(30, 30, 40, 0.9);
            border-radius: 10px;
            padding: 15px;
            margin-top: 15px;
            max-height: 150px;
            overflow-y: auto;
            font-size: 0.9rem;
            border: 1px solid #444;
        }
        
        @media (max-width: 1100px) {
            .main-content {
                flex-direction: column;
            }
            
            .notes-section {
                width: 100%;
                max-height: 200px;
            }
            
            .word-cards {
                flex-wrap: wrap;
            }
        }
</style>
<template>
    <div id="11111">
        <div class="notification" :class="notification.type" v-if="notification.show">
            <i :class="notification.icon"></i>
            {{ notification.message }}
        </div>
        
        <div class="game-container">
            <div class="header">
                <div class="game-title">词语推理大师</div>
                <div class="game-info">
                    <div class="info-box">
                        <div class="info-label">房间号</div>
                        <div class="info-value">#{{ roomId }}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">回合</div>
                        <div class="info-value">{{ currentRound }}/{{ totalRounds }}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">得分</div>
                        <div class="info-value">{{ score }}</div>
                    </div>
                </div>
            </div>
            
            <div class="timer">{{ timer }}</div>
            <div class="status-indicator">{{ statusMessage }}</div>
            
            <div class="main-content">
                <div class="notes-section">
                    <div class="notes-header">
                        <i class="fas fa-book"></i>
                        <h2 class="notes-title">个人笔记</h2>
                    </div>
                    <div class="notes-content">
                        <textarea v-model="personalNotes" placeholder="记录你的想法和线索..."></textarea>
                    </div>
                    <button class="btn btn-secondary" @click="savePersonalNotes" style="margin-top: 10px;">
                        <i class="fas fa-save"></i> 保存笔记
                    </button>
                </div>
                
                <div class="words-section">
                    <div class="word-display">
                        <div class="word-label">当前词语</div>
                        <div class="word">{{ currentWord }}</div>
                        <div class="word-hint">提示：{{ currentHint }}</div>
                    </div>
                    
                    <div class="word-cards">
                        <div class="word-card" v-for="(word, index) in wordList" :key="index" @click="selectWord(index)">
                            <div class="word">{{ word.text }}</div>
                            <div class="hint">{{ word.hint }}</div>
                        </div>
                    </div>
                    
                    <div class="game-controls">
                        <button class="btn btn-primary" @click="startDescribing">
                            <i class="fas fa-microphone"></i> 开始描述
                        </button>
                        <button class="btn btn-secondary" @click="submitClue">
                            <i class="fas fa-lightbulb"></i> 提交线索
                        </button>
                        <button class="btn btn-secondary" @click="joinDiscussion">
                            <i class="fas fa-users"></i> 加入讨论
                        </button>
                    </div>
                    
                    <div class="api-response" v-if="apiResponse">
                        <strong>API 响应:</strong> {{ apiResponse }}
                    </div>
                </div>
                
                <div class="notes-section">
                    <div class="notes-header">
                        <i class="fas fa-users"></i>
                        <h2 class="notes-title">队伍笔记</h2>
                    </div>
                    <div class="notes-content">
                        <textarea v-model="teamNotes" placeholder="队伍共享的笔记..."></textarea>
                    </div>
                    <button class="btn btn-secondary" @click="saveTeamNotes" style="margin-top: 10px;">
                        <i class="fas fa-save"></i> 保存笔记
                    </button>
                </div>
            </div>
            
            <div class="team-section">
                <div class="team-member" v-for="(player, index) in players" :key="index" :class="{ active: player.isActive }">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    new Vue({
        el: '#app',
        data: {
            roomId: '7D42F9',
            currentRound: 3,
            totalRounds: 8,
            score: 120,
            timer: 45,
            statusMessage: '轮到你描述',
            personalNotes: '1. 第一轮词语可能与自然相关\n2. 小明似乎对"河流"很熟悉\n3. 注意"城堡"在不同回合中的位置变化\n4. 队伍讨论中提到的关键点：顺序比词语本身更重要',
            teamNotes: '队伍策略：\n- 第一轮顺序：河流 → 苹果 → 飞机 → 时间\n- 注意：小明擅长历史类词语\n- 避免使用颜色作为描述线索\n- 关键：城堡可能在第三个位置\n\n待解决问题：\n1. "时间"在不同回合的位置变化\n2. 如何描述抽象词语',
            currentWord: '城堡',
            currentHint: '历史、防御、中世纪',
            wordList: [
                { text: '苹果', hint: '水果/科技' },
                { text: '河流', hint: '自然/流动' },
                { text: '飞机', hint: '交通/天空' },
                { text: '时间', hint: '抽象/测量' }
            ],
            players: [
                { name: '你', isActive: true },
                { name: '小明', isActive: false },
                { name: '小红', isActive: false },
                { name: '小李', isActive: false },
                { name: '小王', isActive: false },
                { name: '小张', isActive: false }
            ],
            apiResponse: '',
            notification: {
                show: false,
                message: '',
                type: 'info',
                icon: 'fas fa-info-circle'
            }
        },
        mounted() {
            this.startTimer();
        },
        methods: {
            startTimer() {
                setInterval(() => {
                    if (this.timer > 0) {
                        this.timer--;
                        if (this.timer === 10) {
                            this.showNotification('时间快到了！请尽快操作', 'error');
                        }
                    } else {
                        this.timer = 0;
                    }
                }, 1000);
            },
            showNotification(message, type) {
                this.notification.message = message;
                this.notification.type = type;
                this.notification.show = true;
                
                if (type === 'success') {
                    this.notification.icon = 'fas fa-check-circle';
                } else if (type === 'error') {
                    this.notification.icon = 'fas fa-exclamation-circle';
                } else {
                    this.notification.icon = 'fas fa-info-circle';
                }
                
                setTimeout(() => {
                    this.notification.show = false;
                }, 3000);
            },
            selectWord(index) {
                const word = this.wordList[index].text;
                this.showNotification(`已选择词语: ${word}`, 'info');
                this.apiResponse = `选择词语: ${word}`;
            },
            startDescribing() {
                this.showNotification('描述功能已激活，请开始描述...', 'info');
                
                // 模拟API请求
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    action: 'start_describing',
                    roomId: this.roomId,
                    player: '你'
                })
                .then(response => {
                    this.apiResponse = JSON.stringify(response.data, null, 2);
                    this.showNotification('描述已开始！麦克风已激活', 'success');
                })
                .catch(error => {
                    this.apiResponse = `错误: ${error.message}`;
                    this.showNotification('描述功能启动失败', 'error');
                });
            },
            submitClue() {
                this.showNotification('正在提交线索...', 'info');
                
                // 模拟API请求
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    action: 'submit_clue',
                    roomId: this.roomId,
                    player: '你',
                    clue: this.currentWord,
                    timestamp: new Date().toISOString()
                })
                .then(response => {
                    this.apiResponse = JSON.stringify(response.data, null, 2);
                    this.showNotification('线索已成功提交！', 'success');
                })
                .catch(error => {
                    this.apiResponse = `错误: ${error.message}`;
                    this.showNotification('线索提交失败', 'error');
                });
            },
            joinDiscussion() {
                this.showNotification('正在加入语音讨论...', 'info');
                
                // 模拟API请求
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    action: 'join_discussion',
                    roomId: this.roomId,
                    player: '你'
                })
                .then(response => {
                    this.apiResponse = JSON.stringify(response.data, null, 2);
                    this.showNotification('已加入语音讨论', 'success');
                })
                .catch(error => {
                    this.apiResponse = `错误: ${error.message}`;
                    this.showNotification('加入讨论失败', 'error');
                });
            },
            savePersonalNotes() {
                this.showNotification('正在保存个人笔记...', 'info');
                
                // 模拟API请求
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    action: 'save_notes',
                    type: 'personal',
                    content: this.personalNotes,
                    player: '你'
                })
                .then(response => {
                    this.apiResponse = JSON.stringify(response.data, null, 2);
                    this.showNotification('个人笔记已保存', 'success');
                })
                .catch(error => {
                    this.apiResponse = `错误: ${error.message}`;
                    this.showNotification('笔记保存失败', 'error');
                });
            },
            saveTeamNotes() {
                this.showNotification('正在保存队伍笔记...', 'info');
                
                // 模拟API请求
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    action: 'save_notes',
                    type: 'team',
                    content: this.teamNotes,
                    player: '你'
                })
                .then(response => {
                    this.apiResponse = JSON.stringify(response.data, null, 2);
                    this.showNotification('队伍笔记已保存', 'success');
                })
                .catch(error => {
                    this.apiResponse = `错误: ${error.message}`;
                    this.showNotification('笔记保存失败', 'error');
                });
            }
        }
    });
    </script>