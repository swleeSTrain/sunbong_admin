<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Question Detail</h1>
    <div v-if="question">
      <h2 class="text-xl font-bold">{{ question.questionTitle }}</h2>
      <p class="text-sm text-gray-500">작성자: {{ question.questionWriter }}</p>
      <p class="text-sm text-gray-500">작성일: {{ question.questionCreatedDate }}</p>
      <div class="mt-4">
        <p>{{ question.questionContent }}</p>
        <div v-if="question.attachFiles && question.attachFiles.length > 0">
          <h3 class="font-medium mt-4">첨부 이미지:</h3>
          <div class="grid grid-cols-3 gap-4">
            <img
                v-for="(file, index) in question.attachFiles"
                :key="index"
                :src="`http://localhost:8080/uploads/${file}`"
                alt="첨부 이미지"
                class="w-full h-auto border rounded-md"
            />

          </div>
        </div>
      </div>

      <!-- 답변 목록 -->
      <p class="text-sm text-gray-500 mt-4">=======================</p>
      <p class="text-sm text-gray-500">답변</p>
      <div v-for="(answer, index) in question.answers" :key="index" class="mt-2 border-b pb-2">
        <p class="text-sm text-gray-500">내용: {{ answer.answerContent }}</p>
        <p class="text-sm text-gray-500">작성자: {{ answer.answerWriter }}</p>
        <p class="text-sm text-gray-500">작성날짜: {{ answer.answerCreatedDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {getReadQuestion} from '../../apis/QnaAPI.js';

const question = ref(null);

const route = useRoute();

onMounted(async () => {
  try {
    const qno = route.params.qno;
    const data = await getReadQuestion(qno);
    question.value = data.dtoList[0];  // dtoList에서 첫 번째 항목을 사용
  } catch (error) {
    console.error('Failed to fetch question details:', error);
  }
});
</script>
