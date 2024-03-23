<template>
  <div>
    <div class="medical-health">
      <!-- 年份选择器 -->
      <div class="year-select">
        <el-container class="content">
          <el-main>
            <div class="container">
              <div class="block">
                <div class="selectTitle">
                  <i class="el-icon-office-building"></i>&nbsp;选择年份
                </div>
                <el-select
                  v-model="year"
                  clearable placeholder="请选择年份">
                  <el-option
                    v-for="item in yearLists"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <el-button type="primary" @click="showChart">查询医疗情况</el-button>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
      <!-- 总览的信息 -->
      <!-- 每一个图表的div -->
      <!-- 每一个图表的div -->
      <div class="text-content" v-for="(item, index) in overviewDataArr" :key="index" v-if="isShowChart">
        <div class="text-title">{{ item.title }}</div>
        <!--   todo: text文本，本应该由后端直接返回,但目前后端仅返回的是红色高亮文字，且顺序有误，因此先用固定文本展示    -->
        <el-alert
          :title="item.text"
          type="info"
          :closable="false">
        </el-alert>
        <!-- 引用图表内容 -->
        <bar-chart class="grid-item" :ref="item.type" :chartId="item.type"></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
// import {getAllDiseaseRate, getAllBodyExamRate, getAllInsuranceRate, getAllHelperRate} from '../axios/api'
import barChart from '../components/charts/barChart'
/* eslint-disable */
export default {
  components: {
    barChart
  },
  data () {
    return {
      isShowChart: false,
      yearLists: ['1989', '1991', '1993', '1997', '2000', '2004', '2006', '2009', '2011', '2015'],
      // diseaseName: '',
      // text: '',
      // id: this.$store.state.id,
      // year: this.$store.state.year,
      timer: '',
      isLoading: false,
      year: '2015',
      overviewDataArr: [{
        title: '患病情况',
        type: 'disease',
        text: '患病情况调查中，发烧、喉咙痛、咳嗽的患病率最高',
        chart: {
          chartData: [],
          title: '各疾病患病率'
        }
      }, {
        title: '身体检查',
        type: 'bodyExam',
        text: '身体检查调查中，全身检查的检查率最高',
        chart: {
          chartData: [],
          title: '各身体检查项检查率'
        }
      }, {
        title: '医疗保险',
        type: 'insurance',
        text: '医疗保险的调查中，合作保险的拥有率最高',
        chart: {
          chartData: [],
          title: '各类保险拥有率'
        }
      }, {
        title: '医疗帮助',
        type: 'help',
        text: '医疗帮助调查中，看医生的选择率最高',
        chart: {
          chartData: [],
          title: '医疗帮助项的选择率'
        }
      }],
      // 从服务器中传来的数据
      diseaseResponseData: {
        'data': {
          '哮喘': 0.69,
          '头痛-头晕': 4.25,
          '眼耳病': 1.17,
          '非传染性疾病': 2.38,
          '关节-肌肉疼痛': 4.76,
          '其他传染病': 0.1,
          '胃痛': 1.88,
          '发烧-喉咙痛-咳嗽': 7.5,
          '心脏病-胸痛': 1.85,
          '皮疹-皮炎': 0.69,
          '腹泻-胃痛': 1.35
        },
        'year': '2015',
        'message': 'OK',
        'url': 'http://114.55.25.220:8080/chnsx/medical/statistics/disease',
        'timestamp': '2021-05-18 01:21:25 UTC',
        'status': 200
      },
      bodyExamResponseData: {
        'data': {
          '血检': 0.51,
          '视力或听力检查': 0.04,
          '全身体检': 1.79,
          '产后检查': 0.01,
          '妇科检查': 0.07,
          '产前检查': 0.06,
          '血压筛查': 1.09,
          '其它检查': 0.18,
          '肿瘤筛查': 0.07
        },
        'year': '2015',
        'message': 'OK',
        'url': 'http://114.55.25.220:8080/chnsx/medical/statistics/bodyExam',
        'timestamp': '2021-05-18 01:45:30 UTC',
        'status': 200
      },
      insuranceResponseData: {
        'data': {
          '城市居民基本保险': 19.19,
          '合作保险': 52.66,
          '其它': 1.11,
          '免费医疗保险': 2.63,
          '商业保险': 3.47,
          '城市雇员基本保险': 22.71
        },
        'year': '2015',
        'message': 'OK',
        'url': 'http://114.55.25.220:8080/chnsx/medical/statistics/insurance',
        'timestamp': '2021-05-18 01:45:53 UTC',
        'status': 200
      },
      helperResponseData: {
        'data': {'咨询当地的健康工作者': 2.42, '自我护理': 5.91, '看医生': 7.8, '完全没关注': 1.23},
        'year': '2015',
        'message': 'OK',
        'url': 'http://114.55.25.220:8080/chnsx/medical/statistics/helper',
        'timestamp': '2021-05-18 01:46:14 UTC',
        'status': 200
      }
    }
  },
  methods: {
    // todo: 后端这部分数据作为多个请求发送。原则上并不规范，但后端不愿意更改。
    showChart () {
      this.isShowChart = true
      this.getTestData()
    },
    getTestData () {
      let that = this
      setTimeout(function (){
        that.overviewDataArr[0].chart.chartData = that.diseaseResponseData.data
        that.showBarChart(0)
        that.overviewDataArr[1].chart.chartData = that.bodyExamResponseData.data
        that.showBarChart(1)
        that.overviewDataArr[2].chart.chartData = that.insuranceResponseData.data
        that.showBarChart(2)
        that.overviewDataArr[3].chart.chartData = that.helperResponseData.data
        that.showBarChart(3)
      }, 1000)


      // getAllDiseaseRate(that.year).then(res => {
      //   // console.log('数据获取成功', res.data)
      //   that.overviewDataArr[0].chart.chartData = res.data.data
      //   this.showBarChart(0)
      // }).catch(err => {
      //   console.log(err)
      // })
      // getAllBodyExamRate(that.year).then(res => {
      //   // console.log('数据获取成功', res.data)
      //   that.overviewDataArr[1].chart.chartData = res.data.data
      //   this.showBarChart(1)
      // }).catch(err => {
      //   console.log(err)
      // })
      // getAllInsuranceRate(that.year).then(res => {
      //   // console.log('数据获取成功', res.data)
      //   that.overviewDataArr[2].chart.chartData = res.data.data
      //   this.showBarChart(2)
      // }).catch(err => {
      //   console.log(err)
      // })
      // getAllHelperRate(that.year).then(res => {
      //   // console.log('数据获取成功', res.data)
      //   that.overviewDataArr[3].chart.chartData = res.data.data
      //   this.showBarChart(3)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    showBarChart (index) {
      let str = this.overviewDataArr[index].type
      this.$refs[str][0].getData(this.overviewDataArr[index].chart, 'health', this.year)
    }
  }
}
</script>

<style scoped>
.el-row {
  text-align: center;
}

.el-alert {
  margin: 30px 0;
}

.text {
  text-align: center;
  margin: 0 auto;
}

.selectTitle {
  margin: 40px 0 30px;
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
}

.text-title {
  margin-top: 60px;
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
}

.data-text {
  color: rgb(64, 158, 255);
  font-size: larger;
  font-weight: bold;
}

.medical-health {
  background-color: white;
  /* margin-top: 30px; */
  /* margin-left: 30px; */
  /* margin-right: 30px; */
  border-radius: 4px;
  padding: 3%;
}

.divider {
  height: 1px;
  background-color: rgb(64, 158, 255);
  margin-top: 30px;
}

</style>
