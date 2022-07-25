import Vue from 'vue';
import App from './App.vue';

/* import { str1, str2 } from './data1';
import alertMessage from './data2'; */

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

/* alertMessage(str1);
alertMessage(str2); */
