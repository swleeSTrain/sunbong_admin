import { computed, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { usePage } from '../store/usePage';
import { useSearch } from '../store/useSearch';  // Pinia 스토어 불러오기
const useQnaListData = (listFn) => {
    const fn = listFn;  // API 함수
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const refresh = ref(false);
    // Pinia 상태 관리
    const pageStore = usePage(); // Pinia 페이지 상태 스토어 사용
    const searchStore = useSearch(); // Pinia 검색 조건 스토어 사용
    const currentPage = computed(() => pageStore.currentPage); // 현재 페이지를 Pinia로부터 가져오기
    // 검색 필드 관리 (Pinia 검색 스토어와 동기화)
    const searchParams = ref({
        type: searchStore.type || 'all',
        keyword: searchStore.keyword || ''
    });
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
        // 검색 조건과 페이지 정보를 API에 전송
        const data = await fn(page, searchParams.value);  // API 호출
        result.value = data;  // 응답 데이터 저장
        loading.value = false;
        // 현재 페이지를 Pinia 스토어에 저장
        pageStore.setCurrentPage(page);
        // 검색 조건을 Pinia 스토어에 저장
        searchStore.setSearchParams(searchParams.value.type, searchParams.value.keyword);
        // 검색하지 않은 상태에서는 검색 조건을 쿼리스트링에 추가하지 않음
        const query = { page };
        if (searchParams.value.keyword.trim() !== '' || searchParams.value.type !== 'all') {
            query.type = searchParams.value.type;
            query.keyword = searchParams.value.keyword;
        }
        // 쿼리스트링에 페이지와 필요한 검색 조건만 반영
        router.push({
            path: route.path, // 현재 경로 유지
            query
        });
    };
    // 페이지네이션 계산
    const pageArr = computed(() => {
        const currentPageValue = result.value.current;
        let lastPage = Math.ceil(currentPageValue / 10.0) * 10;
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
        // 쿼리스트링에서 페이지와 검색 조건 값을 가져와 로드
        const page = route.query.page ? parseInt(route.query.page, 10) : pageStore.currentPage;
        searchParams.value.type = route.query.type || searchStore.type || 'all';
        searchParams.value.keyword = route.query.keyword || searchStore.keyword || '';
        loadPageData(page);
    });
    watch(refresh, () => {
        loadPageData(route.query.page || 1);  // 데이터 새로고침 시
    });
    onBeforeRouteUpdate((to, from, next) => {
        // 페이지 또는 검색 조건 변경 시 쿼리스트링을 반영하여 페이지 로드
        const page = to.query.page ? parseInt(to.query.page, 10) : pageStore.currentPage;
        searchParams.value.type = to.query.type || 'all';
        searchParams.value.keyword = to.query.keyword || '';
        loadPageData(page);
        next();
    });
    // 상세 페이지로 이동
    const moveToRead = (qno) => {
        // 현재 페이지 및 검색 조건을 쿼리스트링으로 유지하면서 상세 페이지로 이동
        const query = {
            page: currentPage.value, // 현재 페이지 유지
            type: searchStore.type, // Pinia에서 검색 조건 불러오기
            keyword: searchStore.keyword // Pinia에서 검색어 불러오기
        };
        router.push({
            path: `/qna/question/read/${qno}`,
            query
        });
    };
    // 검색 버튼 클릭 시
    const search = () => {
        searchStore.setSearchParams(searchParams.value.type, searchParams.value.keyword); // 검색 조건을 Pinia에 저장
        loadPageData(1); // 검색하면 첫 페이지부터 결과 표시
    };
    return { loading, moveToRead, route, router,
        refresh, result, pageArr, loadPageData,
        searchParams, search };
};
export default useQnaListData;