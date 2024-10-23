const BoardListPage = () => import("../pages/board/BoardListPage.vue");
const BoardReadPage = () => import("../pages/board/BoardReadPage.vue");
const BoardAddPage = () => import("../pages/board/BoardAddPage.vue");
const BoardUpdatePage = () => import("../pages/board/BoardUpdatePage.vue");

const boardRouting={
    path: '/board',
    children: [
        { path: "list", component: BoardListPage},
        { path: "", redirect: '/board/list?page=1' },
        { path: "read/:boardNo", component: BoardReadPage, props: true },
        { path: "update/:boardNo", component: BoardUpdatePage, props: true },
        { path: "add", component: BoardAddPage}
    ]

}

export default boardRouting;