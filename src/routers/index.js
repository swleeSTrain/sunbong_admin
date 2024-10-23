import {createRouter, createWebHistory} from "vue-router";

import boardRouting from "./board.js";


const routeConfig = createRouter({
    history: createWebHistory(),
    routes: [
        boardRouting,
    ]
})

export default routeConfig;