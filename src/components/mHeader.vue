<template>
  <el-header>
    <el-card shadow="hover">
      <el-row>
        <el-col :span="2" :offset="0">
          <el-avatar shape="square" :size="50" :src="logoUrl"></el-avatar>
        </el-col>
        <el-col :span="4">
          <div>家庭画像</div>
        </el-col>
        <el-col :span="8" :offset="10">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true"
                   @select="handleSelect">
            <el-menu-item index="1" @click="changeMenu('analysis')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;画像&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-menu-item>
            <el-submenu index="2">
              <template slot="title" @click="changeMenu('health')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总览概况&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
              <el-menu-item index="2-1" @click="changeMenu('health')">医疗总览</el-menu-item>
              <el-menu-item index="2-2" @click="changeMenu('property')">财产总览</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-card>
  </el-header>
</template>

<script>
import logo from '../assets/logo.png'
/* eslint-disable */
export default {
  name: 'mHeader',
  data () {
    return {
      logoUrl: logo,
      activeIndex: '/index',
      rootRoute: '/medicalhealth'
    }
  },
  methods: {
    handleSelect (key) {
      this.activeIndex = key
    },
    activeMenuWhenCreated () {
      this.activeIndex = '/' + this.$route.path.split('/')[1]
    },
    changeMenu(str){
      if (str === 'health') this.$router.push({name: 'medicalHealth'})
      if (str === 'property') this.$router.push({name: 'property'})
      if (str === 'analysis') this.$router.push({name: 'filterPage'})
    }
  },
  created () {
    this.activeMenuWhenCreated()
  }
}
</script>
<style scoped>
.el-row {
  height: 100%;
}

.el-avatar {
  display: contents;
}

.el-col {
  height: 100%;
}

.el-card {
  height: 100%;
  width: 100%;
}

.el-col-2 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-col-4 {
  display: flex;
  align-items: center;
  font-size: larger;
}

.el-col-8 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-header {
  padding: 0px;
  /* position: fixed; */
  width: 100%;
  z-index: 99;
}
</style>
