const IndexPage = () => import("../pages/notice/IndexPage.vue");
const NoticeListPage = () => import("../pages/notice/NoticeListPage.vue");
const NoticeReadPage = () => import("../pages/notice/NoticeReadPage.vue");
const NoticeEditPage = () => import("../pages/notice/NoticeEditPage.vue");
const NoticeAddPage = () => import("../pages/notice/NoticeAddPage.vue");



const noticeRouting ={
    path: '/notice',
    component: IndexPage,
    children: [
        { path: 'list', component: NoticeListPage },
        { path: '', redirect: '/notice/list?page=1' },  // 기본 경로 리디렉션
        { path: 'read/:noticeNo', component: NoticeReadPage },
        { path: 'edit/:noticeNo', component: NoticeEditPage },
        { path: 'add', component: NoticeAddPage }
    ]
}
export default noticeRouting;