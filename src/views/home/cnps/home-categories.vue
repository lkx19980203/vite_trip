<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>
<script setup>
import useHomeStore from '@/stores/modules/home';
import { toRefs } from 'vue';

const homeStore = useHomeStore();
const { categories } = toRefs(homeStore);
</script>
<style lang="less" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  height: 80px;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    flex-shrink: 0;
    img {
      width: 32px;
      height: 32px;
    }
    .text {
      font-size: 12px;
    }
  }
}
</style>
