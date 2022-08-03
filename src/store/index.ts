import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

export const store = createPinia();
store.use(piniaPersist);
