import {createRouter, createWebHistory} from "vue-router";
import noticeRouting from "./notice";
import qnaRouting from "./qna.js";

import boardRouting from "./board.js";
import MainPage from "../pages/MainPage.vue";


const routeConfig = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: MainPage},
        noticeRouting,
        qnaRouting,
        boardRouting,
    ]
})

export default routeConfig;