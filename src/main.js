// The Vue build version to load with the 'import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.prototype.$http = Axios;

// Vue全局使用
Vue.use(ElementUI);
Vue.use(VueRouter);

import Login from './components/Login';
import TodoList from './components/TodoList';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/todolist',
      component: TodoList,
    },
    {
      // 输入其他不存在的地址自动跳回首页
      path: '*',
      redirect: '/',
      
    },
  ],
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});
