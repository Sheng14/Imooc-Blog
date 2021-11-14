// 1. 导入 Vue 和 Vuex
import Vue from 'vue';
// uniapp 已默认安装，不需要重新下载
import Vuex from 'vuex';
// 导入 search.js 暴露的对象
import search from './modules/search';

// 2. 安装 Vuex 插件
Vue.use(Vuex);
// 3. 创建 store 实例
const store = new Vuex.Store({
    modules: {
        search
    }
});
export default store;