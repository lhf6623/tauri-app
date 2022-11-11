import "@unocss/reset/tailwind.css";
import "uno.css";

import { createApp } from "vue";
import App from "./App.vue";
import { store } from "/@/store";

// 重置样式会覆盖 naive-ui 的样式 具体可以看到 naive-ui 的文档
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

const app = createApp(App);
app.use(store);

app.mount("#mirror");
