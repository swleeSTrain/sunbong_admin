<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Question Add Component</h1>

    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
            v-model="form.title"
            type="text"
            id="title"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <input
            v-model="form.content"
            type="text"
            id="content"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <div class="mb-4">
        <label for="writer" class="block text-sm font-medium text-gray-700">Writer</label>
        <input
            v-model="form.writer"
            type="text"
            id="writer"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <!-- 태그 선택 체크박스 -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Tags</label>
        <div class="mt-1">
          <label class="inline-flex items-center">
            <input
                type="checkbox"
                v-model="form.tags"
                value="질문"
                class="form-checkbox"
            />
            <span class="ml-2">질문</span>
          </label>
          <label class="inline-flex items-center ml-4">
            <input
                type="checkbox"
                v-model="form.tags"
                value="불만"
                class="form-checkbox"
            />
            <span class="ml-2">불만</span>
          </label>
        </div>
      </div>

      <div class="mb-4">
        <label for="files" class="block text-sm font-medium text-gray-700">Files</label>
        <input
            ref="fileInput"
            type="file"
            id="files"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            multiple
        />
      </div>

      <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { postAddQuestion } from '../../apis/QnaAPI.js';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();

// Form 데이터를 저장할 객체
const form = ref({
  title: '',
  content: '',
  writer: '',
  tags: [] // 배열로 초기화하여 다중 선택 가능
});

// 파일 입력을 참조하는 변수
const fileInput = ref(null);

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('content', form.value.content);
  formData.append('writer', form.value.writer);

  // 선택된 tags 배열을 반복문으로 추가
  form.value.tags.forEach(tag => {
    formData.append('tags', tag);
  });

  // 선택한 파일 추가
  const files = fileInput.value.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  }

  try {
    const response = await postAddQuestion(formData);
    console.log('Question added:', response);

    // 성공 알림 표시 후 리다이렉트
    Swal.fire({
      icon: 'success',
      title: '작성 완료 !!!',
      text: '질문이 성공적으로 등록되었습니다.',
    }).then(() => {
      router.push("/qna/question/list"); // 등록 완료 후 질문 목록으로 리다이렉트
    });

  } catch (error) {
    console.error('Failed to add question:', error);

    Swal.fire({
      icon: 'error',
      title: '오류 발생',
      text: '질문을 등록하는 도중 오류가 발생했습니다.',
    });
  }
};
</script>
