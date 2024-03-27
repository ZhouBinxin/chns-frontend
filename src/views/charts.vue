<template>
  <div>
    <div class="medical-health">
      <div class="algorithm-select">
        <el-container class="content">
          <el-main>
            <div class="container">
              <div class="block">
                <div class="selectTitle">
                  <i class="el-icon-office-building"></i>&nbsp;选择算法
                </div>
                <el-select v-model="algorithm" clearable placeholder="请选择算法">
                  <el-option v-for="item in algorithmLists" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="healthtype" clearable placeholder="请选择类别">
                  <el-option v-for="item in healthtypes" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>

                <div v-if="algorithm != ''" class="selectTitle">
                  <i class="el-icon-office-building"></i>&nbsp;参数
                </div>

                <el-input v-if="['apriori', 'LIG', 'FP-growth'].includes(algorithm)" v-model="supportThreshold"
                  placeholder="请输入支持度阈值" size="small" :style="{ width: '260px' }">
                  <template slot="prepend">支持度阈值：</template>
                </el-input>
                <el-input v-if="['apriori', 'LIG', 'FP-growth'].includes(algorithm)" v-model="confidenceThreshold"
                  placeholder="请输入置信度阈值" size="small" :style="{ width: '260px' }">
                  <template slot="prepend">置信度阈值：</template>
                </el-input>

                <el-button type="primary" @click="generateData">生成</el-button>

              </div>
            </div>
          </el-main>
        </el-container>
      </div>
      <div>
        <apriori :data="aprioriResults" :showAlert="showAlert"/>
      </div>
    </div>
  </div>
</template>

<script>
import apriori from '../components/charts/apriori.vue'
export default {
  components: {
    apriori
  },
  data () {
    return {
      // 算法
      algorithm: 'apriori',
      algorithmLists: ['apriori', 'LIG', 'FP-growth', 'k-means', 'k-medois', 'EM'],
      aprioriResults: [],
      supportThreshold: 0.5,
      confidenceThreshold: 0.5,
      healthtypes: ['医疗', '财产', '保险'],
      healthtype: '医疗',
      showAlert: false
    }
  },
  methods: {
    generateData () {
      // 模拟生成数据的过程，根据支持度阈值过滤数据
      let hlthData = [
        { itemset: '{发烧}', support: 0.3, confidence: 0.6 },
        { itemset: '{头痛}', support: 0.25, confidence: 0.7 },
        { itemset: '{胃痛}', support: 0.2, confidence: 0.5 },
        { itemset: '{皮疹}', support: 0.15, confidence: 0.8 },
        { itemset: '{发烧, 头痛}', support: 0.1, confidence: 0.4 },
        { itemset: '{头痛, 胃痛}', support: 0.1, confidence: 0.6 },
        { itemset: '{发烧, 胃痛, 皮疹}', support: 0.05, confidence: 0.7 },
        { itemset: '{头痛, 皮疹, 发烧, 胃痛}', support: 0.03, confidence: 0.9 }
      ]

      let insData = [
        { itemset: '{商业保险}', support: 0.3, confidence: 0.6 },
        { itemset: '{免费医疗保险}', support: 0.25, confidence: 0.7 },
        { itemset: '{职工补偿保险}', support: 0.2, confidence: 0.5 },
        { itemset: '{家庭成员保险}', support: 0.15, confidence: 0.8 },
        { itemset: '{商业保险, 免费医疗保险}', support: 0.1, confidence: 0.4 },
        { itemset: '{免费医疗保险, 职工补偿保险}', support: 0.1, confidence: 0.6 },
        { itemset: '{商业保险, 免费医疗保险, 家庭成员保险}', support: 0.05, confidence: 0.7 },
        { itemset: '{职工补偿保险, 家庭成员保险, 商业保险, 免费医疗保险}', support: 0.03, confidence: 0.9 }
      ]

      let asset = [
        { itemset: '{室内，可以冲水}', support: 0.3, confidence: 0.6 },
        { itemset: '{拥有自行车}', support: 0.25, confidence: 0.7 },
        { itemset: '{室外公共卫生间，可以冲水}', support: 0.2, confidence: 0.5 },
        { itemset: '{拥有汽车}', support: 0.15, confidence: 0.8 },
        { itemset: '{室内，可以冲水, 拥有自行车}', support: 0.1, confidence: 0.4 },
        { itemset: '{拥有自行车, 拥有汽车}', support: 0.1, confidence: 0.6 },
        { itemset: '{室内，可以冲水, 拥有自行车, 拥有汽车}', support: 0.05, confidence: 0.7 },
        { itemset: '{室外公共卫生间，可以冲水, 拥有汽车, 拥有自行车}', support: 0.03, confidence: 0.9 }

      ]

      if (this.healthtype === '医疗') {
        this.aprioriResults = hlthData.filter(item => item.support >= this.supportThreshold && item.confidence >= this.confidenceThreshold)
      } else if (this.healthtype === '保险') {
        this.aprioriResults = insData.filter(item => item.support >= this.supportThreshold && item.confidence >= this.confidenceThreshold)
      } else if (this.healthtype === '资产') {
        this.aprioriResults = asset.filter(item => item.support >= this.supportThreshold && item.confidence >= this.confidenceThreshold)
      }

      if (this.aprioriResults.length === 0) {
        console.log('没有找到匹配的结果')
        console.log(this.showAlert)
        this.showAlert = true
        console.log(this.showAlert)
      } else {
        this.showAlert = false
      }
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
