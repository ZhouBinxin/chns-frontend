<template>
  <div>
    <div class="tag-group">
      <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain" size="mini">
        {{ item.label }}
      </el-tag>
    </div>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.initChart()
  },
  data () {
    return {

    }
  },
  props: {
    chartConfig: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  // watch: {
  //   chartConfig: {
  //     handler () {
  //       this.initChart()
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    initChart () {
      let chartDom = this.$refs.chart
      let myChart = this.$echarts.init(chartDom)
      let option = this.chartConfig
      myChart.setOption(option)
    }
  }
}
</script>

<style>
.el-tag {
  margin: 5px;
}
</style>
