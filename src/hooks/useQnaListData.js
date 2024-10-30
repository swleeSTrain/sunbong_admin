import { computed, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { usePage } from '../store/usePage';
import { useSearch } from '../store/useSearch';

const useQnaListData = (listFn) => {
    const fn = listFn; // API 함수
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const refresh = ref(false);
    const selectedTags = ref('전체'); // 한글 태그 이름으로 기본값 설정

    // Pinia 상태 관리
    const pageStore = usePage(); // Pinia 페이지 상태 스토어 사용
    const searchStore = useSearch(); // Pinia 검색 조건 스토어 사용
    const currentPage = computed(() => pageStore.currentPage); // 현재 페이지를 Pinia로부터 가져오기

    // 검색 필드 관리 (Pinia 검색 스토어와 동기화)
    const searchParams = ref({
        type: searchStore.type || 'all',
        keyword: searchStore.keyword || '',
        tags: selectedTags.value // 태그 포함
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

        // 'all'일 경우 title, content, writer 필드를 모두 검색하도록 설정
        const apiSearchParams = {
            ...searchParams.value,
            type: searchParams.value.type === 'all' ? 'title&content&writer' : searchParams.value.type,
            keyword: searchParams.value.keyword || null,
            tags: selectedTags.value === '전체' ? '질문,불만' : selectedTags.value // '전체'일 경우 다중 태그 검색
        };

        const data = await fn(page, apiSearchParams); // API 호출
        result.value = data; // 응답 데이터 저장
        loading.value = false;

        // 현재 페이지와 검색 조건을 Pinia에 저장
        pageStore.setCurrentPage(page);
        searchStore.setSearchParams(searchParams.value.type, searchParams.value.keyword, selectedTags.value);

        // 쿼리스트링에 필요한 값만 추가
        const query = {
            page,
            ...(searchParams.value.type !== 'all' && { type: searchParams.value.type }),
            ...(searchParams.value.keyword && { keyword: searchParams.value.keyword }),
            ...(selectedTags.value !== '전체' && { tags: selectedTags.value })
        };

        // 쿼리스트링 업데이트 (replace 사용)
        router.replace({
            path: route.path,
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
        console.log("onMounted 확인 --------------------");

        // 쿼리스트링에서 페이지와 검색 조건 값을 가져와 로드
        const page = route.query.page ? parseInt(route.query.page, 10) : pageStore.currentPage;
        searchParams.value.type = route.query.type || searchStore.type || 'all';
        searchParams.value.keyword = route.query.keyword || searchStore.keyword || '';
        selectedTags.value = route.query.tags || '전체';

        loadPageData(page);
    });

    watch(refresh, () => {

        console.log("watch 확인 --------------------");

        loadPageData(route.query.page || 1); // 데이터 새로고침 시
    });

    // onBeforeRouteUpdate((to, from, next) => {
    //
    //     console.log("onBefore 확인 --------------------");
    //
    //     // 쿼리스트링에서 페이지와 검색 조건 값을 가져와 로드
    //     const page = route.query.page ? parseInt(route.query.page, 10) : pageStore.currentPage;
    //     searchParams.value.type = route.query.type || searchStore.type || 'all';
    //     searchParams.value.keyword = route.query.keyword || searchStore.keyword || '';
    //     selectedTags.value = route.query.tags || '전체';
    //
    //     loadPageData(page);
    //     next();
    // });

    // 상세 페이지로 이동
    const moveToRead = (qno) => {
        // 현재 페이지, 검색 조건을 쿼리스트링으로 유지하면서 상세 페이지로 이동
        const query = {
            page: currentPage.value,
            type: searchStore.type,
            keyword: searchStore.keyword,
            tags: selectedTags.value // 태그 포함
        };

        router.push({
            path: `/qna/question/read/${qno}`,
            query
        });
    };

    // 검색 버튼 클릭
    const search = () => {
        searchStore.setSearchParams(searchParams.value.type, searchParams.value.keyword, selectedTags.value);
        loadPageData(1);
    };

    // Enter 키로 검색 실행
    const onEnterKey = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    // 검색 조건과 페이지 초기화
    const cleanAndLoad = async () => {
        pageStore.clean();
        searchStore.clean();

        searchParams.value.type = searchStore.type;
        searchParams.value.keyword = searchStore.keyword;
        await loadPageData(1);
    };

    // 태그 선택 함수
    const selectTags = (tags) => {
        selectedTags.value = tags;
        searchParams.value.tags = tags; // 선택한 태그 업데이트
        loadPageData(1); // 페이지를 1로 리셋하며 데이터 로드
    };

    return { loading, moveToRead, route, router,
        refresh, result, pageArr, loadPageData,
        searchParams, search, onEnterKey, cleanAndLoad,
        selectedTags, selectTags }; // 선택한 카테고리와 선택 함수 반환
};

export default useQnaListData;
