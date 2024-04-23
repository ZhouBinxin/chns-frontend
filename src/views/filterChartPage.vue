<template>
  <div class="selectType">
    <div class="title">
      <h2>请选择要检索的内容</h2>
    </div>
    <div class="healthSelect">
      <div class="selectTitle">
        <i class="el-icon-office-building"></i>&nbsp;选择数据集
      </div>
      <el-select v-model="queryParams.dataset" clearable placeholder="请选择数据集">
        <el-option v-for="(item, index) in dataSetList" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div class="selectTitle">
        <i class="el-icon-office-building"></i>&nbsp;选择算法
      </div>
      <el-select v-model="queryParams.algorithm" clearable placeholder="请选择算法">
        <el-option v-for="item in algorithmList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <div class="selectTitle">
        <i class="el-icon-office-building"></i>&nbsp;参数设置
      </div>
      <div class='selectContent'>
        <el-checkbox-group v-model="parameter" size="medium">
          <el-checkbox-button @change="showDetail(index)" v-for="(item, index) in parameters" :label="item"
            :key="item">{{ item }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <el-row class="detail-select-box">
          <el-col :span="8" v-if="detailItem.ifShow" v-for="(detailItem, detailIndex) in detailInfo" :key="detailIndex">
            <span class="healthTitle" style="text-align: left;">{{ detailItem.title }}</span>
            <el-input placeholder="请输入数据" v-model="detailItem.curr" clearable :style="{ width: '200px' }"
              @input="handleInputChange">
            </el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 立即检索 -->
    <el-row class="submit-btn">
      <el-button type="primary" :loading="showLoading" @click="toFilterChartRes">{{ submitButtonText }}</el-button>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'filterChartPage',
  components: {},
  data () {
    return {
      showLoading: false,
      submitButtonText: '开始检索',
      dataSetList: [
        { label: '健康', value: 'hlth_12' },
        { label: '保险', value: 'ins_12' },
        { label: '资产', value: 'asset_12' }
      ],
      algorithmList: [
        'apriori',
        'FP_growth',
        'k-means',
        'k-medois'
      ],
      detailInfo: [
        {
          title: '支持度阈值',
          ifShow: false,
          curr: 0.1
        },
        {
          title: '置信度阈值',
          ifShow: false,
          curr: 0.1
        }
      ],
      parameters: ['支持度阈值', '置信度阈值'],
      parameter: [],
      queryParams: {
        dataset: 'hlth_12',
        algorithm: 'apriori',
        support: 0.1,
        confidence: 0.1
      }
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    // 去筛选结果页
    async toFilterChartRes () {
      this.submitButtonText = '正在检索...'
      this.showLoading = true

      const chartData = await this.sendQueryToBackend(this.queryParams)

      this.$router.push({ name: 'filterChartRes', query: { data: JSON.stringify(chartData) } })
      this.showLoading = false
    },
    // 选择某一项
    showDetail (index) {
      let temp = this.detailInfo[index]
      this.detailInfo[index].ifShow = !temp.ifShow
    },
    toPersonalView () {
      if (this.item1 || this.item2 || this.item3) {
        this.$router.push({ name: 'personalview' })
      } else {
        alert('请至少选择一项')
      }
    },
    handleInputChange () {
      this.queryParams.support = this.detailInfo[0].curr
      this.queryParams.confidence = this.detailInfo[1].curr
    },
    // 根据用户输入的数据生成后端查询时需要的数据
    async sendQueryToBackend (queryParams) {
      const baseUrl = 'http://localhost:8081//chnsx/chart/' + queryParams.algorithm
      try {
        const response = await axios.get(baseUrl, { params: queryParams })
        return response.data
      } catch (error) {
        console.error('发生错误:', error)
        throw error // 抛出错误以便外部处理
      }
    }
  }
}
</script>
<style scoped>
.container {
  position: absolute;
  right: 0;
  top: -5px;
}

.selectType {
  background-color: white;
  border-radius: 4px;
  padding: 2% 3% 100px;
  min-height: 700px;
  position: relative;
}

.title {
  text-align: center;
  font-size: large;
  font-weight: bold;
  position: relative;
}

.selectTitle {
  margin: 40px 0 30px;
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
}

.healthTitle,
.propertyTitle {
  font-size: 17px;
  color: rgb(64, 158, 255);
  font-weight: bold;
}

.detail-select-box .el-col {
  margin-top: 30px;
}

.submit-btn {
  margin-top: 30px;
  text-align: center;
  position: absolute;
  bottom: 30px;
  background-color: #fff;
  left: 50%;
  transform: translateX(-50%);
}

.healthTitle {
  padding: 0 30px !important;
}

.el-select {
  margin-right: 20px;
}
</style>
