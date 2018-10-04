// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'begeta/css/begeta.min.css';

import Vue from 'vue';
import PubSub from 'pubsub-js';
import App from './App';

Vue.config.productionTip = false;
Vue.prototype.$pubsub = PubSub;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
