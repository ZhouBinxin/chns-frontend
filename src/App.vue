<template>

  <div id="app">
    <m-header />

    <el-container style="height: 100vh;">
      <m-side style="height: 100%;"></m-side>
      <el-main style="height: 100%; padding: 0;">
        <router-view />
      </el-main>
    </el-container>

  </div>

</template>

<script>
import mHeader from './components/mHeader'
import mSide from './components/mSide'
export default {
  components: {
    mHeader,
    mSide
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.m-header {
  z-index: 99;
}

#app {
  background-color: rgb(249, 249, 249);
}
</style>
