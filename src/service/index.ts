import { FRequest } from "./request";
import { TIME_OUT, BASE_URL } from "./request/config";

export const $http = new FRequest({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
  interceports: {
    requestInterceptor(config) {
      // 携带token的拦截
      config.headers = {
        ...config.headers,
        Authorization: "",
      };
      return config;
    },
    requestInterceptorCatch(err) {
      return err;
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(err) {
      return err;
    },
  },
});
