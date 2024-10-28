
<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Answer Read Component</h1>

    <hr class="my-4" />
    <div v-for="(answer, index) in answers" :key="index" class="mt-4 border-b pb-4">
      <div class="flex flex-col">
        <p class="text-sm text-gray-700 font-medium">내용:</p>
        <p class="text-sm text-gray-800 mb-2">{{ answer.content }}</p>
        <p class="text-sm text-gray-600">작성자: {{ answer.writer }}</p>
        <p class="text-sm text-gray-600">작성일: {{ answer.createdDate }}</p>
      </div>

      <button
          class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          @click="handleDelete(answer.ano)"
      >
        삭제
      </button>
    </div>

    <AnswerAddComponent></AnswerAddComponent>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import AnswerAddComponent from "./AnswerAddComponent.vue";
import { deleteAnswer } from '../../apis/QnaAPI.js';
import Swal from "sweetalert2";

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
});

const handleDelete = async (ano) => {
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
        await deleteAnswer(ano);
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          text: '답변이 성공적으로 삭제되었습니다.',
        }).then(() => {

          location.reload();
        });
      } catch (error) {
        console.error('Failed to delete answer:', error);
        Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: '답변을 삭제하는 도중 오류가 발생했습니다.',
        });
      }
    }
  });
};
</script>
