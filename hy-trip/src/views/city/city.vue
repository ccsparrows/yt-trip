<template>
  <div>
    <div class="topPart">
      <van-search
        v-model="value"
        show-action
        placeholder="城市/区域/位置"
        shape="round"
        @cancel="onCancel"
      />
      <van-tabs v-model:active="tabActive">
        <template v-for="(item, key, index) in allCities" :key="key">
          <van-tab :title="item.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="cityPart">
      <template v-for="(item, key, index) in allCities" :key="key">
        <city-group v-if="tabActive === key" :groupData="item" />
      </template>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import cityGroup from "./cpns/city-group.vue";

const route = useRouter();

const onCancel = () => {
  route.back();
};
const tabActive = ref();
const cityStore = useCityStore();
cityStore.fetchAllCities();
const { allCities } = storeToRefs(cityStore);

console.log(allCities.value);

const currentGroup = computed(() => allCities.value[tabActive.value]);
console.log(tabActive.value);
</script>
<style lang="less">
.topPart {
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: #fff;
}
.cityPart {
  height: calc(100vh - 98px);
  overflow: auto;
}
</style>
