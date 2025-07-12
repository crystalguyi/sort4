<template>
    <div class="voice-chat-container">
      <div class="room-controls">
        <input v-model="roomId" placeholder="输入房间ID" />
        <button @click="joinRoom" :disabled="isInRoom">加入房间</button>
        <button @click="leaveRoom" :disabled="!isInRoom">离开房间</button>
      </div>
  
      <div class="audio-controls">
        <button @click="toggleMute" :class="{ active: isMuted }">
          {{ isMuted ? '取消静音' : '静音' }}
        </button>
        <button @click="toggleDeafen" :class="{ active: isDeafened }">
          {{ isDeafened ? '取消聋音' : '聋音' }}
        </button>
      </div>
  
      <div class="participants">
        <div v-for="participant in participants" :key="participant.id" class="participant">
          <div class="avatar">{{ participant.name.charAt(0) }}</div>
          <div class="info">
            <div class="name">{{ participant.name }}</div>
            <div class="status">
              <span class="mic" :class="{ muted: participant.isMuted }"></span>
              <span class="volume-indicator" :style="{ width: participant.volume + '%' }"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as signalR from '@microsoft/signalr';
  
  const roomId = ref('');
  const isInRoom = ref(false);
  const isMuted = ref(false);
  const isDeafened = ref(false);
  const participants = ref([]);
  const chatHub = ref(null);
  const peerConnections = ref({});
  const localStream = ref(null);
  const audioContext = ref(null);
  
  // 生成随机用户名
  const userName = ref(`用户${Math.floor(Math.random() * 1000)}`);
  
  // 初始化SignalR连接
  const initSignalR = () => {
    chatHub.value = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5000/voiceChatHub", {
            skipNegotiation: true, // 可选
            transport: signalR.HttpTransportType.WebSockets,
            withCredentials: true // 必须包含
        })
      .configureLogging(signalR.LogLevel.Information)
      .build();
  
    // 新用户加入处理
    chatHub.value.on("NewPeer", (connectionId) => {
      createPeerConnection(connectionId);
    });
  
    // 已有用户处理
    chatHub.value.on("ExistingPeers", (existingPeerIds) => {
      existingPeerIds.forEach(connectionId => {
        createPeerConnection(connectionId);
      });
    });
  
    // 用户离开处理
    chatHub.value.on("PeerLeft", (connectionId) => {
      if (peerConnections.value[connectionId]) {
        peerConnections.value[connectionId].close();
        delete peerConnections.value[connectionId];
      }
      participants.value = participants.value.filter(p => p.id !== connectionId);
    });
  
    // 接收信令消息
    chatHub.value.on("ReceiveSignal", (senderId, signal) => {
      if (peerConnections.value[senderId]) {
        try {
          const parsedSignal = JSON.parse(signal);
          if (parsedSignal.sdp) {
            peerConnections.value[senderId].setRemoteDescription(
              new RTCSessionDescription(parsedSignal)
            ).then(() => {
              if (parsedSignal.type === 'offer') {
                peerConnections.value[senderId].createAnswer()
                  .then(answer => {
                    return peerConnections.value[senderId].setLocalDescription(answer);
                  })
                  .then(() => {
                    chatHub.value.invoke("SendSignal", senderId, 
                      JSON.stringify(peerConnections.value[senderId].localDescription));
                  });
              }
            });
          } else if (parsedSignal.candidate) {
            peerConnections.value[senderId].addIceCandidate(
              new RTCIceCandidate(parsedSignal)
            );
          }
        } catch (e) {
          console.error("信令处理错误:", e);
        }
      }
    });
  
    chatHub.value.start()
      .catch(err => console.error("SignalR连接失败:", err));
  };
  
  // 创建WebRTC对等连接
  const createPeerConnection = (connectionId) => {
    if (peerConnections.value[connectionId]) return;
  
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        // 生产环境需要添加TURN服务器
      ]
    });
  
    // 添加本地音轨
    if (localStream.value) {
      localStream.value.getTracks().forEach(track => {
        pc.addTrack(track, localStream.value);
      });
    }
  
    // ICE候选处理
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        chatHub.value.invoke("SendSignal", connectionId, 
          JSON.stringify({ candidate: event.candidate }));
      }
    };
  
    // 远程流处理
    pc.ontrack = (event) => {
      const audio = new Audio();
      audio.srcObject = event.streams[0];
      audio.autoplay = true;
      
      if (!isDeafened.value) {
        audio.play().catch(e => console.log("音频播放错误:", e));
      }
      
      // 添加到参与者列表
      participants.value.push({
        id: connectionId,
        name: `用户${connectionId.substring(0, 4)}`,
        audioElement: audio,
        isMuted: false,
        volume: 50
      });
      
      // 创建音频分析器（可选）
      setupAudioAnalyser(connectionId, event.streams[0]);
    };
  
    // 创建offer
    pc.createOffer()
      .then(offer => {
        return pc.setLocalDescription(offer);
      })
      .then(() => {
        chatHub.value.invoke("SendSignal", connectionId, 
          JSON.stringify(pc.localDescription));
      });
  
    peerConnections.value[connectionId] = pc;
  };
  
  // 设置音频分析器（用于音量指示器）
  const setupAudioAnalyser = (connectionId, stream) => {
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const analyser = audioContext.value.createAnalyser();
    const source = audioContext.value.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 32;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const avg = sum / bufferLength;
      
      // 更新参与者音量
      const participant = participants.value.find(p => p.id === connectionId);
      if (participant) {
        participant.volume = Math.min(100, Math.max(0, avg * 2));
      }
      
      requestAnimationFrame(updateVolume);
    };
    
    updateVolume();
  };
  
  // 获取音频设备
  const getAudioDevice = async () => {
    try {
      localStream.value = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      
      // 创建本地音频元素（可选）
      const localAudio = new Audio();
      localAudio.srcObject = localStream.value;
      localAudio.volume = 0.5; // 本地音频静音，避免回声
      
      // 添加到参与者列表（自己）
      participants.value.push({
        id: "local",
        name: userName.value,
        isMuted: isMuted.value,
        volume: 0
      });
    } catch (err) {
      console.error("获取麦克风失败:", err);
      alert("无法访问麦克风，请检查权限设置");
    }
  };
  
  // 加入房间
  const joinRoom = async () => {
    if (!roomId.value) {
      alert("请输入房间ID");
      return;
    }
    
    if (!chatHub.value) {
      initSignalR();
    }
    
    await getAudioDevice();
    await chatHub.value.invoke("JoinRoom", roomId.value);
    isInRoom.value = true;
  };
  
  // 离开房间
  const leaveRoom = async () => {
    if (chatHub.value && isInRoom.value) {
      await chatHub.value.invoke("LeaveRoom");
      isInRoom.value = false;
      
      // 关闭所有对等连接
      Object.values(peerConnections.value).forEach(pc => pc.close());
      peerConnections.value = {};
      
      // 停止本地流
      if (localStream.value) {
        localStream.value.getTracks().forEach(track => track.stop());
        localStream.value = null;
      }
      
      // 移除其他参与者
      participants.value = participants.value.filter(p => p.id === "local");
    }
  };
  
  // 切换静音
  const toggleMute = () => {
    isMuted.value = !isMuted.value;
    if (localStream.value) {
      localStream.value.getAudioTracks().forEach(track => {
        track.enabled = !isMuted.value;
      });
    }
    
    // 更新本地参与者状态
    const localParticipant = participants.value.find(p => p.id === "local");
    if (localParticipant) {
      localParticipant.isMuted = isMuted.value;
    }
  };
  
  // 切换聋音（关闭所有远程音频）
  const toggleDeafen = () => {
    isDeafened.value = !isDeafened.value;
    participants.value.filter(p => p.id !== "local").forEach(participant => {
      if (participant.audioElement) {
        participant.audioElement.volume = isDeafened.value ? 0 : 1;
      }
    });
  };
  
  // 组件卸载时清理
  onBeforeUnmount(() => {
    leaveRoom();
    if (chatHub.value) {
      chatHub.value.stop();
    }
    if (audioContext.value) {
      audioContext.value.close();
    }
  });
  </script>
  
  <style scoped>
  .voice-chat-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #1e1f29;
    border-radius: 10px;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .room-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .room-controls input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #2c2d3a;
    color: white;
  }
  
  .room-controls button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background: #4a4e69;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .room-controls button:hover:not(:disabled) {
    background: #5a5f7f;
  }
  
  .room-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .audio-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .audio-controls button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #3a3e5c;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .audio-controls button.active {
    background: #f25f5c;
  }
  
  .audio-controls button:hover {
    background: #4a4f6d;
  }
  
  .participants {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .participant {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #2c2d3a;
    border-radius: 8px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #4a4e69;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
  }
  
  .info {
    flex: 1;
  }
  
  .name {
    font-weight: 500;
    margin-bottom: 5px;
  }
  
  .status {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .mic {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #4ade80;
  }
  
  .mic.muted {
    background: #f87171;
  }
  
  .volume-indicator {
    height: 6px;
    background: #4ade80;
    border-radius: 3px;
    transition: width 0.1s;
  }
  </style>