<template>
  <div class="filter-chart-res">
    <div class="chart-container" v-if="dataLoaded">
      <div class="apriori-container" v-if="items[0].label === 'apriori'">
        <bubble-chart :results="chartData" :items="items" />
        <apriori :results="chartData" :items="items" />
      </div>
    </div>
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
      userData: null,
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
    let userData = sessionStorage.getItem('userData')
    if (chartData && userData) {
      this.chartData = JSON.parse(chartData)
      userData = JSON.parse(userData)
      this.items[0].label = userData.algorithm
      this.dataLoaded = true
    }
  },
  methods: {
  }
}
</script>

<style>
.filter-chart-res {
  background-color: white;
  /* margin-top: 30px; */
  /* margin-left: 30px; */
  /* margin-right: 30px; */
  border-radius: 4px;
  padding: 3%;
}

.chart-container {
  /* max-height: 120px; */
  overflow: scroll;
  padding: 20px 0;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}
</style>
