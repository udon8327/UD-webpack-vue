<template lang="pug">
  .container
    router-link(to="/") Index
    router-link(to="/page") Page
    router-view
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style lang="sass">
.container
  max-width: 540px
  margin: 0 auto
  img
    max-width: 100%
  a
    font-size: 20px
    margin-right: 10px
</style>