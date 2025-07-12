<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MainEntry from './views/MainEntryView.vue'
import WaitingRoom from './views/WaitingRoom.vue'
import VoiceRoom from './views/VoiceRoom.vue'
</script>

<template>
   <!-- <MainEntry></MainEntry>
  <WaitingRoom></WaitingRoom> -->
  <MainEntry></MainEntry>
<!--   
  <router-view></router-view> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
