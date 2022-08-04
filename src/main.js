import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import JwPagination from 'jw-vue-pagination';
// Vue.component('jw-pagination', JwPagination);

createApp(App).use(store).use(router).mount('#app')
