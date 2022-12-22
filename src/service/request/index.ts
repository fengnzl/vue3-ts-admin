import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { FRequestConfig, FRequestInterceptors } from "./type";

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
      this.interceptors?.responseInterceptor,
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
        return res.data;
      },
      (err) => err
    );
  }

  request<T = any>(config: FRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单个请求 config 处理
      if (config.interceports?.requestInterceptor) {
        config = config.interceports.requestInterceptor(config);
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对单个请求响应数据处理
          if (config.interceports?.responseInterceptor) {
            res = config.interceports.responseInterceptor(res);
          }
          // 将结果 resolve 返回出去
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export { FRequest };
