<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <div class="section date-range" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayDay }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      :show-confirm="false"
      @confirm="onConfirm"
    />
    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import useMainStore from '@/stores/modules/main';

import { computed, ref, toRefs } from 'vue';
import { formatMonthDay, getDiffDays } from '@/utils/format_date';
const rouetr = useRouter();

const cityClick = () => {
  rouetr.push('/city');
};
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};
const cityStore = useCityStore();
const { currentCity } = toRefs(cityStore);

// 日期范围的处理
const mainStore = useMainStore();
const { startDate, endDate } = toRefs(mainStore);
const startDateStr = computed(() => {
  return formatMonthDay(startDate.value);
});
const endDateStr = computed(() => {
  return formatMonthDay(endDate.value);
});
const stayDay = computed(() => {
  return getDiffDays(startDate.value, endDate.value);
});

const showCalendar = ref(false);
const onConfirm = (values) => {
  startDate.value = values[0];
  endDate.value = values[1];
  // stayDay.value = getDiffDays(values[0], values[1]);
  showCalendar.value = false;
};

const homeStore = useHomeStore();
const { hotSuggests, categories } = toRefs(homeStore);

const searchBtnClick = () => {
  rouetr.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
};
</script>
<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  font-size: 12px;

  // justify-content: space-between;
  .city {
    flex: 1;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      // top: 2px;
    }

    img {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: #999;
  height: 44px;
}
.date-range {
  .date {
    display: flex;
    flex-direction: column;
    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
  .stay {
    // flex: 1;
    // text-align: center;
    font-size: 12px;
    color: #666;
  }
}
.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  justify-content: flex-start;
  height: auto;
  margin: 10px 0;

  .item {
    padding: 4px 8px;
    border-radius: 12px;
    margin: 3px;
    font-size: 12px;
    line-height: 1;
  }
}
.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>
