import Vue from 'vue';
import App from './App.vue';

import data1 from './data1';
import alertMessage from './data2';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertMessage(data1.str1);
alertMessage(data1.str2);
