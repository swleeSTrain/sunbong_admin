<!-- Answer Read Component -->
<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Answer Read Component</h1>

    <hr class="my-4" />
    <div v-for="(answer, index) in answers" :key="index" class="mt-4 border-b pb-4">
      <div class="flex flex-col">
        <p class="text-sm text-gray-700 font-medium">내용:</p>
        <p class="text-sm text-gray-800 mb-2">{{ answer.content }}</p>
        <p class="text-sm text-gray-600">작성자: {{ answer.writer }}</p>
        <p class="text-sm text-gray-600">작성일: {{ answer.createdDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
});
</script>
