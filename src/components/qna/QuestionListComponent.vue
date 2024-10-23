<template>
  <h1 class="text-2xl font-bold mb-4">Question List Component</h1>

<!-- 질문 목록 -->
  <ul class="list-none p-0">
    <li v-for="question in result.dtoList"
        :key="question.qno"
        class="py-2 border-b border-gray-300">
      <span class="font-medium">{{ question.title }}</span>
      <span class="text-sm text-gray-500"> - {{ question.writer }}</span>
      <span class="text-xs text-gray-400"> - {{ question.createdDate }}</span>
      <span class="text-xs text-gray-400"> - {{ question.answerCount }}</span>
    </li>
  </ul>

<!-- 페이징처리 -->
  <nav aria-label="Page navigation">
    <ul class="inline-flex items-center space-x-1">
      <li v-for="page in pageArr" :key="page.page">
        <button
            class="px-3 py-1 rounded"
            :class="{ 'bg-blue-500 text-white': page.page === result.pageRequestDTO.page, 'bg-gray-200': page.page !== result.pageRequestDTO.page }"
            @click="loadPageData(page.page)">
          {{ page.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import useListData from '../../hooks/useListData.js';
import { getListQuestion } from '../../apis/QnaAPI.js';

// useListData 훅 호출
const { result, pageArr, loadPageData } = useListData(getListQuestion);
</script>
