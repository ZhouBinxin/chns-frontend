<template>
  <div>
    <div class="chart" :id="chartId"></div>
  </div>
</template>

<script>
import sort from '../../dist/js/algorithm'
import spring from '../../dist/theme/echart-spring.json'
import {mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      category: [],
      value: [],
      chartInfo: {},
      year: ''
    }
  },
  props: ['chartId'],
  created () {
  },
  computed: {
    ...mapActions([
      'setThemeColor'
    ])
  },
  methods: {
    ...mapState([
      'themeColor'
    ]),
    /**
     * 柱状图数据获取函数
     * @param data: 图表数据
     * @param type: 数据类型（资产还是医疗）
     * @param year: 年份
     * @returns {Promise<void>}
     */
    getData (data, type, year) {
      // console.log(data)
      this.year = year
      this.category = []
      this.value = []
      let title = ''
      if (type === 'property') {
        this.category = data.chart.categoryData
        this.value = data.chart.valueData
        title = year + '年' + data.chart.title
      }
      if (type === 'health') {
        for (let key in data.chartData) {
          this.category.push(key)
          this.value.push(data.chartData[key])
        }
        title = year + '年' + data.title
      }
      // console.log(this.category)
      // console.log(this.value)
      this.value = this.value.map(Number)
      sort(this.category, this.value)
      this.showChart(title)
    },
    showChart (title) {
      if (this.year === '') return
      this.$echarts.registerTheme('spring', spring)
      const chart = this.$echarts.init(document.getElementById(this.chartId), 'spring', {renderer: 'svg'})
      var option = {
        title: {
          text: title,
          left: 'center',
          top: 'top',
          textStyle: {
            fontSize: 18
          }
        },
        grid: {
          left: '20%',
          bottom: '7%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              shadowColor: '#fde2e2'
            }
          }
        },
        xAxis: {
          type: 'value',
          name: this.chartInfo.valueLabel,
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: this.category,
          name: this.chartInfo.categoryLabel,
          axisTick: {
            show: false
          }

        },
        series: [{
          barWidth: '60%',
          label: {
            position: 'right',
            show: true,
            formatter: '{c}%'
          },
          data: this.value,
          type: 'bar',
          showBackground: false
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}

.chart div:first-child {
  left: 50%;
  transform: translateX(-50%);
}
</style>
