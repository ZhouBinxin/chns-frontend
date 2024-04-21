<template>
  <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']" :collapse-transition="false" :collapse="isCollapse">
      <el-menu-item index="0" @click="collapse">
        <i :class="collapseBtnClass"></i>
        <span slot="title">{{collapseText}}</span>
      </el-menu-item>
      <el-menu-item index="1" @click="changeMenu('filterPage')">
        <i class="el-icon-search"></i>
        <span slot="title">检索</span>
      </el-menu-item>
      <el-menu-item index="2" @click="changeMenu('charts')">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">图表</span>
      </el-menu-item>
      <el-menu-item index="3" @click="changeMenu('filterChartPage')">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">图表</span>
      </el-menu-item>
    </el-menu>
  </el-aside>

</template>
<script>
export default {
  data () {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      // 菜单默认折叠
      isCollapse: true,
      collapseText: '展开',
      // 默认宽度64
      sideWidth: 64
    }
  },
  methods: {
    changeMenu (str) {
      this.$router.push({ name: str })
    },
    // 点击收缩按钮触发
    collapse () {
      // collapse为false时展开，为true时折叠。
      this.isCollapse = !this.isCollapse
      // 折叠时
      if (this.isCollapse) {
        // 折叠时宽度为64
        this.sideWidth = 64
        // 变换图标样式
        this.collapseBtnClass = 'el-icon-s-unfold'
        // 变换文字
        this.collapseText = '展开'
      } else {
        // 展开时宽度为200
        this.sideWidth = 200
        // 变换图标样式
        this.collapseBtnClass = 'el-icon-s-fold'
        // 变换文字
        this.collapseText = '收起'
      }
    }
  }
}
</script>

<style>
/* .el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
</style>
