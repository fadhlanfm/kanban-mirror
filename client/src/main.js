import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '849567194922-qreemp9urcp6u0i2bcc9a3dcv7n044gs.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)


new Vue({
    render: h => h(App),
}).$mount('#app')