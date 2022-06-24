import "@unocss/reset/tailwind.css";
import "uno.css";

import { createApp } from "vue";
import App from "./App.vue";

// 重置样式会覆盖 naive-ui 的样式 具体可以看到 naive-ui 的文档
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

createApp(App).mount("#app");
