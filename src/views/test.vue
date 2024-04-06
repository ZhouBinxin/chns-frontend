<template>
  <div>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
    <!-- <div style="text-align: center;">
      <el-button @click="updateChartData">更新数据</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.initChart()
  },
  methods: {
    initChart () {
      // 指定图表的容器
      let chartDom = this.$refs.chart
      // 初始化echarts实例
      let myChart = this.$echarts.init(chartDom)
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '动态折线图示例'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['数据1', '数据2']
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '数据1',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '数据2',
            type: 'line',
            data: [620, 711, 823, 934, 1445, 1456, 1178]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(option)
    }
    // updateChartData () {
    //   let newData = Math.round(Math.random() * 1000)
    //   this.option.series[0].data.push(newData) // 更新第一个数据系列
    //   this.option.series[1].data.push(Math.round(Math.random() * 1000)) // 更新第二个数据系列
    //   let chart = this.$refs.chart
    //   let myChart = echarts.getInstanceByDom(chart)
    //   myChart.setOption(this.option, true)
    // }

  }
}
</script>
