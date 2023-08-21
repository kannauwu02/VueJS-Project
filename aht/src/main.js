import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
import apolloProvider from './apollo'; // Import the apollo.js file

const app = createApp(App);

app.use(router);

app.use(apolloProvider);

app.mount('#app');
