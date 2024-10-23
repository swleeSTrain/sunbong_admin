import { computed, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const useListData = (listFn) => {
    const fn = listFn;  // API 함수
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const refresh = ref(false);

    // API에서 반환하는 qna 데이터
    const result = ref({
        dtoList: [],
        pageNumList: [],
        pageRequestDTO: {
            page: 1,
            size: 10
        },
        totalCount: 0,
        totalPage: 0,
        current: 1,
        prev: false,
        next: false
    });

    // 페이지 데이터 로드 함수
    const loadPageData = async (page) => {
        loading.value = true;
        const data = await fn(page);  // API 호출
        result.value = data;  // 응답 데이터 저장
        loading.value = false;
    };

    // 페이지네이션 계산
    const pageArr = computed(() => {
        const currentPage = result.value.current;
        let lastPage = Math.ceil(currentPage / 10.0) * 10;
        const start = lastPage - 9;
        const prev = result.value.prev;
        const next = result.value.next;

        const pageArr = [];

        if (prev) {
            pageArr.push({ page: start - 1, label: 'PREV' });
        }

        // 페이지 번호 추가
        result.value.pageNumList.forEach(page => {
            pageArr.push({ page, label: page });
        });

        if (next) {
            pageArr.push({ page: lastPage + 1, label: 'NEXT' });
        }

        return pageArr;
    });

    onMounted(() => {
        loadPageData(route.query.page || 1);  // 초기 데이터 로드
    });

    watch(refresh, () => {
        loadPageData(route.query.page || 1);  // 데이터 새로고침 시
    });

    onBeforeRouteUpdate((to, from, next) => {
        loadPageData(to.query.page || 1);  // 라우트 변경 시 데이터 다시 로드
        next();
    });

    // 상세 페이지로 이동
    const moveToRead = (qno) => {
        router.push(`/qna/question/${qno}`);
    };

    return { loading, moveToRead, route, router, refresh, result, pageArr, loadPageData };
};

export default useListData;
