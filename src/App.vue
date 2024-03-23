<template>
    <div id="app">
        <m-header />
        <router-view />
    </div>
</template>

<script>

import mHeader from './components/mHeader'
export default {
  components: {
    mHeader
  },
  data () {
    return {

    }
  },
  methods: {}
}
</script>
<style scoped>
    .m-header {
        z-index: 99;
    }
    #app{
      background-color: rgb(249, 249, 249);
    }
</style>
