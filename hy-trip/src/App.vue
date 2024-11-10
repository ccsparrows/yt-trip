<template>
  <div>
    <router-view />
    <tabar v-if="!$route.meta.hiddenTabBar" />
    <Loading></Loading>
  </div>
</template>

<script setup>
import tabar from "./components/tab-bar/tab-abr.vue";
import { useRouter } from "vue-router";
import loading from "./components/loading/loading.vue";
import Loading from "./components/loading/loading.vue";

const currentRoute = useRouter();
</script>
<style lang="less"></style>
