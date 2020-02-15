import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import Global from './components/common/global';
import  serve from './service/api';
Vue.prototype.serve=serve;

console.log(Global)

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
