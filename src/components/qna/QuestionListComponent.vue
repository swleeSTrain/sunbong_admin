<template>
  <h1 class="text-2xl font-bold mb-4">Question List Component</h1>

  <!-- 질문 목록 출력 -->
  <ul class="list-none p-0">
    <li v-for="question in questionList" :key="question.qno" class="py-2 border-b border-gray-300">
      <span class="font-medium">{{ question.title }}</span>
      <span class="text-sm text-gray-500"> - {{ question.writer }}</span>
      <span class="text-xs text-gray-400"> - {{ question.createdDate }}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getListQuestion } from '../../apis/QnaAPI.js';

// 질문 리스트를 저장할 ref 변수
const questionList = ref([]);

// 컴포넌트가 마운트될 때 데이터 로드
onMounted(async () => {
  try {
    const data = await getListQuestion();
    // dtoList 배열만 추출하여 questionList에 할당
    questionList.value = data.dtoList;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
  }
});
</script>