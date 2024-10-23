<template>
  <h1>Question List Component</h1>

  <!-- 질문 목록 출력 -->
  <ul>
    <li v-for="question in questionList" :key="question.qno">
      {{ question.title }} - {{ question.writer }} - {{ question.createdDate }}
    </li>
  </ul>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {getListQuestion} from '../../apis/QnaAPI.js';

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

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}
</style>
