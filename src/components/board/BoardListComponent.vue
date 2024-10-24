<template>
  <div class="board-list max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">자유게시판</h2>
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
    <table class="min-w-full table-auto bg-white border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th class="px-4 py-2 text-left border-b-2 border-gray-300">글번호</th>
        <th class="px-4 py-2 text-left border-b-2 border-gray-300">Title</th>
        <th class="px-4 py-2 text-left border-b-2 border-gray-300">Author</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="result in result.dtoList" :key="result.bno" class="hover:bg-gray-50 relative">
        <td class="px-4 py-2 border-b border-gray-300">{{ result.bno }}</td>
        <td class="px-4 py-2 border-b border-gray-300">
          <router-link
              :to="{ path: `/board/read/${result.bno}` }"
              class="text-blue-500 hover:underline relative"
              @mouseover="showImage(result.fileName)"
              @mouseleave="hideImage"
          >
            {{ result.title }}
          </router-link>

          <!-- 이미지 미리보기 -->
          <div v-if="hoveredImage === result.fileName" class="absolute left-0 top-8 z-10">
            <img :src="getImageUrl(result.fileName)" class="w-32 h-auto shadow-md" alt="Preview Image" />
          </div>
        </td>
        <td class="px-4 py-2 border-b border-gray-300">{{ result.author || 'Anonymous' }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이징 처리 -->
    <nav aria-label="Page navigation" class="mt-4">
      <ul class="inline-flex items-center space-x-px">
        <!-- 이전 페이지 버튼 -->
        <li v-if="result.pageRequestDTO.page > 1">
          <button
              @click="loadPageData(result.pageRequestDTO.page - 1)"
              class="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
          >
            이전
          </button>
        </li>

        <!-- 페이지 번호 버튼 -->
        <li v-for="page in pageArr" :key="'page-' + page.page">
          <button
              @click="loadPageData(page.page)"
              :class="{ 'bg-blue-500 text-white': page.page === result.pageRequestDTO.page, 'bg-gray-200': page.page !== result.pageRequestDTO.page }"
              class="px-3 py-1 hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            {{ page.label }}
          </button>
        </li>

        <!-- 다음 페이지 버튼 -->
        <li v-if="result.pageRequestDTO.page < result.totalPage">
          <button
              @click="loadPageData(result.pageRequestDTO.page + 1)"
              class="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
    <!-- 게시글 작성 버튼 -->
    <div class="flex justify-end mt-6">
      <button
          @click="$router.push('/board/add')"
          class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
      >
        새 글 작성
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { getBoardList } from '../../apis/boardAPI';


const hoveredImage = ref(null); // 마우스 오버된 이미지

import useListData from '../../hooks/useListData.js';

// 마우스 오버 시 이미지 보여주기
const showImage = (image) => {
  hoveredImage.value = image;
};

// 마우스가 떠나면 이미지 숨기기
const hideImage = () => {
  hoveredImage.value = null;
};

// 이미지 URL 생성 함수 (예시)
const getImageUrl = (fileName) => {
  return `http://localhost:8080/uploads/${fileName}`;
};

// useListData 훅 호출
const { result, pageArr, loadPageData, moveToRead, searchParams, search } = useListData(getBoardList);

</script>

<style scoped>
/* 이미지 미리보기 스타일 추가 */
img {
  transition: opacity 0.3s ease;
}
</style>
