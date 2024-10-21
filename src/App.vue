<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="flex justify-center space-x-4">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo transition hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo transition hover:drop-shadow-[0_0_2em_#42b883aa]" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
/* Tailwind로 교체했으므로 기존 스타일을 제거합니다 */
</style>
