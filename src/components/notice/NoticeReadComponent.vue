<template>
  <div v-if="notice">
    <h2>{{ notice.noticeTitle }}</h2>
    <p><strong>작성자:</strong> {{ notice.writer }}</p>
    <p><strong>작성일:</strong> {{ new Date(notice.createTime).toLocaleString() }}</p>
    <p><strong>시작 날짜:</strong> {{ new Date(notice.startDate).toLocaleString() }}</p>
    <p><strong>종료 날짜:</strong> {{ new Date(notice.endDate).toLocaleString() }}</p>
    <p><strong>내용:</strong> {{ notice.noticeContent }}</p>

    <!-- 첨부파일 -->
    <div v-if="notice.attachDocuments && notice.attachDocuments.length > 0">
      <h4>첨부파일</h4>
      <ul>
        <li v-for="(file, index) in notice.attachDocuments" :key="index">
          <a :href="`/uploads/${file}`" target="_blank">{{ file }}</a>
        </li>
      </ul>
    </div>

    <!-- 수정 및 삭제 버튼 -->
    <button @click="handleEdit" class="btn btn-warning">수정</button>
    <button @click="handleDelete" class="btn btn-danger">삭제</button>
  </div>

  <div v-else>
    <h2>Loading...</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getOne } from '../../apis/NoticeAPI'; // API 호출 함수

const notice = ref(null); // 공지사항 데이터를 저장할 변수
const route = useRoute(); // 현재 경로에서 noticeNo 가져오기
const router = useRouter();
const noticeNo = route.params.noticeNo; // 라우트 파라미터에서 noticeNo 가져오기

// 공지사항 데이터를 불러오는 함수
const fetchNotice = async () => {
  try {
    const response = await getOne(noticeNo);
    notice.value = response; // 받은 데이터를 notice에 저장
  } catch (error) {
    console.error('공지사항 불러오기 실패:', error);
  }
};

// 수정 버튼 핸들러
const handleEdit = () => {
  router.push(`/notice/edit/${noticeNo}`); // 수정 페이지로 이동
};

// 삭제 버튼 핸들러
const handleDelete = () => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    // 삭제 API 호출 후 목록 페이지로 이동
    // deleteNotice(noticeNo).then(() => {
    //   router.push('/notice/list');
    // });
    alert('삭제 기능을 구현하세요.'); // 삭제 기능은 별도로 구현해야 함
  }
};

// 컴포넌트 마운트 시 공지사항 데이터 로드
onMounted(() => {
  fetchNotice();
});
</script>

<style scoped>
/* 추가적인 스타일 설정 가능 */
</style>
