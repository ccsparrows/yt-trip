<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <homeSearchBox></homeSearchBox>
    <homeCategories></homeCategories>
    <searchBar class="search-bar" v-if="isShowSearchBar"></searchBar>
    <homeContent />
  </div>
</template>

<script setup>
import HomeHeader from "./components/home-nav-bar.vue";
import homeSearchBox from "./components/home-search-box.vue";
import homeCategories from "./components/home-categories.vue";
import homeContent from "./components/home-content.vue";
import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll";
import searchBar from "@/components/search-bar/search-bar.vue";
import { watch, ref } from "vue";

const { scrollTop, clientHeight, scrollHeight } = useScroll();
const homeStore = useHomeStore();
homeStore.fetchHomeData();

useScroll(() => {
  homeStore.fetchHomeHouselist();
});

const isShowSearchBar = ref(false);
watch(scrollTop, (newValue) => {
  if (newValue) {
    isShowSearchBar.value = newValue >= 350;
  }
});

//搜索框
</script>

<style lang="less">
.home {
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
