<template>
  <div v-if="question" class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Question Edit Component</h1>

    <form @submit.prevent="handleEdit" enctype="multipart/form-data">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
            type="text"
            id="title"
            v-model="question.title"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <input
            type="text"
            id="content"
            v-model="question.content"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <div class="mb-4">
        <label for="writer" class="block text-sm font-medium text-gray-700">Writer</label>
        <input
            type="text"
            id="writer"
            v-model="question.writer"
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

      <div class="flex space-x-4">
        <button
            type="button"
            @click="moveToRead(question.qno)"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Read
        </button>

        <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>

        <button
            type="button"
            @click="handleDelete"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </form>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteQuestion, getReadQuestion, putEditQuestion } from '../../apis/QnaAPI.js';
import { usePage } from '../../store/usePage';
import { useSearch } from '../../store/useSearch';
import Swal from 'sweetalert2';

const pageStore = usePage();
const searchStore = useSearch();

const route = useRoute();
const router = useRouter();
const question = ref(null);
const form = ref({
  title: '',   // 제목 필드 추가
  content: '', // 내용 필드 추가
  writer: '',  // 작성자 필드 추가
  tags: [],    // 태그 배열
});

const moveToRead = (qno) => {
  const currentPage = pageStore.currentPage;
  const searchParams = {
    type: searchStore.type,
    keyword: searchStore.keyword,
    tags: searchStore.tags ? searchStore.tags.join(',') : ''
  };

  router.push({ path: `/qna/question/read/${qno}`, query: { page: currentPage, ...searchParams } });
};

const moveToList = () => {
  const currentPage = pageStore.currentPage;
  const searchParams = {
    type: searchStore.type,
    keyword: searchStore.keyword,
    tags: searchStore.tags ? searchStore.tags.join(',') : ''
  };

  router.push({ path: `/qna/question/list/`, query: { page: currentPage, ...searchParams } });
};

const fileInput = ref(null);

const handleEdit = async () => {

  const qno = route.params.qno;
  const formData = new FormData();

  // 기본 데이터 추가
  formData.append('title', form.value.title);
  formData.append('content', form.value.content);
  formData.append('writer', form.value.writer);

  // 태그 배열 추가
  form.value.tags.forEach(tag => formData.append('tags', tag));

  // 새 파일 추가
  const files = fileInput.value?.files;
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  }

  try {
    await putEditQuestion(qno, formData);
    Swal.fire({
      icon: 'success',
      title: '수정 완료!',
      text: '질문이 성공적으로 수정되었습니다.',
    }).then(() => {
      moveToRead(qno);
    });
  } catch (error) {
    console.error('Failed to edit question:', error);
    Swal.fire({
      icon: 'error',
      title: '오류 발생',
      text: '질문을 수정하는 도중 오류가 발생했습니다.',
    });
  }
};

const handleDelete = async () => {
  const qno = route.params.qno;
  Swal.fire({
    title: '정말 삭제하시겠습니까?',
    text: '삭제하면 복구할 수 없습니다!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '삭제',
    cancelButtonText: '취소'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteQuestion(qno);
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          text: '질문이 성공적으로 삭제되었습니다.'
        });
        moveToList(); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error('Failed to delete question:', error);
        Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: '질문을 삭제하는 도중 오류가 발생했습니다.'
        });
      }
    }
  });
};

onMounted(async () => {
  const qno = route.params.qno;
  const data = await getReadQuestion(qno);
  question.value = data.dtoList[0];
  form.value.title = question.value.title || '';
  form.value.content = question.value.content || '';
  form.value.writer = question.value.writer || '';
  form.value.tags = question.value.tags || [];
});
</script>