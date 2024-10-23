import { computed, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const useListData = (listFn) => {

    const fn = listFn;  // 공지사항 리스트 API 함수

    const route = useRoute();  // 현재 라우트 정보
    const router = useRouter();  // 라우터 객체

    const loading = ref(false);  // 로딩 상태
    const refresh = ref(false);  // 데이터 새로고침 상태

    // 공지사항 결과 데이터를 담을 객체
    const result = ref({
        content: [],
        number: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
    });

    // 페이지 데이터 로드 함수
    const loadPageData = async (page) => {
        loading.value = true;
        const data = await fn(page);  // 공지사항 API 호출
        result.value = data;  // 결과 데이터 저장
        loading.value = false;
    };

    // 페이지네이션 계산
    const pageArr = computed(() => {
        const currentPage = result.value.number + 1;  // 현재 페이지 번호
        let lastPage = Math.ceil(currentPage / 10.0) * 10;  // 마지막 페이지 번호
        const start = lastPage - 9;  // 시작 페이지 번호
        const prev = start !== 1;  // 이전 버튼 표시 여부
        const next = result.value.totalPages > lastPage;  // 다음 버튼 표시 여부

        if (result.value.totalPages < lastPage) {
            lastPage = result.value.totalPages;  // 마지막 페이지 번호가 전체 페이지 수보다 클 경우 조정
        }

        const pageArr = [];

        if (prev) {
            pageArr.push({ page: start - 1, label: '이전' });
        }

        for (let i = start; i <= lastPage; i++) {
            pageArr.push({ page: i, label: i });
        }

        if (next) {
            pageArr.push({ page: lastPage + 1, label: '다음' });
        }

        return pageArr;
    });

    // 컴포넌트가 마운트되었을 때 데이터 로드
    onMounted(() => {
        loadPageData(route.query.page || 1);  // 쿼리 파라미터의 페이지 번호로 데이터 로드
    });

    // 새로고침 또는 경로 변경 시 데이터 다시 로드
    watch(refresh, () => {
        loadPageData(route.query.page || 1);
    });

    onBeforeRouteUpdate((to, from, next) => {
        loadPageData(to.query.page || 1);  // 경로가 변경되었을 때 새 데이터 로드
        next();
    });

    // 상세 페이지로 이동하는 함수
    const moveToRead = (noticeNo) => {
        router.push(`/notice/read/${noticeNo}`);
    };

    return { loading, moveToRead, route, router, refresh, result, pageArr };
};

export default useListData;
