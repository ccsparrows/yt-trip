import { defineStore } from "pinia";

const STstartDate = new Date();
const STendDate = new Date();
STendDate.setDate(STstartDate.getDate() + 5);

const useMainStore = defineStore("main", {
  state: () => ({
    token: "",
    isLoading: false,
    STstartDate: STstartDate,
    STendDate: STendDate,
  }),
  actions: {
    setSTstartDate: function (date) {
      this.STstartDate = date;
    },
    setSTendDate: function (date) {
      this.STendDate = date;
    },
    changeIsLoading: function (isLoading) {
      this.isLoading = isLoading;
    },
  },
});

export default useMainStore;
