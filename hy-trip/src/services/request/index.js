import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";
import useMainStore from "@/stores/modules/main";

const mainStore = useMainStore();

class HYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    this.instance.interceptors.request.use(
      (config) => {
        mainStore.changeIsLoading(true);
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        mainStore.changeIsLoading(false);
        return res;
      },
      (err) => {
        mainStore.changeIsLoading(false);
        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get(config) {
    return this.request({ ...config, method: "get" });
  }
  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

export default new HYRequest(BASE_URL, TIMEOUT);
