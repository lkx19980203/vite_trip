<template>
  <div class="home">
    <home-navbar />

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeSearchBox />
    <home-categories />

    <div class="search-bar" v-if="showSearch">
      <search-bar startDateStr="9:00" endDateStr="16:00" />
    </div>
    <home-content />
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import HomeNavbar from './cnps/home-navbar.vue';
import HomeSearchBox from './cnps/home-search-box.vue';
import HomeCategories from './cnps/home-categories.vue';
import HomeContent from './cnps/home-content.vue';
import SearchBar from '@/components/search-bar/index.vue';
import useHomeStore from '@/stores/modules/home';

import useScroll from '@/hooks/useScroll';

const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoryData();
homeStore.fetchHouseData();

// 加载更多
const { isReachBottom, scrollTop } = useScroll();

watch(isReachBottom, (newValue) => {
  if (newValue) {
    console.log('more----------');
    homeStore.fetchHouseData().then(() => {
      isReachBottom.value = false;
    });
  }
});
// const showSearch = ref(false);
// watch(scrollTop, (newValue) => {
//   console.log(newValue, 'toptop');
//   showSearch.value = newValue > 100;
// });

const showSearch = computed(() => {
  return scrollTop.value > 350;
});
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
