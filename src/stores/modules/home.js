import { defineStore } from 'pinia';
import {
  getHomeHotSuggests,
  getHomeCategories,
  getHomeHouselist,
} from '@/service';

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houseList: [],
    currentPage: 1,
  }),
  actions: {
    async fetchHotSuggestData() {
      const { data } = await getHomeHotSuggests();
      this.hotSuggests = data;
    },
    async fetchCategoryData() {
      const { data } = await getHomeCategories();
      this.categories = data;
    },
    async fetchHouseData() {
      const { data } = await getHomeHouselist(this.currentPage);
      this.houseList.push(...data);
      this.currentPage++;
    },
  },
});

export default useHomeStore;
