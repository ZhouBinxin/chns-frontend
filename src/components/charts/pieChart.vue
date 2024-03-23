<template>
    <div>
        <div id="chart"></div>
    </div>
</template>

<script>
import spring from '../../dist/theme/echart-spring.json'
export default {
  data () {
    return {
      data: []
    }
  },
  methods: {
    async getData () {
      this.data = []
      const { data } = await this.$http.get(this.$store.state.url)
      for (let key in data.data) {
        if (key !== '医疗总花费') {
          this.data.push({ name: key, value: data.data[key] })
        }
      }
      this.showChart()
    },
    showChart () {
      if (this.year === '') return
      this.$echarts.registerTheme('spring', spring)
      const chart = this.$echarts.init(document.getElementById('chart'), 'spring')
      var option = {
        title: {
          text: '2015年您的医疗花费占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderWidth: 0,
          textStyle: {
            color: 'rgba(255,255,255,1)'
          }
        },
        legend: {
          orient: 'vertical',
          right: 'right'
        },
        series: [
          {
            name: '费用类型',
            type: 'pie',
            radius: '50%',
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(132, 132, 132, 0.5)'
              }
            },
            label: {
              formatter: '{b} {d}%'
            }
          }
        ]
      }
      chart.setOption(option)
    }
  },
  mounted () { }
}
</script>

<style scoped>
#chart {
    width: 100%;
    height: 400px;
    padding: 20px;
}
</style>
