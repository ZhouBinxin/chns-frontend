<template>
  <div>
    <div class="text-title">气泡图</div>
    <div class="bubble-chart" ref="bubbleChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    results: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    // 获取图表容器
    const chartContainer = this.$refs.bubbleChart

    // 初始化图表
    const chart = echarts.init(chartContainer)

    // 检查 this.results 和 this.items 是否已定义
    if (!this.results || !this.items) {
      console.error('Results or items data is not defined.')
      return
    }

    // 使用安全的方式访问数据
    const data = this.results.map(result => {
      return {
        name: result.itemset.join(','),
        value: [result.support, result.confidence, result.lift]
      }
    })

    // 配置项
    const option = {
      // title: {
      //   text: '关联关系气泡图'
      // },
      xAxis: {
        name: '支持度'
      },
      yAxis: {
        name: '置信度'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `${params.name}<br />${params.value[0]}, ${params.value[1]}, ${params.value[2]}`
        }
      },
      legend: {
        data: ['提升度'],
        orient: 'horizontal',
        bottom: 20,
        left: 'center'
      },
      series: [{
        name: '提升度',
        type: 'scatter',
        data: data.map(item => ({
          name: item.name,
          value: item.value,
          symbolSize: item.value[2] * 100
        })),
        emphasis: {
          label: {
            show: true,
            formatter: '{b}'
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }]
    }

    // 使用配置项初始化图表
    chart.setOption(option)
  }
}
</script>

<style scoped>
.bubble-chart {
  width: 100%;
  height: 400px;
}

.text-title {
  margin-top: 60px;
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
}
</style>
