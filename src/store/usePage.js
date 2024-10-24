import { defineStore } from 'pinia';
import { ref } from 'vue';
export const usePage = defineStore('page', () => {
    const currentPage = ref(1)
    const setCurrentPage = (page) => {
        currentPage.value = page;
    }
    return { currentPage, setCurrentPage };
})
export default usePage