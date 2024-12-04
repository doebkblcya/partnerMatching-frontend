import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router';

import {RouterOptions} from "vue-router";
import routes from "./config/route";

// import {Button, Icon, NavBar, Tabbar, TabbarItem, showToast} from 'vant';
import Vant from 'vant';
import 'vant/lib/index.css'
import '../global.css'


const app = createApp(App);
// app.use(Button);
// app.use(NavBar);
// app.use(Icon);
// app.use(Tabbar);
//
app.use(Vant);
// app.config.globalProperties.$toast = showToast; //全局使用showToast组件

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes,
}as RouterOptions)

app.use(router);

app.mount('#app')

