<template lang="pug">
  div
    h4 {{ msg }}
    img(:src="small", alt="")
    img(:src="title", alt="")
    .test
    ud-qrcode(url="https://imgur.com/DIC7dRT.jpg")
</template>

<script>
import title from '@/img/02.jpg'
import small from '@/img/small.png'
import { udAxios } from '@/utils/ud-axios.js'
import { udLoading, udAlert } from '@/utils/ud-components.js'

export default {
  name: 'index',
  data () {
    return {
      msg: 'Index',
      title: title,
      small: small
    }
  },
  mounted() {
    udLoading.open();
    setTimeout(() => {
      udLoading.close();
      udAlert({msg: "好喔", confirm: () => {
        udAxios.get('https://udon8327.synology.me/ajax/success.php', {
          params: {
            name: "UDON"
          },
        })
          .then(res => {
            console.log(res);
          })
      }})
    }, 1000);
  }
}
</script>

<style lang="sass">
h4
  color: aqua
  font-size: 20px
.test
  background-color: aqua
  height: 200px
  background: url('~@/img/01.jpg') no-repeat top center
  background-size: cover
</style>