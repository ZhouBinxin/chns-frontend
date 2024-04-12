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
                  <el-option v-for="item in algorithmLists" :key="item.key" :label="item.key" :value="item.key"
                    :disabled="item.disabled">
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
      <div v-if="showAlert === false">
        <el-tabs type="border-card" v-model="activeName" style="margin: 20px;">
          <el-tab-pane label="折线图" name="first">
            <linechart v-if="algorithm === 'apriori'" :chartConfig="chartConfig" :items="items" />
          </el-tab-pane>
          <el-tab-pane label="表格" name="second">
            <apriori v-if="algorithm === 'apriori'" :results="results" :items="items" />
            <fpgrowth v-if="algorithm === 'FP-growth'" :results="results" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="showAlert === true">
        <el-empty description=""></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import apriori from '../components/charts/apriori.vue'
import fpgrowth from '../components/charts/fp-growth.vue'
import linechart from '../components/charts/lineChart.vue'
export default {
  components: {
    apriori,
    fpgrowth,
    linechart
  },
  data () {
    return {
      // 算法
      algorithm: 'apriori',
      algorithmLists: [{
        key: 'apriori',
        disabled: false
      },
      {
        key: 'LIG',
        disabled: true
      },
      {
        key: 'FP-growth',
        disabled: false
      },
      {
        key: 'k-means',
        disabled: true
      },
      {
        key: 'k-medois',
        disabled: true
      },
      {
        key: 'EM',
        disabled: true
      }],
      results: [],
      supportThreshold: 0.1,
      confidenceThreshold: 0.1,
      healthtypes: ['医疗', '财产', '保险'],
      healthtype: '医疗',
      showAlert: null,
      chartConfig: {

      },
      radio: '表格',
      activeName: 'first',
      items: [

      ]
    }
  },
  methods: {
    generateData () {
      // 模拟生成数据的过程，根据支持度阈值过滤数据
      let hlthData = [
        { itemset: ['咳嗽', '流感症状'], support: 0.35, confidence: 0.7 },
        { itemset: ['胸闷', '呼吸困难'], support: 0.25, confidence: 0.55 },
        { itemset: ['关节疼痛', '肿胀'], support: 0.4, confidence: 0.65 },
        { itemset: ['持续发热', '乏力'], support: 0.3, confidence: 0.6 },
        { itemset: ['恶心', '呕吐'], support: 0.2, confidence: 0.7 },
        { itemset: ['视力下降', '近视加深'], support: 0.35, confidence: 0.6 },
        { itemset: ['耳鸣', '听力减退'], support: 0.28, confidence: 0.52 },
        { itemset: ['肌肉酸痛', '关节炎迹象'], support: 0.42, confidence: 0.68 },
        { itemset: ['皮肤红斑', '过敏反应'], support: 0.33, confidence: 0.62 },
        { itemset: ['头晕', '低血压'], support: 0.29, confidence: 0.58 },
        { itemset: ['消化不良', '胃胀气'], support: 0.22, confidence: 0.7 },
        { itemset: ['尿频', '泌尿系统感染'], support: 0.36, confidence: 0.63 },
        { itemset: ['情绪低落', '抑郁症状'], support: 0.31, confidence: 0.59 },
        { itemset: ['体重减轻', '甲状腺功能亢进'], support: 0.27, confidence: 0.53 },
        { itemset: ['肌肉无力', '神经病变'], support: 0.32, confidence: 0.61 },
        { itemset: ['皮肤瘙痒', '湿疹症状'], support: 0.38, confidence: 0.64 },
        { itemset: ['发热', '肺炎迹象'], support: 0.24, confidence: 0.69 },
        { itemset: ['心跳不规则', '心律不齐'], support: 0.39, confidence: 0.56 },
        { itemset: ['失眠', '长期压力'], support: 0.34, confidence: 0.54 },
        { itemset: ['多尿', '糖尿病迹象'], support: 0.29, confidence: 0.67 }
      ]

      let insData = [
        { itemset: ['商业保险'], support: 0.3, confidence: 0.6 },
        { itemset: ['免费医疗保险'], support: 0.25, confidence: 0.7 },
        { itemset: ['职工补偿保险'], support: 0.2, confidence: 0.5 },
        { itemset: ['家庭成员保险'], support: 0.15, confidence: 0.8 },
        { itemset: ['商业保险', '免费医疗保险'], support: 0.1, confidence: 0.4 },
        { itemset: ['免费医疗保险', '职工补偿保险'], support: 0.1, confidence: 0.6 },
        { itemset: ['商业保险', '免费医疗保险', '家庭成员保险'], support: 0.05, confidence: 0.7 },
        { itemset: ['职工补偿保险', '家庭成员保险', '商业保险', '免费医疗保险'], support: 0.03, confidence: 0.9 }
      ]

      let asset = [
        { itemset: ['室内，可以冲水'], support: 0.3, confidence: 0.6 },
        { itemset: ['拥有自行车'], support: 0.25, confidence: 0.7 },
        { itemset: ['室外公共卫生间，可以冲水'], support: 0.2, confidence: 0.5 },
        { itemset: ['拥有汽车'], support: 0.15, confidence: 0.8 },
        { itemset: ['室内，可以冲水', '拥有自行车'], support: 0.1, confidence: 0.4 },
        { itemset: ['拥有自行车', '拥有汽车'], support: 0.1, confidence: 0.6 },
        { itemset: ['室内，可以冲水', '拥有自行车', '拥有汽车'], support: 0.05, confidence: 0.7 },
        { itemset: ['室外公共卫生间，可以冲水', '拥有汽车', '拥有自行车'], support: 0.03, confidence: 0.9 }
      ]

      if (this.healthtype === '医疗') {
        this.results = hlthData.filter(item => item.support >= this.supportThreshold && item.confidence >= this.confidenceThreshold)
      } else if (this.healthtype === '保险') {
        this.results = insData.filter(item => item.support >= this.supportThreshold && item.confidence >= this.confidenceThreshold)
      } else if (this.healthtype === '财产') {
        this.results = asset.filter(item => item.support >= this.supportThreshold && item.confidence >= this.confidenceThreshold)
      }

      this.chartConfig = {
        // title: {
        //   text: '动态折线图示例'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['支持度', '置信度']
        },
        xAxis: {
          type: 'category',
          data: this.results.map(item => item.itemset.join(', '))
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '支持度',
            type: 'line',
            data: this.results.map(item => item.support)
          },
          {
            name: '置信度',
            type: 'line',
            data: this.results.map(item => item.confidence)
          }
        ]
      }

      if (Object.keys(this.results).length === 0) {
        this.showAlert = true
      } else {
        this.showAlert = false
      }

      this.items = [
        { type: 'info', label: this.algorithm },
        { type: 'info', label: this.healthtype },
        { type: 'info', label: '支持度阈值：' + this.supportThreshold },
        { type: 'info', label: '置信度阈值：' + this.confidenceThreshold }
      ]
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
  border-radius: 4px;
  padding: 0;
  margin: 0;
}

.divider {
  height: 1px;
  background-color: rgb(64, 158, 255);
  margin-top: 30px;
}

.el-radio-group {
  margin-bottom: 30px;
}
</style>
