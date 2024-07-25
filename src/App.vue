<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <!-- <tab-bar /> -->
    <tab-bar v-show="!route.meta.hideTabBar" />
    <loading />
  </div>
</template>

<script setup>
import Loading from '@/components/loading/index.vue';
import TabBar from '@/components/TabBar/index.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped></style>
