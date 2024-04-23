<template>
  <div>
    <apriori v-if="dataLoaded" :results="chartData" :items="items" />
    <bubble-chart v-if="dataLoaded" :results="chartData" :items="items" />
  </div>
</template>

<script>
import apriori from '../components/charts/apriori.vue'
import bubbleChart from '../components/charts/bubbleChart.vue'

export default {
  components: {
    apriori,
    bubbleChart
  },
  data () {
    return {
      dataLoaded: false,
      chartData: null,
      items: [
        { type: 'info', label: 'apriori' },
        { type: 'info', label: '健康' },
        { type: 'info', label: '支持度阈值：0.1' },
        { type: 'info', label: '置信度阈值：0.1' }
      ]
    }
  },
  mounted () {
    const chartData = sessionStorage.getItem('chartData')
    if (chartData) {
      this.chartData = JSON.parse(chartData)
      this.dataLoaded = true
    }
  },
  methods: {
  }
}
</script>
