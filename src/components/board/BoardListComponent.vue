<template>
  <div class="board-list">
    <h2>Board Post List</h2>

    <table class="table-auto w-full">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Author</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key="post.bno">
        <td>{{ post.bno }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.author || 'Anonymous' }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="!pagination.prev">Previous</button>
      <span>Page {{ pagination.current }} of {{ pagination.totalPage }}</span>
      <button @click="nextPage" :disabled="!pagination.next">Next</button>
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

<style scoped>
.table-auto {
  margin: 20px 0;
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

button:hover:enabled {
  background-color: #45a049;
}
</style>
