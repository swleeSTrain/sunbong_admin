<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Question List</h1>

    <!-- 검색 필드 -->
    <div class="flex items-center space-x-2 mb-4">
      <select v-model="searchParams.type" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="content">Content</option>
        <option value="writer">Writer</option>
      </select>
      <input
          v-model="searchParams.keyword"
          type="text"
          placeholder="검색어를 입력하세요"
          class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button @click="search" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
        검색
      </button>
    </div>

    <!-- 질문 리스트 -->
    <ul class="divide-y divide-gray-300">
      <li v-for="question in result.dtoList"
          :key="question.qno"
          class="py-4 cursor-pointer hover:bg-gray-100"
          @click="moveToRead(question.qno)">
        <div class="flex justify-between">
          <span class="font-medium text-lg">{{ question.title }}</span>
          <span class="text-sm text-gray-500">{{ question.createdDate }}</span>
        </div>
        <div class="text-sm text-gray-500">
          <span>{{ question.writer }}</span>
          <span class="ml-2">답변: {{ question.answerCount }}</span>
        </div>
      </li>
    </ul>

    <!-- 페이징 처리 -->
    <nav class="mt-6 flex justify-center">
      <ul class="inline-flex items-center space-x-1">
        <li v-for="page in pageArr" :key="page.page">
          <button
              class="px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'bg-blue-500 text-white': page.page === result.pageRequestDTO.page, 'bg-gray-200 text-gray-700': page.page !== result.pageRequestDTO.page }"
              @click="loadPageData(page.page)">
            {{ page.label }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import useListData from '../../hooks/useQnaListData.js';
import { getListQuestion } from '../../apis/QnaAPI.js';

const { result, pageArr, loadPageData, moveToRead, searchParams, search } = useListData(getListQuestion);
</script>
