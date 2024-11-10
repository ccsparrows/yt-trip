<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route="true">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <van-icon :name="item.icon" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tabbarData from "@/assets/data/tabbar.js";

const currentIndex = ref(0);
</script>

<style lang="less">
.tab-bar {
  .van-tabbar-item-icon {
    font-size: 20px;
  }
  .van-tabbar-item__text {
    font-size: 12px;
  }
}
</style>
