<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Question Detail</h1>
    <div v-if="question">
      <h2 class="text-xl font-bold">{{ question.questionTitle }}</h2>
      <p class="text-sm text-gray-500">작성자: {{ question.questionWriter }}</p>
      <p class="text-xs text-gray-400">작성일: {{ question.questionCreatedDate }}</p>
      <div class="mt-4">
        <p>{{ question.questionContent }}</p>
        <div v-if="question.attachFiles && question.attachFiles.length > 0">
          <h3 class="font-medium mt-4">첨부 이미지:</h3>
          <div class="grid grid-cols-3 gap-4">
            <img
                v-for="file in question.attachFiles"
                :key="file"
                :src="`/uploads/${file}`"
                alt="첨부 이미지"
                class="w-full h-auto border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getReadQuestion } from '../../apis/QnaAPI.js';

const route = useRoute();
const question = ref(null);

onMounted(async () => {
  try {
    const qno = route.params.qno;
    const data = await getReadQuestion(qno);
    question.value = data;
  } catch (error) {
    console.error('Failed to fetch question details:', error);
  }
});
</script>