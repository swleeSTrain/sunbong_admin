import {createRouter, createWebHistory} from "vue-router";
import noticeRouting from "./notice";

const MainPage = () => import("../pages/MainPage.vue")

const routeConfig = createRouter({
    history: createWebHistory(),
    routes: [
        noticeRouting
    ]
})

export default routeConfig;