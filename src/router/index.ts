import { createRouter, createWebHashHistory } from "vue-router";
// 表示引入的是类型声明
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/main",
    component: () => import("@/views/Main.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
