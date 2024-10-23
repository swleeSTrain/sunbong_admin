<template>
  <div v-if="notice">
    <h2>공지사항 수정</h2>
    <form @submit.prevent="handleSubmit">
      <!-- 공지 제목 -->
      <div class="form-group">
        <label for="noticeTitle">공지 제목</label>
        <input type="text" id="noticeTitle" v-model="notice.noticeTitle" class="form-control" required />
      </div>

      <!-- 공지 내용 -->
      <div class="form-group">
        <label for="noticeContent">공지 내용</label>
        <textarea id="noticeContent" v-model="notice.noticeContent" class="form-control" required></textarea>
      </div>

      <!-- 시작 날짜 -->
      <div class="form-group">
        <label for="startDate">시작 날짜</label>
        <input type="datetime-local" id="startDate" v-model="notice.startDate" class="form-control" required />
      </div>

      <!-- 종료 날짜 -->
      <div class="form-group">
        <label for="endDate">종료 날짜</label>
        <input type="datetime-local" id="endDate" v-model="notice.endDate" class="form-control" required />
      </div>

      <!-- 우선순위 -->
      <div class="form-group">
        <label for="priority">우선순위</label>
        <input type="number" id="priority" v-model="notice.priority" class="form-control" required />
      </div>

      <!-- 고정 여부 -->
      <div class="form-group">
        <label for="isPinned">고정 여부</label>
        <select id="isPinned" v-model="notice.isPinned" class="form-control">
          <option :value="true">예</option>
          <option :value="false">아니오</option>
        </select>
      </div>

      <!-- 작성자 -->
      <div class="form-group">
        <label for="writer">작성자</label>
        <input type="text" id="writer" v-model="notice.writer" class="form-control" required />
      </div>

      <!-- 저장 및 삭제 버튼 -->
      <button type="submit" class="btn btn-primary mt-3">저장</button>
      <button @click="handleDelete" class="btn btn-danger mt-3 ml-2">삭제</button>
    </form>

    <!-- 결과 메시지 -->
    <div v-if="message" class="mt-3 alert alert-success">
      {{ message }}
    </div>
  </div>

  <div v-else>
    <h2>Loading...</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getOne, putOne, deleteOne } from '../../apis/NoticeAPI'; // API 함수 import

const notice = ref(null); // 공지사항 데이터를 저장할 변수
const route = useRoute(); // 현재 경로에서 noticeNo 가져오기
const router = useRouter();
const noticeNo = route.params.noticeNo; // 라우트 파라미터에서 noticeNo 가져오기
const message = ref(null); // 성공 메시지 표시

// 공지사항 데이터를 불러오는 함수
const fetchNotice = async () => {
  try {
    const response = await getOne(noticeNo);
    notice.value = response; // 받은 데이터를 notice에 저장
  } catch (error) {
    console.error('공지사항 불러오기 실패:', error);
  }
};

// 수정 완료 후 저장하는 함수
const handleSubmit = async () => {
  try {
    const response = await putOne(notice.value); // 수정된 데이터 서버에 전송
    message.value = '공지사항이 성공적으로 수정되었습니다.';
  } catch (error) {
    console.error('공지사항 수정 실패:', error);
    message.value = '공지사항 수정에 실패했습니다.';
  }
};

// 공지사항 삭제하는 함수
const handleDelete = async () => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    try {
      await deleteOne(noticeNo); // 공지사항 삭제
      alert('공지사항이 성공적으로 삭제되었습니다.');
      router.push('/notice/list'); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
    }
  }
};

// 컴포넌트가 마운트되면 공지사항 데이터 로드
onMounted(() => {
  fetchNotice();
});
</script>

<style scoped>
/* 스타일을 여기 추가하세요 */
</style>
