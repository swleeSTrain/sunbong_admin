
<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Answer Add Component</h2>
    <div class="mb-4">
      <label for="writer" class="block text-sm font-medium text-gray-700">작성자</label>
      <input v-model="writer" id="writer" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
    </div>
    <div class="mb-4">
      <label for="content" class="block text-sm font-medium text-gray-700">내용</label>
      <textarea v-model="content" id="content" rows="4" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
    </div>
    <button @click="addAnswer" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">답변 등록</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { postAddAnswer } from '../../apis/QnaAPI';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2'; // SweetAlert2 가져오기

const route = useRoute();
const content = ref('');
const writer = ref('');
const qno = route.params.qno; // 라우트에서 qno 받아오기

const addAnswer = async () => {
  if (content.value.trim() === '' || writer.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: '입력 부족',
      text: '내용과 작성자는 필수 입력 사항입니다.',
    });
    return;
  }

  const answerObj = {
    qno: qno,
    content: content.value,
    writer: writer.value
  };

  try {
    const response = await postAddAnswer(answerObj);
    Swal.fire({
      icon: 'success',
      title: '등록 성공!',
      text: '답변이 성공적으로 등록되었습니다.',
    }).then(() => {
      content.value = '';
      writer.value = '';
    });
  } catch (error) {
    console.error('답변 등록 실패:', error);
    Swal.fire({
      icon: 'error',
      title: '오류 발생',
      text: '답변 등록 중 오류가 발생했습니다.',
    });
  }
};
</script>