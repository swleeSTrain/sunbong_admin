<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Edit Post</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="title" class="block text-gray-600 font-medium">Title:</label>
        <input
            type="text"
            id="title"
            v-model="boardData.title"
            required
            class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label class="block text-gray-600 font-medium">Writer:</label>
        <p class="w-full p-2 mt-1 bg-gray-100 rounded-md">{{ boardData.writer }}</p>
      </div>
      <div>
        <label for="content" class="block text-gray-600 font-medium">Content:</label>
        <textarea
            id="content"
            v-model="boardData.content"
            required
            class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div>
        <label for="files" class="block text-gray-600 font-medium">Attach Files:</label>
        <input
            type="file"
            id="files"
            multiple
            @change="handleFileUpload"
            class="mt-2 text-gray-600"
        />
      </div>
      <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Update Post
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { putBoardOne, getBoardOne } from "../../apis/boardApi";

const props = defineProps({
  bno: {
    type: String,
    required: true,
  }
});
const boardData = ref({
  title: '',
  writer: '',
  content: '',
  filename: [],
  createTime: '',
  updateTime: '',
});
const router = useRouter();

const files = ref([]);
const fetchBoardData = async () => {
  try {
    const response = await getBoardOne(props.bno);
    if (response && response.dtoList && response.dtoList.length > 0) {
      boardData.value = response.dtoList[0];
    } else {
      console.error('No data found for the given board number.');
    }
  } catch (error) {
    console.error('Error fetching board data:', error);
  }
};


const handleFileUpload = (event) => {
  files.value = Array.from(event.target.files);
};

const submitForm = async () => {
  try {
    const { title, content } = boardData.value;
    await putBoardOne(props.bno, { title, content }, files.value);
    router.push('/board/list');
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Failed to update post");
  }
};

onMounted(fetchBoardData);
</script>

<style scoped>
/* TailwindCSS 기반으로 기본 스타일을 추가하므로 별도의 CSS는 최소화 */
</style>
