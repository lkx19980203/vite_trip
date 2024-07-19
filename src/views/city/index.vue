<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="2px">
        <template v-for="(value, key, index) in allCity" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <!-- <city-group :group-data="currentGroup" /> -->
      <template v-for="(value, key, index) in allCity">
        <city-group v-show="key === tabActive" :group-data="value" />
      </template>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import CityGroup from './cnps/city-group.vue';
const router = useRouter();
const searchValue = ref('');
const cancelClick = () => {
  router.back();
};

const tabActive = ref();

const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCity } = toRefs(cityStore);

const currentGroup = computed(() => allCity.value[tabActive.value]);
// const currentGroup = computed(() => allCity.value[Object.keys(allCity.value)[tabActive.value]]);
</script>
<style lang="less" scoped>
.city {
  // --van-tabs-line-height: 30px;

  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
