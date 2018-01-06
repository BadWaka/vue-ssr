import Vue from 'vue';
import App from './App.vue';
import {createRouter} from './router';
// 导出一个工厂函数，用于创建一个新的应用程序、router 和 store 实例
export function createApp() {
    // 创建 router 实例
    const router = createRouter();
    const app = new Vue({
        // 注入 router 到 vue 根实例
        router,
        render: h => h(App)
    });
    return {app, router};
};