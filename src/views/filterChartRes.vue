<template>
  <div>{{ chartData }}</div>
</template>

<script>

export default {
  data () {
    return {
      chartData: null
    }
  },
  mounted () {
    const chartData = this.$route.query.data
    if (chartData) {
      this.chartData = JSON.parse(chartData)
    }
  },
  methods: {
  }
}
</script>
