<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Question Read Component</h1>

    <div class="mb-4">
      <button
          class="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition duration-200"
          @click="moveToList()">
        LIST
      </button>
    </div>

    <div class="mb-4">
      <button
          class="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition duration-200"
          @click="moveToEdit(question.qno)">
        EDIT
      </button>
    </div>

    <div v-if="question">
      <h2 class="text-xl font-semibold mb-2">제목: {{ question.questionTitle }}</h2>
      <p class="text-sm text-gray-600">작성자: {{ question.questionWriter }}</p>
      <p class="text-sm text-gray-600">작성일: {{ question.questionCreatedDate }}</p>

      <div class="mt-4">
        <p class="text-base font-medium">내용:</p>
        <p class="text-gray-800 mb-4">{{ question.questionContent }}</p>

        <div v-if="question.attachFiles && question.attachFiles.length > 0">
          <h3 class="font-medium mt-4">첨부 이미지:</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <img
                v-for="(file, index) in question.attachFiles"
                :key="index"
                :src="`http://localhost:8080/uploads/${file}`"
                alt="첨부 이미지"
                class="w-full h-auto border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      <AnswerReadComponent :answers="question.answers" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getReadQuestion } from '../../apis/QnaAPI.js';
import AnswerReadComponent from './AnswerReadComponent.vue';
import { usePage } from '../../store/usePage';
import { useSearch } from '../../store/useSearch'; // 검색 조건 스토어 가져오기

// Pinia에서 페이지 및 검색 조건 스토어 가져오기
const pageStore = usePage();
const searchStore = useSearch();
const route = useRoute();
const router = useRouter();
const question = ref(null);

// 수정 페이지로 이동
const moveToEdit = (qno) => {
  router.push(`/qna/question/edit/${qno}`);
};

// 리스트 페이지로 이동
const moveToList = () => {
  // Pinia에서 현재 페이지를 가져와 쿼리스트링에 붙이기
  const currentPage = pageStore.currentPage;
  router.push({ path: `/qna/question/list/`, query: { page: currentPage } });
};

onMounted(async () => {
  try {
    const qno = route.params.qno;
    const data = await getReadQuestion(qno);
    question.value = data.dtoList[0];

    // Pinia에서 현재 페이지와 검색 조건을 가져와 쿼리스트링에 붙이기
    const currentPage = pageStore.currentPage;
    const searchParams = {
      type: searchStore.type,    // 검색 타입
      keyword: searchStore.keyword // 검색 키워드
    };

    router.push({ query: { page: currentPage, ...searchParams } });

  } catch (error) {
    console.error('Failed to fetch question details:', error);
  }
});
</script>

