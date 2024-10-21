<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1 className="text-sm font-semibold text-gray-300 underline">테일윈드 테스트</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
