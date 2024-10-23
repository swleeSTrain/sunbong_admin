<template>
  <div class="board-list max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">자유게시판</h2>

    <table class="min-w-full table-auto bg-white border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th class="px-4 py-2 text-left border-b-2 border-gray-300">글번호</th>
        <th class="px-4 py-2 text-left border-b-2 border-gray-300">Title</th>
        <th class="px-4 py-2 text-left border-b-2 border-gray-300">Author</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key="post.bno" class="hover:bg-gray-50 relative">
        <td class="px-4 py-2 border-b border-gray-300">{{ post.bno }}</td>
        <td class="px-4 py-2 border-b border-gray-300">
          <router-link
              :to="{ path: `/board/read/${post.bno}` }"
              class="text-blue-500 hover:underline relative"
              @mouseover="showImage(post.fileName)"
              @mouseleave="hideImage"
          >
            {{ post.title }}
          </router-link>

          <!-- 이미지 미리보기 -->
          <div v-if="hoveredImage === post.fileName" class="absolute left-0 top-8 z-10">
            <img :src="getImageUrl(post.fileName)" class="w-32 h-auto shadow-md" alt="Preview Image" />
          </div>
        </td>
        <td class="px-4 py-2 border-b border-gray-300">{{ post.author || 'Anonymous' }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="flex justify-between items-center mt-6">
      <button
          @click="prevPage"
          :disabled="pagination.current <= 1"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300"
      >
        Previous
      </button>

      <span class="text-gray-700">
        Page {{ pagination.current }} of {{ pagination.totalPage }}
      </span>

      <button
          @click="nextPage"
          :disabled="pagination.current >= pagination.totalPage"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watchEffect} from 'vue';
import { getBoardList } from '../../apis/boardAPI';
import {useRoute, useRouter} from "vue-router";

const posts = ref([]);
const hoveredImage = ref(null); // 마우스 오버된 이미지
const pagination = ref({
  current: 1,
  totalPage: 1,
  prev: false,
  next: false,
});
const router = useRouter()
const route = useRoute()
// 게시글 리스트를 가져오는 함수
const fetchBoardList = async () => {
  try {
    const response = await getBoardList(pagination.value.current);
    posts.value = response.dtoList; // 게시글 목록
    pagination.value.current = response.pageRequestDTO.page; // 현재 페이지
    pagination.value.totalPage = response.totalPage; // 전체 페이지 수
    pagination.value.prev = response.prev; // 이전 페이지 존재 여부
    pagination.value.next = response.next; // 다음 페이지 존재 여부
  } catch (error) {
    console.error("Failed to fetch board list:", error);
  }
};

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

// Query 파라미터에서 페이지 번호 감지 및 데이터 가져오기
watchEffect(() => {
  const pageQuery = route.query.page;
  let page = 1;

  // query.page가 배열로 올 가능성을 대비해 배열인지 문자열인지 처리
  if (Array.isArray(pageQuery)) {
    page = parseInt(pageQuery[0], 10) || 1;
  } else {
    page = parseInt(pageQuery, 10) || 1;
  }

  // 페이지 값이 바뀔 때마다 해당 페이지의 데이터 가져오기
  fetchBoardList(page);
});

// 페이지네이션 처리 함수
const nextPage = () => {
  if (pagination.value.current < pagination.value.totalPage) {
    router.push({ query: { page: (pagination.value.current + 1).toString() } });
  }
};

const prevPage = () => {
  if (pagination.value.current > 1) {
    router.push({ query: { page: (pagination.value.current - 1).toString() } });
  }
};


</script>

<style scoped>
/* 이미지 미리보기 스타일 추가 */
img {
  transition: opacity 0.3s ease;
}
</style>
