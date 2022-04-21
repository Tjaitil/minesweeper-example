<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import GameContainer from './components/GameContainer.vue'
</script>

<template>
  <h1> Minesweeper example made with Vue </h1>
  <GameContainer />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 2rem;
  margin-inline: auto;
  max-width: 704px;
  padding: 0 1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
