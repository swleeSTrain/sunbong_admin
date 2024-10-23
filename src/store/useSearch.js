import { defineStore } from 'pinia';

export const useSearch = defineStore('search', {

    state: () => ({
        type: 'all',
        keyword: ''
    }),
    actions: {
        setSearchParams(type, keyword) {
            this.type = type;
            this.keyword = keyword;
        }
    }
});
