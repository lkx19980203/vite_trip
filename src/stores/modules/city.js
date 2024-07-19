import { defineStore } from 'pinia';
import { getCityAll } from '@/service';
const useCityStore = defineStore('city', {
  state: () => ({
    allCity: [],
    currentCity: { cityName: '福建' },
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll();
      this.allCity = res.data;
    },
  },
});

export default useCityStore;
