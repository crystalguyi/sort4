import { createApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import './style.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import MainEntryView from './views/MainEntryView.vue'
import MainTalkingRoomView from './views/MainTalkingRoomView.vue'
import WaitingRoom from './views/WaitingRoom.vue'
import VoiceRoom from './views/VoiceRoom.vue'

const routes = [
    {path: '/MainEntry', component: WaitingRoom},
    {path: '/', component: MainEntryView},
    {path: '/voice', component: VoiceRoom},
] 

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

createApp(App)
.use(ElementPlus)
.use(router)
.mount('#app')
