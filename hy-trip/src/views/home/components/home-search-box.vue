<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="GetCity">{{ currentCity.cityName }}</div>
      <div class="position" @click="GetPosition">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <div
      class="section date-range bottom-gray-line"
      @click="showCalendar = true"
    >
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      @confirm="onConfirm"
      :formatter="formatter"
    />
    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            backgroundColor: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!-- 搜索按钮 -->
    <div class="section search-btn" @click="handleSearch">
      <div class="btn">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import { formatMouthDate, getDiffDays } from "@/utils/format_date";
import { computed, ref } from "vue";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";
//开始按钮
const handleSearch = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
};

//热门建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

//日期范围
const MainStore = useMainStore();
const { STstartDate, STendDate } = storeToRefs(MainStore);

const showCalendar = ref(false);

const startDate = computed(() => formatMouthDate(STstartDate.value));
const endDate = computed(() => formatMouthDate(STendDate.value));
const stayCount = ref(getDiffDays(STstartDate.value, STendDate.value));
console.log(111111);
console.log(startDate, endDate);

const onConfirm = (value) => {
  // const selectStartDate = formatMouthDate(value[0]);
  // const selectEndDate = formatMouthDate(value[1]);
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  // MainStore.STstartDate.value = selectStartDate;
  // MainStore.STendDate.value = selectEndDate;
  MainStore.setSTstartDate(selectStartDate);
  MainStore.setSTendDate(selectEndDate);
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);
  console.log(22222222222222);
  console.log(MainStore.STstartDate.value);
  console.log(MainStore.STendDate.value);

  console.log(startDate, endDate);
  showCalendar.value = false;
};
const formatter = (day) => {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }
  return day;
};

//城市选择
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

const GetCity = () => {
  router.push("/city");
};

const GetPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<style lang="less">
.search-box {
  --van-calendar-popup-height: 100%;
}
.location {
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  .city {
    flex: 1;
  }
  .position {
    width: 120px;
    img {
      width: 18px;
      height: 18px;
      margin: 10px;
    }
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

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
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
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
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
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
