<template>
  <div class="tab-bar">
    <van-tabbar route v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #icon>
            <img :src="index === currentIndex ? getAssetsUrl(item.imageActive) : getAssetsUrl(item.image)" />
          </template>
          <template #default>
            <span> {{ item.text }}</span>
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>
<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetsUrl } from '@/utils/load_assets'
import { ref } from 'vue';
const currentIndex = ref(0);
</script>
<style lang="less" scoped>
.tab-bar {

  // --van-tabbar-item-icon-size: 30px !important;
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 30px;
  // }
  img {
    height: 26px;
  }
}
</style>
