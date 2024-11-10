import HYRequest from "../request";

export function getHotSuggests() {
  return HYRequest.get({
    url: "/home/hotSuggests",
  });
}
export function getCategories() {
  return HYRequest.get({
    url: "/home/categories",
  });
}
export function getHomeHouselist(currentPage) {
  return HYRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  });
}
