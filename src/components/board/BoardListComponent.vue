<template>
  <div class="board-list max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">자유게시판</h2>
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
    <button @click="navigateToCreate" class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">게시물 작성</button>
    <div class="space-y-4 mt-4">
      <div v-for="result in result.dtoList" :key="result.bno" class="flex items-center border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer" @click="moveToRead(result.bno)">
        <img v-if="result.fileName !=''" :src="getImageUrl(result.fileName)" class="w-16 h-auto mr-4" alt="Preview Image" />
        <div class="flex-grow">
          <h3 class="text-lg font-semibold">{{ result.title }}</h3>
          <p class="text-gray-600">작성자: {{ result.writer || 'Anonymous' }}</p>
          <p class="text-gray-600">글번호: {{ result.bno }}</p>
          <p class="text-sm text-gray-500">작성일: {{ formatDate(result.createTime) }}</p>
          <p v-if="shouldDisplayUpdateDate(result.createTime, result.updateTime)" class="text-sm text-gray-500">
            수정일: {{ formatDate(result.updateTime) }}
          </p>
        </div>
      </div>
    </div>

    <!-- 페이징 및 기타 컨트롤은 기존과 동일 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useBoardListData from '../../hooks/useBoardListData.js';
import { getBoardList } from '../../apis/boardAPI';
import {viewFileImage} from "../../apis/FileAPI.js";

const router = useRouter();
const hoveredImage = ref(null);

const showImage = (image) => {
  hoveredImage.value = image;
};

const hideImage = () => {
  hoveredImage.value = null;
};

const getImageUrl = (fileName) => {
  return viewFileImage(fileName);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const shouldDisplayUpdateDate = (createTime, updateTime) => {
  return createTime !== updateTime;
};

const navigateToCreate = () => {
  router.push('/board/add');
};

const { result, pageArr, loadPageData, searchParams, search, moveToRead } = useBoardListData(getBoardList);
</script>

<style scoped>
img {
  transition: opacity 0.3s ease;
}
</style>
