// 開啟 HMR 支持 (全部模組)
if (module.hot) {
  module.hot.accept();
}

import '@/sass/index.sass'
import {test} from '@/js/test.js'

import Vue from 'vue'
import { udAxios } from '@/utils/ud-axios.js'
// import '@/utils/ud-components.js'
import { getRandom } from '@/utils/ud-tools.js'
import { udAlert, udLoading } from '../utils/ud-components'

new Vue({
  el: '#app',
  data: {
    title: "INDEX",
    name: "Rice Shower"
  },
  mounted(){
    test('好喔')
    alert(_.difference([2, 1], [2, 3]));
    // udLoading.open();
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    console.log(getRandom());
    udAxios.get('https://udon8327.synology.me/ajax/success.php')
      .then(res => console.log(res))
  },
  methods: {
    toUrl(url) {
      location.href = url;
    },
  },
});
