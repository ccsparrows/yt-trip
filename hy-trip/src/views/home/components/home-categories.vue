<template>
  <div class="home-categories">
    <template v-for="item in categories" :key="item.id">
      <div class="category">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore);
</script>

<style lang="less">
.home-categories {
  display: flex;
  height: 80px;
  overflow-x: auto;
  padding: 0 10px;
  margin-top: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
  .category {
    width: 70px;
    text-align: center;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 32px;
    height: 32px;
  }
  .text {
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
