<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <img
          v-if="currentIndex !== index"
          :src="getAssetsUrl(item.image)"
          alt=""
        />
        <img v-else :src="getAssetsUrl(item.imageActive)" alt="" />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>
<script setup>
import tabbarData from '@/assets/data/tabbar';
import { getAssetsUrl } from '@/utils/load_assets';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const currentIndex = ref(0);
const router = useRouter();
const itemClick = (index, item) => {
  currentIndex.value = index;
  router.push(item.path);
};
</script>
<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  display: flex;
  border-top: 1px solid #e5e5e5;

  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      color: var(--primary-color);
    }

    img {
      width: 36px;
    }
  }
}
</style>
