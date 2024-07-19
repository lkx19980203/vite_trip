<template>
  <div class="content">
    <h2 class="title">热门精选</h2>

    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <house-item-v3
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
        />
        <house-item-v9
          v-else-if="item.discoveryContentType === 9"
          :item-data="item.data"
        />
      </template>
    </div>
  </div>
</template>
<script setup>
import HouseItemV3 from '@/components/house-item-v3/index.vue';
import HouseItemV9 from '@/components/house-item-v9/index.vue';
import useHomeStore from '@/stores/modules/home';
import { toRefs } from 'vue';
const homeStore = useHomeStore();
const { houseList } = toRefs(homeStore);
</script>
<style lang="less" scoped>
.content {
  padding: 10px;
  .title {
    font-size: 22px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
