import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import type { FRequestConfig, FRequestInterceptors } from "./type";
import { request } from "http";

class FRequest {
  instance: AxiosInstance;
  interceptors?: FRequestInterceptors;
  constructor(config: FRequestConfig) {
    // 创建 Axios 实例
    this.instance = axios.create(config);

    // 基本设置
    this.interceptors = config.interceports;

    // 设置拦截器
    // 从 config 中取出的拦截器是创建 FRquest 实例传入的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.reposeInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 通用的拦截器配置
    this.instance.interceptors.request.use(
      (config) => {
        // TODO 添加通用逻辑
        return config;
      },
      (err) => err
    );
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // TODO 添加通用逻辑
        return res;
      },
      (err) => err
    );
  }
}

export { FRequest };
