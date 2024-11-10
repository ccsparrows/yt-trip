import { getCategories, getHomeHouselist, getHotSuggests } from "@/services";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: {},
    categories: {},
    houseList: [],
    currentPage: 1,
  }),
  actions: {
    async fetchHotSuggests() {
      const res = await getHotSuggests();
      this.hotSuggests = res.data;
    },
    async fetchCategories() {
      const res = await getCategories();
      this.categories = res.data;
    },
    async fetchHomeHouselist() {
      const res = await getHomeHouselist(this.currentPage);
      this.houseList.push(...res.data);
      this.currentPage++;
    },
    async fetchHomeData() {
      // 调用所有接口
      await Promise.all(
        [this.fetchHotSuggests(), this.fetchCategories()],
        this.fetchHomeHouselist()
      );
    },
  },
});
export default useHomeStore;
