import {createRouter, createWebHistory} from "vue-router";
import noticeRouting from "./notice";
import qnaRouting from "./qna.js";

const MainPage = () => import("../pages/MainPage.vue")


const routeConfig = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: MainPage},
        noticeRouting,
        qnaRouting
    ]
})

export default routeConfig;