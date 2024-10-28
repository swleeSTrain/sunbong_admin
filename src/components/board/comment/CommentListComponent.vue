<!-- CommentList.vue -->
<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h3 class="text-2xl font-bold text-gray-800 mb-4">댓글 목록</h3>
    <ul v-if="comments.length > 0" class="space-y-4">
      <li v-for="comment in comments" :key="comment.cno"
          class="bg-gray-50 p-4 rounded-lg shadow">
        <div class="flex justify-between items-center text-sm text-gray-500">
          <span>작성자: {{ comment.writer }}</span>
          <span>작성일: {{ formatDate(comment.createTime) }}</span>
        </div>
        <p class="text-gray-800 mb-2">{{ comment.content }}</p>
        <button @click="deleteComment(comment.cno)"
                class="mt-2 text-red-500 hover:text-red-700 focus:outline-none">
          삭제
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500 italic">댓글이 없습니다.</p>

    <!-- 페이지네이션 -->
    <div class="mt-6 flex justify-center items-center space-x-4">
      <button @click="changePage(-1)" :disabled="currentPage === 1"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 hover:bg-gray-300 transition">
        이전
      </button>
      <span class="text-gray-700">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(1)" :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 hover:bg-gray-300 transition">
        다음
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { getCommentList, deleteCommentOne } from '../../../apis/CommentAPI.js';

export default {
  name: 'CommentList',
  props: {
    bno: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const comments = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);

    const fetchComments = async () => {
      try {
        const response = await getCommentList(props.bno, currentPage.value);
        comments.value = response.dtoList;
        totalPages.value = response.totalPage;
      } catch (error) {
        console.error('댓글 목록을 불러오는 데 실패했습니다:', error);
      }
    };

    const deleteComment = async (cno) => {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        try {
          await deleteCommentOne(cno);
          await fetchComments();
        } catch (error) {
          console.error('댓글 삭제에 실패했습니다:', error);
        }
      }
    };

    const changePage = (direction) => {
      currentPage.value += direction;
      fetchComments();
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };

    onMounted(fetchComments);
    watch(() => props.bno, fetchComments);

    return {
      comments,
      currentPage,
      totalPages,
      deleteComment,
      changePage,
      formatDate
    };
  }
};
</script>
