import {createRouter, createWebHistory} from "vue-router";
import noticeRouting from "./notice";


const routeConfig = createRouter({
    history: createWebHistory(),
    routes: [
            noticeRouting
    ]
})

export default routeConfig;