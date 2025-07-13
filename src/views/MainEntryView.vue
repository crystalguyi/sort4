<template>
    <el-container>
        <el-header style="height: 100px;">
        </el-header>
        <el-container style="height: 1000px">
                <!-- 主房间content  -->
                <el-main class="gy-chat-room-content">
                    <div>
                        <!-- <GameView></GameView> -->
                        <ChatDialog></ChatDialog>
                        <el-button @click="btnAAclick">开始监听</el-button>
                    </div>

                    <audio id="testAudio" autoplay="autoplay"></audio>
                </el-main>   
            

                <!-- 聊天框 -->
                <el-aside class="gy-chat-room-chatlist-container">
                    <chatter></chatter>
                </el-aside>
        </el-container>
        <el-footer style="height: 100px;">

        </el-footer>
    </el-container>
</template>


<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import * as signalR from '@microsoft/signalr'

import chatter from '@/components/chatter.vue'
import GameView from '../components/GameView.vue'
import ChatDialog from '../components/ChatDialog.vue'

let chatHub;

const router = useRouter();
const baseApi = axios.create({
    baseURL: 'http://localhost:1145'
});

const count = ref(0);
const status1 = ref("off")
const status2 = ref("off")

const addRoom = async () => {
    const response = await baseApi.post('/createRoom');
    if(response.data.success){
        router.push('/waitingRoom');
    }
}

onBeforeMount(() => {
    // chatHub = new signalR.HubConnectionBuilder()
    //     .withUrl("https://localhost:5000/chatHub", {
    //         skipNegotiation: true, // 可选
    //         transport: signalR.HttpTransportType.WebSockets,
    //         withCredentials: true // 必须包含
    //     })
    //     .configureLogging(signalR.LogLevel.Debug) // 启用详细日志
    //     .build();
    // chatHub.on("ShowMsg", showMsg);
    // chatHub.start();
})

let testaudio;

onMounted(() => {   
    testaudio = document.getElementById("testAudio")
})

function showMsg(msg){   
    console.log(msg)
}

function PushMsg(){
    axios.get('https://localhost:5000/WeatherForecast/PushMsg', {
        params: { content: status1.value },
        withCredentials: true // 包含凭据
    }).then( response => {
        console.log(response)
    });
}

let localstream;

async function  btnAAclick(){
    localstream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    testaudio.srcObject = localstream

}

</script>
<style>
.gy-chat-room-content{
    background-color: beige;
    width: 300px;
}

.gy-chat-room-chatlist-containe{
    width: 1fr;
}

</style>