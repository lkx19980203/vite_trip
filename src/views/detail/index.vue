<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      ref="tabControlRef"
      class="tabs"
      v-show="showTabControl"
      :titles="names"
      @tabItemClick="tabItemClick"
    />
    <van-nav-bar title="xx详情" left-arrow @click-left="onClickLeft" />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />

      <detail-infos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />

      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>
<script setup>
import TabControl from '@/components/tab-control/index.vue';
import DetailSwipe from './cpns/detail-swipe.vue';
import DetailInfos from './cpns/detail-infos.vue';
import DetailFacility from './cpns/detail-facility.vue';
import DetailLandlord from './cpns/detail-landlord.vue';
import DetailNotice from './cpns/detail-notice.vue';
import DetailComment from './cpns/detail-comment.vue';
import DetailMap from './cpns/detail-map.vue';
import DetailIntro from './cpns/detail-intro.vue';
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from '@/service';
import { computed, ref, watch } from 'vue';
import useScroll from '@/hooks/useScroll';

const route = useRoute();
const { id } = route.params;
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(id).then((res) => {
  detailInfos.value = res.data;
});

const router = useRouter();
const onClickLeft = () => {
  router.back();
};

const detailRef = ref();
const { scrollTop } = useScroll(detailRef);

const showTabControl = computed(() => {
  return scrollTop.value > 300;
});

const sectionEls = ref({});

const names = computed(() => {
  return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
  if (!value) return;
  const name = value.$el.getAttribute('name');
  sectionEls.value[name] = value.$el;
};

let isClick = false;
let currentDistance = -1;

const tabItemClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  let offsetTop = sectionEls.value[key].offsetTop;
  if (index !== 0) {
    offsetTop = offsetTop - 44;
  }
  currentDistance = offsetTop;

  isClick = true;
  detailRef.value.scrollTo({
    top: offsetTop,
    behavior: 'smooth',
  });
};

const tabControlRef = ref();
let values = null;
watch(scrollTop, (newValue) => {
  if (currentDistance === newValue) {
    isClick = false;
  }
  if (isClick) return;

  if (!values) {
    values = Object.values(sectionEls.value).map((el) => {
      return el.offsetTop;
    });
  }

  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1;
      break;
    }
  }
  if (index === -1) return;
  tabControlRef.value?.setCurrentIndex(index);
});
</script>
<style lang="less" scoped>
.tabs {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
