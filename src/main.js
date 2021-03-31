import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js';

// import '@/utils/ud-components.js';
// import '@/utils/ud-tools.js';
// import '@/utils/ud-axios.js';

// import '@/utils/ud-components.sass';
import '@/sass/_reset.sass';

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});