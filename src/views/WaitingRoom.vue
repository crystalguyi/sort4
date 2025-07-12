<script setup>
import { ref, computed } from 'vue'

// 房间信息
const roomId = ref('R42X9L')
const timeLeft = ref(120) // 2分钟倒计时
const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// 玩家数据
const redTeam = ref([
    { id: 1, name: '烈焰战神', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', level: 28, ready: true },
    { id: 2, name: '红莲法师', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', level: 25, ready: true },
    { id: 3, name: '赤焰刺客', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', level: 30, ready: false },
    { id: 4, name: '炎阳骑士', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', level: 24, ready: true },
    { id: 5, name: '熔岩巨人', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', level: 32, ready: false }
])

const blueTeam = ref([
    { id: 6, name: '寒冰女王', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', level: 29, ready: true },
    { id: 7, name: '冰川法师', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', level: 26, ready: true },
    { id: 8, name: '深海刺客', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', level: 27, ready: true },
    { id: 9, name: '极光射手', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', level: 23, ready: false },
    { id: 10, name: '冰霜巨人', avatar: 'https://randomuser.me/api/portraits/men/90.jpg', level: 31, ready: true }
])

// 当前玩家信息
const currentPlayer = ref({
    id: 3, 
    name: '赤焰刺客', 
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg', 
    level: 30, 
    ready: false,
    team: 'red'
})

// 是否可以开始游戏
const canStart = computed(() => {
    const redReady = redTeam.value.filter(p => p.ready).length
    const blueReady = blueTeam.value.filter(p => p.ready).length
    return redReady >= 3 && blueReady >= 3 && redReady + blueReady >= 8
})
        
// 切换准备状态
const toggleReady = () => {
    currentPlayer.value.ready = !currentPlayer.value.ready
    // 更新队伍中的玩家状态
    if (currentPlayer.value.team === 'red') {
    const player = redTeam.value.find(p => p.id === currentPlayer.value.id)
    if (player) player.ready = currentPlayer.value.ready
    } else {
    const player = blueTeam.value.find(p => p.id === currentPlayer.value.id)
    if (player) player.ready = currentPlayer.value.ready
    }
}

</script>

<template>
<div>
  <div id="app" class="game-room-container">
    <div class="header">
      <h1 class="room-title">荣耀战场 · 准备室</h1>
      <div class="room-id">
        <i class="fas fa-door-open"></i>
        <span>房间号: #{{ roomId }}</span>
      </div>
      <div class="timer">
        <i class="fas fa-clock"></i> {{ formattedTime }}
      </div>
    </div>
    
    <div class="content">
      <div class="">
        <div class="team team-red">
          <div class="team-header">
            <div class="team-name">
              <div class="team-icon">
                <i class="fas fa-fire"></i>
              </div>
              <span>红队 · 烈焰</span>
            </div>
            <div class="team-count">{{ redTeam.length }}/5 玩家</div>
          </div>
          
          <div class="players-list">
            <div v-for="(player, index) in redTeam" :key="'red-'+index" 
                 class="player-card" :class="{ ready: player.ready }">
              <img :src="player.avatar" :alt="player.name" class="player-avatar">
              <div class="player-info">
                <div class="player-name">{{ player.name }}</div>
                <div class="player-status">
                  <div class="status-dot" :class="player.ready ? 'ready' : 'not-ready'"></div>
                  <span>{{ player.ready ? '准备就绪' : '准备中...' }}</span>
                </div>
              </div>
              <div class="player-level">Lv.{{ player.level }}</div>
            </div>
          </div>
        </div>
        
        <div class="team team-blue">
          <div class="team-header">
            <div class="team-name">
              <div class="team-icon">
                <i class="fas fa-tint"></i>
              </div>
              <span>蓝队 · 寒冰</span>
            </div>
            <div class="team-count">{{ blueTeam.length }}/5 玩家</div>
          </div>
          
          <div class="players-list">
            <div v-for="(player, index) in blueTeam" :key="'blue-'+index" 
                 class="player-card" :class="{ ready: player.ready }">
              <img :alt="player.name" class="player-avatar">
              <div class="player-info">
                <div class="player-name">{{ player.name }}</div>
                <div class="player-status">
                  <div class="status-dot" :class="player.ready ? 'ready' : 'not-ready'"></div>
                  <span>{{ player.ready ? '准备就绪' : '准备中...' }}</span>
                </div>
              </div>
              <div class="player-level">Lv.{{ player.level }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="controls">
      <button class="start-button" :disabled="!canStart">
        {{ canStart ? '开始游戏' : '等待更多玩家...' }}
      </button>
      <button class="ready-button" :class="{ ready: currentPlayer.ready }" @click="toggleReady">
        {{ currentPlayer.ready ? '已准备' : '准备' }}
      </button>
    </div>
  </div>
</div>
</template>

<style scoped>

* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    body {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      color: #e6e6e6;
    }
    
    .game-room-container {
      width: 100%;
      max-width: 1200px;
      background: rgba(10, 15, 35, 0.85);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .header {
      background: rgba(5, 10, 25, 0.9);
      padding: 20px 40px;
      text-align: center;
      border-bottom: 2px solid #00c6ff;
      position: relative;
    }
    
    .room-title {
      font-size: 2.2rem;
      font-weight: 700;
      background: linear-gradient(to right, #00c6ff, #0072ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    
    .room-id {
      font-size: 1.1rem;
      color: #a0a0c0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .room-id i {
      color: #00c6ff;
    }
    
    .timer {
      position: absolute;
      top: 20px;
      right: 40px;
      background: rgba(255, 255, 255, 0.1);
      padding: 10px 20px;
      border-radius: 50px;
      font-size: 1.8rem;
      font-weight: 700;
      color: #ffd700;
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
    }
    
    .content {
      display: flex;
      padding: 30px;
      gap: 30px;
    }
    
    .teams-container {
      flex: 1;
      display: flex;
      gap: 30px;
    }
    
    .team {
      flex: 1;
      background: rgba(20, 25, 50, 0.6);
      border-radius: 15px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .team:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }
    
    .team-red {
      border-color: #ff3860;
    }
    
    .team-blue {
      border-color: #00b5e2;
    }
    
    .team-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .team-name {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.8rem;
      font-weight: 700;
    }
    
    .team-red .team-name {
      color: #ff3860;
    }
    
    .team-blue .team-name {
      color: #00b5e2;
    }
    
    .team-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .team-red .team-icon {
      background: rgba(255, 56, 96, 0.2);
    }
    
    .team-blue .team-icon {
      background: rgba(0, 181, 226, 0.2);
    }
    
    .team-count {
      font-size: 1.2rem;
      color: #a0a0c0;
    }
    
    .players-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .player-card {
      background: rgba(30, 35, 60, 0.5);
      border-radius: 12px;
      padding: 15px;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
    }
    
    .player-card:hover {
      transform: translateX(5px);
      background: rgba(40, 45, 70, 0.7);
    }
    
    .player-card.ready {
      border-left-color: #00d1b2;
    }
    
    .player-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    
    .player-info {
      flex: 1;
    }
    
    .player-name {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 5px;
    }
    
    .player-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      color: #a0a0c0;
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    
    .status-dot.ready {
      background: #00d1b2;
      box-shadow: 0 0 8px #00d1b2;
    }
    
    .status-dot.not-ready {
      background: #ffdd57;
      box-shadow: 0 0 8px #ffdd57;
    }
    
    .player-level {
      background: rgba(255, 255, 255, 0.1);
      padding: 3px 10px;
      border-radius: 30px;
      font-size: 0.9rem;
    }
    
    .controls {
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      background: rgba(5, 10, 25, 0.9);
      border-top: 2px solid #00c6ff;
    }
    
    .start-button {
      background: linear-gradient(to right, #00c6ff, #0072ff);
      color: white;
      border: none;
      padding: 15px 50px;
      font-size: 1.4rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 114, 255, 0.4);
      letter-spacing: 1px;
    }
    
    .start-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 114, 255, 0.6);
    }
    
    .start-button:disabled {
      background: #4a5568;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .ready-button {
      background: rgba(0, 209, 178, 0.2);
      color: #00d1b2;
      border: 1px solid #00d1b2;
      padding: 10px 30px;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .ready-button:hover {
      background: rgba(0, 209, 178, 0.3);
      box-shadow: 0 0 15px rgba(0, 209, 178, 0.4);
    }
    
    .ready-button.ready {
      background: rgba(0, 209, 178, 0.3);
      box-shadow: 0 0 15px rgba(0, 209, 178, 0.4);
    }
    
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      background: rgba(5, 10, 25, 0.9);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #a0a0c0;
      font-size: 0.9rem;
    }
    
    .game-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .game-mode {
      background: rgba(0, 198, 255, 0.1);
      padding: 5px 15px;
      border-radius: 30px;
    }
    
    @media (max-width: 900px) {
      .teams-container {
        flex-direction: column;
      }
      
      .content {
        flex-direction: column;
      }
      
      .header, .footer {
        padding: 15px 20px;
      }
      
      .room-title {
        font-size: 1.8rem;
      }
      
      .timer {
        position: static;
        margin-top: 10px;
      }
    }
    
    @media (max-width: 600px) {
      .content {
        padding: 20px 15px;
      }
      
      .player-card {
        padding: 12px;
      }
      
      .player-avatar {
        width: 50px;
        height: 50px;
      }
      
      .player-name {
        font-size: 1.1rem;
      }
      
      .start-button {
        padding: 12px 40px;
        font-size: 1.2rem;
      }
    }

.players-list {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 16;
    padding: 10px;
}
</style>