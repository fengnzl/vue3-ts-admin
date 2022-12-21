# Axios 封装处理

一般项目我们都会通过 Axios 库去进行请求，但是直接通过 Axios 提供的方法去请求接口，我们需要编写大量同质代码，并难以维护，因此我们一般都需要进行封装处理，便于对接口返回结果统一处理及后续的维护。

对于某些大型项目不同模块可能会有不同的 `baseUrl` 等相关处理，因此我们需要封装一个类，并接收基础参数，对于不同的模块可以通过实例化时传入不同的配置，从而避免在同一个类中做大量的业务判断。

## 封装 FRequest 基类

这里基类 `FRequest` 的名称可以根据项目取一个合适的名称，在这个类里面，我们主要通过接收配置，来进行拦截器及接口请求的处理，因此我们可以定义如下类型：

```ts
// service/request/type.ts
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface FRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  reposeInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

export interface FRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceports?: FRequestInterceptors<T>;
  // 其它需要的可扩展配置参数
}
```

然后我们在基类中实现获取配置并设置拦截器功能

```ts
// service/request/index.ts
import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
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
```



