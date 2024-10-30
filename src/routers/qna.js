
const IndexPage = () => import("../pages/qna/IndexPage.vue");
const QuestionListPage = () => import("../pages/qna/QuestionListPage.vue");
const QuestionReadPage = () => import("../pages/qna/QuestionReadPage.vue");
const QuestionEditPage = () => import("../pages/qna/QuestionEditPage.vue");
const QuestionAddPage = () => import("../pages/qna/QuestionAddPage.vue");

const qnaRouting ={
    path: '/qna',
    component: IndexPage,
    children: [
        { path: 'question/list', component: QuestionListPage },
        // { path: '', redirect: '/qna/list?page=1' },  // 기본 경로 리디렉션
        { path: 'question/read/:qno', component: QuestionReadPage },
        { path: 'question/edit/:qno', component: QuestionEditPage },
        { path: 'question/add', component: QuestionAddPage },
        { path: "", redirect: '/qna/question/list?page=1' },
    ]
}
export default qnaRouting;