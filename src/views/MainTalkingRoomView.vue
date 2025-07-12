<script setup>
import { onMounted, ref } from "vue";

const selectedDevice = ref('');

const getMicrophoneAccess = async () => {
          try {
            // 请求麦克风权限
            const localStream = await navigator.mediaDevices.getUserMedia({ 
              audio: true, 
              video: false 
            });
            
            // micActive.value = true;
            
            // 获取设备信息
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log(devices)
            const audioInputs = devices.filter(device => device.kind === 'audioinput');
            if (audioInputs.length > 0) {
                selectedDevice.value = audioInputs[0].label;
            }
            
            // // 初始化音频可视化
            // initAudioVisualization(localStream, localVisualizer.value);
            
          } catch (error) {
            console.error('获取麦克风权限失败:', error);
            alert('无法访问麦克风，请检查权限设置');
          }
        };

// 在用户交互后请求权限
const handleClick = () => {
  getMicrophoneAccess();
};

const testAudio = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video:false});
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream)
    source.connect(audioCtx.destination)
}


</script>
<template>
  <button @click="testAudio">
    获取麦克风权限
  </button>
  <div v-if="selectedDevice">已选择: {{ selectedDevice }}</div>
</template>

