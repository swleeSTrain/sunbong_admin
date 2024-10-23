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
      <tr v-for="post in posts" :key="post.bno" class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b border-gray-300">{{ post.bno }}</td>
        <td class="px-4 py-2 border-b border-gray-300">
          <router-link :to="{ path: `/board/read/${post.bno}` }" class="text-blue-500 hover:underline">
            {{ post.title }}
          </router-link>
        </td>
        <td class="px-4 py-2 border-b border-gray-300">{{ post.author || 'Anonymous' }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="flex justify-between items-center mt-6">
      <button
          @click="prevPage"
          :disabled="!pagination.prev"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300"
      >
        Previous
      </button>

      <span class="text-gray-700">
        Page {{ pagination.current }} of {{ pagination.totalPage }}
      </span>

      <button
          @click="nextPage"
          :disabled="!pagination.next"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBoardList } from '../../apis/boardAPI';

const posts = ref([]);
const pagination = ref({
  current: 1,
  totalPage: 1,
  prev: false,
  next: false,
});

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

// 페이지네이션 처리 함수
const nextPage = () => {
  if (pagination.value.next) {
    pagination.value.current++;
    fetchBoardList();
  }
};

const prevPage = () => {
  if (pagination.value.prev) {
    pagination.value.current--;
    fetchBoardList();
  }
};

// 컴포넌트가 마운트될 때 게시글 리스트를 가져옴
onMounted(fetchBoardList);
</script>
