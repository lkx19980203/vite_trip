<template>
  <div class="app">
    <router-view></router-view>

    <tab-bar />
  </div>
</template>

<script setup>
import TabBar from '@/components/TabBar/index.vue';
</script>

<style scoped></style>
