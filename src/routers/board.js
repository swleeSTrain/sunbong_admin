const BoardListPage = () => import("../pages/board/BoardListPage.vue");
const BoardReadPage = () => import("../pages/board/BoardReadPage.vue");
const BoardAddPage = () => import("../pages/board/BoardAddPage.vue");
const BoardUpdatePage = () => import("../pages/board/BoardUpdatePage.vue");

const boardRouting={
    path: '/board',
    children: [
        { path: "list", component: BoardListPage},
        { path: "", redirect: '/board/list?page=1'},
        { path: "read/:noticeNo", component: BoardReadPage},
        { path: "edit/:noticeNo", component: BoardUpdatePage},
        { path: "add", component: BoardAddPage}
    ]

}

export default boardRouting;