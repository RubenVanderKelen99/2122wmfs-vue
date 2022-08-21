import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);

app.use(router);

app
  .use(VueGoogleMaps, {
    load: {
      key: ***REMOVED***,
    },
  })
  .mount("#app");