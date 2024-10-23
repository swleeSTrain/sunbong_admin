<template>
  <div>
    <h2>공지사항 등록</h2>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <!-- 공지 제목 -->
      <div class="form-group">
        <label for="noticeTitle">공지 제목</label>
        <input type="text" id="noticeTitle" v-model="form.noticeTitle" class="form-control" required />
      </div>

      <!-- 공지 내용 -->
      <div class="form-group">
        <label for="noticeContent">공지 내용</label>
        <textarea id="noticeContent" v-model="form.noticeContent" class="form-control" required></textarea>
      </div>

      <!-- 시작 날짜 -->
      <div class="form-group">
        <label for="startDate">시작 날짜</label>
        <input type="datetime-local" id="startDate" v-model="form.startDate" class="form-control" required />
      </div>

      <!-- 종료 날짜 -->
      <div class="form-group">
        <label for="endDate">종료 날짜</label>
        <input type="datetime-local" id="endDate" v-model="form.endDate" class="form-control" required />
      </div>

      <!-- 우선순위 -->
      <div class="form-group">
        <label for="priority">우선순위</label>
        <input type="number" id="priority" v-model="form.priority" class="form-control" required />
      </div>

      <!-- 고정 여부 -->
      <div class="form-group">
        <label for="isPinned">고정 여부</label>
        <select id="isPinned" v-model="form.isPinned" class="form-control">
          <option :value="true">예</option>
          <option :value="false">아니오</option>
        </select>
      </div>

      <!-- 작성자 -->
      <div class="form-group">
        <label for="writer">작성자</label>
        <input type="text" id="writer" v-model="form.writer" class="form-control" required />
      </div>

      <!-- 파일 업로드 -->
      <div class="form-group">
        <label for="files">파일 업로드</label>
        <input type="file" id="files" @change="handleFileChange" class="form-control" />
      </div>

      <!-- 등록 버튼 -->
      <button type="submit" class="btn btn-primary mt-3">등록</button>
    </form>

    <!-- 결과 메시지 -->
    <div v-if="message" class="mt-3 alert alert-success">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { postOne } from '../../apis/NoticeAPI'; // 상대 경로로 API 파일 불러오기

const form = ref({
  noticeTitle: '',
  noticeContent: '',
  startDate: '',
  endDate: '',
  priority: 1,
  isPinned: false,
  writer: '',
  files: null,
});

const message = ref(null);

// 파일 변경 핸들러
const handleFileChange = (event) => {
  form.value.files = event.target.files[0];
};

// 폼 제출 핸들러
const handleSubmit = async () => {

  const formData = new FormData();

  formData.append('noticeTitle', form.value.noticeTitle);
  formData.append('noticeContent', form.value.noticeContent);
  formData.append('startDate', form.value.startDate);
  formData.append('endDate', form.value.endDate);
  formData.append('priority', form.value.priority);
  formData.append('isPinned', form.value.isPinned);
  formData.append('writer', form.value.writer);

  if (form.value.files) {
    formData.append('files', form.value.files);
  }

  try {
    const response = await postOne(formData);
    message.value = '공지사항이 성공적으로 등록되었습니다.';
  } catch (error) {
    console.error('공지사항 등록 실패:', error);
    message.value = '공지사항 등록에 실패했습니다.';
  }
};
</script>

<style scoped>

</style>
