<template>
    <div class="chat-background">
        <el-scrollbar ref="scrollbar" style="height: 200px;">
            <div v-for="(message, index) in messages" :key="index" 
            :class="['message', message.sender]">
                <div class="username" v-if="message.sender === 'received'">
                    {{ message.username }}
                </div>
                <div class="message-content">
                    {{ message.content }}
                </div>
                <div class="timestamp">
                    {{ message.time }}
                </div>
            </div>
        </el-scrollbar>
        <div style="display: flex; justify-content: flex-start;">
            <el-input 
                type="text" 
                class="input-area" 
                placeholder="说点什么..." 
                v-model="userMsg"/>
            <el-button class="gy-send-button">发送</el-button>
        </div>     
    </div>
</template>

<script setup>
import { ref } from 'vue';
let userMsg = ref('');
const scrollbar = ref(null);

const messages = ref([
    {
        sender:"received",
        username:"guyi",
        content:"xiexieni",
        time: "123"
    }
])

</script>

<style>

    .chat-background{
        background-color: black;
        padding-top: 15px;
    }

    .float-div{
        float: left;
    }

    .messages-area {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
      display: flex;
      flex-direction: column-reverse;
    }
    
    .message {
      margin-bottom: 15px;
      padding: 10px 15px;
      border-radius: 18px;
      max-width: 85%;
      word-break: break-word;
      animation: fadeIn 0.3s;
      position: relative;
    }
    
    .received {
      background: rgba(255, 255, 255, 0.15);
      align-self: flex-start;
      border-top-left-radius: 5px;
    }
    
    .sent {
      background: linear-gradient(90deg, #ff3366, #ff6699);
      align-self: flex-end;
      border-top-right-radius: 5px;
    }
    
    .username {
      font-weight: bold;
      margin-bottom: 4px;
      font-size: 13px;
    }
    
    .message-content {
      line-height: 1.5;
    }
    
    .timestamp {
      font-size: 10px;
      opacity: 0.7;
      text-align: right;
      margin-top: 4px;
    }
    .input-area {
      margin-left: 10px;
      padding: 15;
      background: rgba(0, 0, 0, 0.8);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      width: 80%;
      left: 0;
    }
    
    .gy-send-button {
      background: linear-gradient(90deg, #ff3366, #ff6699);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .send-button:hover {
      transform: scale(1.05);
    }
    
    .input-group {
      display: flex;
      gap: 10px;
    }
    
    .message-input {
      flex: 1;
    }

</style>