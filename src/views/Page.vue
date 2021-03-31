<template>
  <div>
    <h1>page</h1>
    <h2>{{ $route.name }}</h2>
    <img :src="start" alt="">
    <img src="@/img/04.jpg" alt="">
  </div>
</template>

<script>
import start from '@/img/03.jpg'

export default {
  name: 'page',
  data () {
    return {
      msg: 'Hello world!',
      start: start
    }
  },
}
</script>

<style lang="sass">

</style>