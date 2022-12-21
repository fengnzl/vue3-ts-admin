import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { $http } from "./service";
$http.post({
  url: "/role/list",
  data: {
    offset: 0,
    size: 1000,
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
