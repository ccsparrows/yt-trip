<template>
  <van-index-bar highlight-color="#ff9854" :index-list="indexList">
    <van-index-anchor index="热门" />
    <div class="hotcityList">
      <template v-for="(hotCity, indey) in groupData.hotCities" :key="indey">
        <van-cell class="hotcity" @click="SelectCity(hotCity)">
          <div>{{ hotCity.cityName }}</div>
        </van-cell>
      </template>
    </div>
    <template v-for="(group, index) in groupData.cities" :key="index">
      <van-index-anchor :index="group.group" />
      <template v-for="(city, indey) in group.cities" :key="indey">
        <van-cell :title="city.cityName" @click="SelectCity(city)" />
      </template>
    </template>
  </van-index-bar>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
const route = useRouter();
const cityStore = useCityStore();
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});
function SelectCity(city) {
  console.log(city);
  console.log(2222222222222);
  cityStore.currentCity = city;
  route.back();
}
const indexList = computed(() => {
  const list = ["#"];
  props.groupData.cities.forEach((item) => {
    list.push(item.group);
  });
  return list;
});
</script>
<style lang="less">
.hotcityList {
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-right: 25px;
  .van-cell__value {
    color: black;
    font-size: 12px;
    text-align: center;
    word-wrap: normal;
  }
  .hotcity {
    padding: 0;
    width: 70px;
    line-height: 28px;
    height: 28px;
    background-color: #fff4ec !important;
    border-radius: 14px;
    margin: 5px;
  }
}
</style>
