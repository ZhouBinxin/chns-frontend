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
                <el-button type="primary" @click="showChart">查询资产情况</el-button>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
      <!-- 总览的信息 -->
      <!-- 每一个图表的div -->
      <div class="text-content" v-for="(item, index) in dataLists" :key="index" v-show="isShowChart">
        <div class="text-title">{{ dataLists[index].title }}</div>
        <!--    todo: text文本，本应该由后端直接返回,但目前后端仅返回的是红色高亮文字，且顺序有误，因此先用固定文本展示    -->
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
// import {getAllAssetRate} from '../axios/api'
import barChart from '../components/charts/barChart'

export default {
  data () {
    return {
      isShowChart: false,
      year: '2015',
      yearLists: ['1989', '1991', '1993', '1997', '2000', '2004', '2006', '2009', '2011', '2015'],
      dataLists: [{
        title: '住房情况',
        text: '家庭的住所情况中，拥有住房的占比最大，向个人租房的占比最小',
        type: 'bar1',
        textArr: ['家庭的住所情况中，', '的占比最大，', '的占比最小']
      }, {
        title: '家庭用水',
        text: '家庭使用的饮水中，大多数人为饮用水支付费用',
        type: 'bar2',
        textArr: ['家庭使用的饮水中，大多数人']
      }, {
        title: '',
        text: '家庭获得的饮用水中中，室内自来水占比最大，其他地方的占比最小',
        type: 'bar3',
        textArr: ['家庭获得的饮用水中，', '的占比最大，', '的占比最小']
      }, {
        title: '',
        text: '多数家庭选择饮用前不过滤水',
        type: 'bar4',
        textArr: ['多数家庭选择']
      }, {
        title: '室内财产',
        text: '家庭拥有的家电中，拥有彩电的占比最大，拥有空气净化器的占比最小',
        type: 'bar5',
        textArr: ['家庭拥有的家电中，拥有', '的占比最大，拥有', '的占比最小']
      }, {
        title: '',
        text: '家庭使用的烹饪燃料中，天然气等的占比最大，木炭占比最小',
        type: 'bar6',
        textArr: ['家庭使用的烹饪燃料中，', '等的占比最大，', '的占比最小']
      }, {
        title: '',
        text: '家庭使用的厕所设施类型中，室内可以冲水的占比最大',
        type: 'bar7',
        textArr: ['家庭使用的厕所设施类型中，', '的占比最大']
      }, {
        title: '',
        text: '家庭使用照明类型中，使用电气的占比最大，使用油的占比最小',
        type: 'bar8',
        textArr: ['家庭使用照明类型中，使用', '的占比最大，使用', '的占比最小']
      }, {
        title: '室外财产',
        text: '家庭拥有车辆中，拥有自行车的占比最大，拥有三轮车的占比最小',
        type: 'bar9',
        textArr: ['家庭拥有车辆中，拥有', '的占比最大，拥有', '的占比最小']
      }, {
        title: '',
        text: '家庭拥有的农机中，拥有水泵的占比最大，拥有动力脱粒机的占比最小',
        type: 'bar10',
        textArr: ['家庭拥有的农机中，拥有', '的占比最大，拥有', '的占比最小']
      }],
      resData: [],
      // 从服务器上传来的数据
      responseData: {
        'data': [{
          'text': ['拥有', '向个人租房'],
          'type': 'HousingSourceType',
          'chart': {
            'categoryData': ['拥有', '从工作单位租房', '部分所有权/部分产权', '从国家租房', '免费居住', '向个人租房'],
            'title': '家庭住房来源',
            'valueData': [60.7, 2.14, 1.8, 1.06, 0.79, 0.65]
          }
        }, {
          'text': ['为饮用水支付费用'],
          'type': 'IfPayForWaterRate',
          'chart': {'categoryData': ['为饮用水支付费用', '不为饮用水支付费用'], 'title': '家庭是否为饮用水付费', 'valueData': [77.18, 19.41]}
        }, {
          'text': ['室内自来水', '其他地方'],
          'type': 'WaterMethodRate',
          'chart': {
            'categoryData': ['室内自来水', '院子里的井水', '院子里的自来水', '瓶装水', '其他地方'],
            'title': '家庭饮用水获取方式',
            'valueData': [50.21, 21.37, 20.51, 5.48, 2.42]
          }
        }, {
          'text': ['饮用前不过滤水'],
          'type': 'IfFilterWaterRate',
          'chart': {'categoryData': ['饮用前不过滤水', '饮用前过滤水'], 'title': '家庭是否过滤饮用水', 'valueData': [82.96, 13.62]}
        }, {
          'text': ['拥有彩电', '拥有空气净化器'],
          'type': 'ApplianceOwnerRate',
          'chart': {
            'categoryData': ['拥有彩电', '拥有电饭煲', '拥有冰箱', '拥有洗衣机', '拥有电扇', '拥有空调', '拥有压力锅', '拥有电脑', '拥有电话', '拥有微波炉', '拥有相机', '拥有缝纫机', '拥有空气净化器'],
            'title': '家庭电器拥有类型拥有率',
            'valueData': [94.31, 87.97, 87.33, 85.26, 77.54, 55.85, 52.78, 42.97, 37.12, 37.09, 19.83, 16.45, 3.22]
          }
        }, {
          'text': ['天然气', '木炭'],
          'type': 'CookingFuelTypeRate',
          'chart': {
            'categoryData': ['天然气', '液化石油气', '电力', '木头，棍子，稻草等', '煤', '煤油', '其他', '木炭'],
            'title': '家庭烹饪燃料类型拥有率',
            'valueData': [37.95, 30.65, 14.48, 14.43, 1.53, 0.56, 0.29, 0.13]
          }
        }, {
          'text': ['室内，可以冲水'],
          'type': 'toiletTypeRate',
          'chart': {
            'categoryData': ['室内，可以冲水', '水泥露天（厕所）', '室外公共卫生间，不能冲水', '泥土露天（厕所）', '室内，不可以冲水', '室外公共卫生间，可以冲水', '无浴室', '其他'],
            'title': '家庭厕所设施类型拥有率',
            'valueData': [65.87, 13.39, 5.09, 4.78, 3.42, 3.04, 0.81, 0.18]
          }
        }, {
          'text': ['电气', '油'],
          'type': 'LightingTypeRate',
          'chart': {
            'categoryData': ['电气', '煤油', '蜡烛', '油'],
            'title': '家庭使用照明类型',
            'valueData': [99.09, 0.68, 0.14, 0.1]
          }
        }, {
          'text': ['拥有自行车', '拥有三轮车'],
          'type': 'VehicleOwnerRate',
          'chart': {
            'categoryData': ['拥有自行车', '拥有摩托车', '拥有汽车', '拥有三轮车'],
            'title': '家庭车辆拥有类型拥有率',
            'valueData': [41.47, 24.55, 18.26, 10.55]
          }
        }, {
          'text': ['拥有水泵', '为饮用水支付费用'],
          'type': 'AgriculturalMachineryOwnerRate',
          'chart': {
            'categoryData': ['拥有水泵', '拥有手扶拖拉机', '拥有手扶拖拉机', '拥有动物车', '拥有灌溉设备', '拥有动力脱粒机'],
            'title': '家庭农机拥有类型拥有率',
            'valueData': [7.51, 3.47, 3.01, 2.91, 2.89, 1.75]
          }
        }],
        'year': '2015',
        'count': 10,
        'message': 'OK',
        'url': 'http://114.55.25.220:8080/chnsx/asset/statistics',
        'timestamp': '2021-05-18 01:39:03 UTC',
        'status': 200
      }
    }
  },
  components: {
    barChart
  },
  created () {

  },
  mounted () {
  },
  methods: {
    showChart () {
      this.isShowChart = true
      this.getTestData()
    },
    getTestData () {
      let that = this
      // 由于模拟数据的时候，echart Dom生成速度较慢，因此需要异步处理；使用后端返回的数据将不存在此问题
      setTimeout(function () {
        that.resData = that.responseData.data
        that.showBarChart()
      }, 1000)
      // console.log(that.resData)

      // 从后端返回的数据
      // getAllAssetRate(that.year).then(res => {
      //   console.log('数据获取成功', res.data)
      //   that.resData = res.data.data
      //   console.log(that.resData)
      //   that.showBarChart()
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    showBarChart () {
      let index = 1
      this.resData.forEach(e => {
        // console.log('bar' + index)
        let str = 'bar' + index
        // console.log(this.$refs)
        // console.log(this.$refs[str])
        this.$refs[str][0].getData(e, 'property', this.year)
        index++
      })
    },
    getText (item, index) {
      // console.log(this.resData)
      // console.log(this.dataLists[index].textArr)
      // let str = ''
      // let count = 0
      let blackArr = this.dataLists[index].textArr
      let redArr = this.resData.data[index].text
      console.log(blackArr)
      console.log(redArr)
      // return '' + item[index].type + index
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
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 4px;
  padding: 3%;
}

.divider {
  height: 1px;
  background-color: rgb(64, 158, 255);
  margin-top: 30px;
}
</style>
