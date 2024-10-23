<template>
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
    <!-- 타이틀 섹션 -->
    <div class="border-b pb-4 mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ boardData.title }}</h2>
      <p class="text-sm text-gray-500">
        <span class="font-semibold">Author:</span> {{ boardData.author || 'Anonymous' }} &bull;
        <span class="font-semibold">Date:</span> {{ boardData.createTime || 'N/A' }}
        <span class="font-semibold">Date:</span> {{ boardData.updateTime || 'N/A' }}
      </p>
    </div>

    <!-- 내용 섹션 -->
    <div class="mb-8">
      <!-- 썸네일을 제외한 모든 이미지 출력 -->
      <div v-if="nonThumbnailFiles.length" class="mb-6">
        <img
            v-for="file in nonThumbnailFiles"
            :src="getImageUrl(file)"
            :key="file"
            class="w-1/4 h-auto object-contain rounded-lg mb-4"
            alt="Attached Image"
        />
      </div>

      <!-- 게시글 내용 -->
      <p class="text-lg leading-relaxed text-gray-700">{{ boardData.content }}</p>
    </div>

    <!-- 첨부 파일 섹션 -->
    <div v-if="boardData.filename && boardData.filename.length > 1" class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Attached Files:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li
            v-for="(file, index) in boardData.filename"
            v-if="index !== 0"
        :key="file"
        class="text-blue-500 hover:underline cursor-pointer flex items-center space-x-2"
        >
        <img v-if="isImage(file)" :src="getImageUrl(file)" class="w-32 h-32 object-contain" alt="Attached Image" />
        <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l6 6M10 6v6M6 10v6h6"></path>
        </svg>
        <span>{{ file }}</span>
        </li>
      </ul>
    </div>

    <!-- 버튼 섹션 -->
    <div class="flex justify-end space-x-4">
      <button
          @click="goBack"
          class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 transition"
      >
        Back to List
      </button>
      <button
          @click="editPost"
          class="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300 transition"
      >
        Edit Post
      </button>
      <button
          @click="deletePost"
          class="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300 transition"
      >
        Delete Post
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRouter} from 'vue-router';
import {getBoardOne, deleteBoardOne} from '../../apis/boardAPI';

const props = defineProps({
  boardNo: {
    type: [Number, String],
    required: true,
  }
});

const boardData = ref({
  title: '',
  author: '',
  content: '',
  filename: [],
  createTime: '',
  updateTime: '',
});

const router = useRouter();

const fetchBoardData = async () => {
  try {
    const response = await getBoardOne(props.boardNo);
    boardData.value = response.dtoList[0];
  } catch (error) {
    console.error('Error fetching board data:', error);
  }
};
// 썸네일이 아닌 파일 리스트 필터링
const nonThumbnailFiles = computed(() =>
    boardData.value.filename.filter(file => !file.startsWith('s_'))
);

const isImage = (fileName) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const ext = fileName.split('.').pop().toLowerCase();
  return imageExtensions.includes(ext);
};

const getImageUrl = (fileName) => {
  return `http://localhost:8080/uploads/${fileName}`;
};

const goBack = () => {
  router.push('/board/list');
};

const editPost = () => {
  router.push(`/board/update/${props.boardNo}`);
};

const deletePost = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await deleteBoardOne(props.boardNo);
      alert('Post deleted successfully.');
      router.push('/board/list');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post.');
    }
  }
};

onMounted(fetchBoardData);
</script>

<style scoped>
/* TailwindCSS 스타일이 기본적으로 적용되지만 추가적인 스타일링이 필요하면 여기에 추가하세요. */
</style>
