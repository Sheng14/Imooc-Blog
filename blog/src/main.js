import Vue from 'vue'
import App from './App'
// 导入 vuex 实例
import store from './store';
import * as filters from './filters';
// 文章详情样式
import './styles/article-detail.scss';

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store // 挂载实例对象
})
app.$mount()
