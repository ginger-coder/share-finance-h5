import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import 'vant/lib/index.css';
import '@/assets/style/common.scss';
import './style.scss';
import App from './App.vue';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$showToast = showToast;
app.config.globalProperties.$showDialog = showDialog;

app.use(router);
app.use(pinia);
app.mount('#app');
