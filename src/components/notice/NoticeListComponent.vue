<template>
  <div>
    <!-- 로딩 중일 때 표시할 화면 -->
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 50vh;">
      <h1>Loading...</h1>
    </div>

    <!-- 고정된 공지사항 리스트 (isPinned가 true인 경우) -->
    <div v-if="pinnedNotices.length > 0" class="pinned-notices">
      <h4>고정된 공지사항</h4>
      <ul class="list-group">
        <li v-for="notice in pinnedNotices" :key="notice.noticeNo" class="list-group-item">
          <h5>{{ notice.noticeTitle }}</h5>
          <p>작성자: {{ notice.writer }} | 작성일: {{ new Date(notice.createTime).toLocaleDateString() }}</p>
          <p>첨부파일: {{ notice.attachDocuments }}</p>
        </li>
      </ul>
    </div>

    <!-- 일반 공지사항 리스트 (isPinned가 false인 경우) -->
    <div v-if="unpinnedNotices.length > 0" class="normal-notices">
      <h4>일반 공지사항</h4>
      <ul class="list-group">
        <li v-for="notice in unpinnedNotices" :key="notice.noticeNo" class="list-group-item">
          <h5>{{ notice.noticeTitle }}</h5>
          <p>작성자: {{ notice.writer }} | 작성일: {{ new Date(notice.createTime).toLocaleDateString() }}</p>
          <p>첨부파일: {{ notice.attachDocuments }}</p>
          <button @click="() => handleClickMove(notice.noticeNo)" class="btn btn-primary">상세 보기</button>
        </li>
      </ul>
    </div>

    <!-- 페이지네이션 UI -->
    <div class="d-flex justify-content-center mt-3" v-if="result.pageNumList.length > 0">
      <button class="btn btn-light mx-1" v-if="result.prev" @click="() => handleClickPage(result.prevPage)">
        이전
      </button>
      <template v-for="(page, index) in result.pageNumList" :key="index">
        <button class="btn btn-light mx-1" :class="{ active: page === currentPage }" @click="() => handleClickPage(page)">
          {{ page }}
        </button>
      </template>
      <button class="btn btn-light mx-1" v-if="result.next" @click="() => handleClickPage(result.nextPage)">
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getList } from '../../apis/NoticeAPI'; // 상대 경로로 API 파일 불러오기

const loading = ref(false);
const result = ref({ dtoList: [], prev: false, next: false, pageNumList: [] }); // 공지사항 데이터 및 페이지 정보
const pinnedNotices = ref([]); // 고정된 공지사항 리스트
const unpinnedNotices = ref([]); // 일반 공지사항 리스트
const currentPage = ref(1); // 현재 페이지

const route = useRoute(); // 라우터 정보 사용
const router = useRouter(); // 라우터 객체 사용

// 공지사항 리스트 불러오는 함수
const fetchNotices = async (page) => {
  loading.value = true;
  try {
    const response = await getList(page);
    result.value = response;

    // 고정된 공지사항과 일반 공지사항을 분리
    pinnedNotices.value = result.value.dtoList.filter(notice => notice.isPinned);
    unpinnedNotices.value = result.value.dtoList.filter(notice => !notice.isPinned);

    currentPage.value = page;
  } catch (error) {
    console.error('공지사항 불러오기 실패:', error);
  } finally {
    loading.value = false;
  }
};

// 페이지 클릭 처리 함수
const handleClickPage = (page) => {
  if (page !== currentPage.value) {
    router.push({ query: { page } }).then(() => {
      fetchNotices(page); // 다른 페이지 클릭 시 해당 페이지로 이동
    });
  }
};

// 공지사항 클릭 시 상세보기로 이동
const handleClickMove = (noticeNo) => {
  console.log(`공지사항 번호 ${noticeNo} 상세보기로 이동`);
  // 라우터를 통해 공지사항 상세보기로 이동할 수 있음
};

// 처음 로드되었을 때 쿼리에서 페이지 번호를 받아옴
onMounted(() => {
  const page = route.query.page ? parseInt(route.query.page) : 1; // URL 쿼리에서 페이지 번호 읽기
  fetchNotices(page); // 해당 페이지 데이터 불러오기
});

// 라우트 변경을 감지하여 페이지 유지
watch(() => route.query.page, (newPage) => {
  const page = newPage ? parseInt(newPage) : 1;
  fetchNotices(page);
});
</script>

<style scoped>
/* 고정된 공지사항 스타일 */
.pinned-notices h4 {
  color: red;
}

/* 현재 페이지 버튼에 스타일 추가 */
.active {
  font-weight: bold;
  background-color: lightblue;
}
</style>
