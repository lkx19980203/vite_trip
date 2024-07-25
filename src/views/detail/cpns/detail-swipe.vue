<template>
  <div class="swipe">
    <van-swipe
      class="swipe-list"
      :autoplay="3000"
      lazy-render
      indicator-color="white"
    >
      <van-swipe-item
        class="item"
        v-for="(item, index) in swipeData"
        :key="index"
      >
        <img :src="item.albumUrl" />
      </van-swipe-item>
      <template v-slot:indicator="{ active, total }">
        <div class="custom-indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">
                {{ getName(value[0].title) }}
              </span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
              >
                {{ getCategoryIndex(swipeData[active]) }} / {{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

const swipeGroup = {};
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory];
  if (!valueArray) {
    valueArray = [];
    swipeGroup[item.enumPictureCategory] = valueArray;
  }
  valueArray.push(item);
}

const nameReg = new RegExp(/【(.*?)】/i);
const getName = (name) => {
  const result = nameReg.exec(name);
  return result[1];
};
const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory];

  return valueArray.findIndex((data) => data === item) + 1;
};
</script>
<style lang="less" scoped>
.swipe {
  .swipe-list {
    img {
      width: 100%;
      height: 250px;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.2);

    .item {
      margin: 0 3px;

      &.active {
        background-color: #fff;
        color: #333;
        padding: 0 3px;
      }
    }
  }
}
</style>
