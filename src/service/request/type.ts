import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface FRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

export interface FRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceports?: FRequestInterceptors<T>;
  // 其它需要的可扩展配置参数
}
