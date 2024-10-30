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
      <h2 class="text-xl font-semibold mb-2">제목: {{ question.title }}</h2>
      <p class="text-sm text-gray-600">작성자: {{ question.writer }}</p>
      <p class="text-sm text-gray-600">작성일: {{ question.createdDate }}</p>
      <p class="text-sm text-gray-600">수정일: {{ question.modifiedDate }}</p>

      <div v-if="question.tags && question.tags.length > 0" class="mt-2">
        <p class="font-medium">태그:</p>
        <ul class="list-disc ml-5">
          <li v-for="(tag, index) in question.tags" :key="index" class="text-gray-700">{{ tag }}</li>
        </ul>
      </div>

      <div class="mt-4">
        <p class="text-base font-medium">내용:</p>
        <p class="text-gray-800 mb-4">{{ question.content }}</p>

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
import { useSearch } from '../../store/useSearch';

const pageStore = usePage();
const searchStore = useSearch();
const route = useRoute();
const router = useRouter();
const question = ref(null);

const moveToEdit = (qno) => {

  const currentPage = pageStore.currentPage;
  const searchParams = {
    type: searchStore.type,
    keyword: searchStore.keyword,
    tags: searchStore.tags ? searchStore.tags.join(',') : ''
  };

  router.push({ path: `/qna/question/edit/${qno}`, query: { page: currentPage, ...searchParams } });
};

const moveToList = () => {
  // 페이지와 검색 조건을 가져와서 쿼리스트링을 유지
  const currentPage = pageStore.currentPage;
  const searchParams = {
    type: searchStore.type,
    keyword: searchStore.keyword,
    tags: searchStore.tags ? searchStore.tags.join(',') : '' // tags 배열을 문자열로 변환
  };

  router.push({ path: `/qna/question/list/`, query: { page: currentPage, ...searchParams } });
};

onMounted(async () => {
  try {
    const qno = route.params.qno;
    const data = await getReadQuestion(qno);
    question.value = data.dtoList[0];

    // 쿼리스트링에서 페이지와 검색 조건 가져와 Pinia 상태로 저장
    const page = route.query.page ? parseInt(route.query.page, 10) : pageStore.currentPage;
    const type = route.query.type || searchStore.type || 'all';
    const keyword = route.query.keyword || searchStore.keyword || '';
    const tags = route.query.tags ? route.query.tags.split(',') : searchStore.tags || []; // tags를 추가합니다.

    pageStore.setCurrentPage(page);
    searchStore.setSearchParams(type, keyword, tags); // tags를 상태에 저장합니다.
  } catch (error) {
    console.error('Failed to fetch question details:', error);
  }
});

</script>
