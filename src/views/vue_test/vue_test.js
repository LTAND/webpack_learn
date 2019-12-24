import Vue from 'vue'
import App from './vue_test.vue'
import axios from "axios"

Vue.prototype.$http = axios
new Vue({
  render: h => h(App)
}).$mount('#app');