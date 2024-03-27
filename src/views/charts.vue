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

                <div v-if="algorithm != ''" class="selectTitle">
                  <i class="el-icon-office-building"></i>&nbsp;参数
                </div>

                <el-input v-if="['apriori', 'LIG', 'FP-growth'].includes(algorithm)" v-model="supportThreshold" placeholder="请输入支持度阈值" size="small"
                  :style="{ width: '200px' }">
                  <template slot="prepend">支持度阈值：</template>
                </el-input>

                <el-button type="primary" @click="generateData">生成</el-button>

              </div>
            </div>
          </el-main>
        </el-container>
      </div>
      <div>
        <apriori :data="aprioriResults" />
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
      supportThreshold: 0.5
    }
  },
  methods: {
    generateData () {
      // 模拟生成数据的过程，根据支持度阈值过滤数据
      let testData = [
        { itemset: '{A}', support: 0.6 },
        { itemset: '{B}', support: 0.7 },
        { itemset: '{C}', support: 0.5 },
        { itemset: '{D}', support: 0.4 },
        { itemset: '{A, B}', support: 0.4 },
        { itemset: '{A, C}', support: 0.3 },
        { itemset: '{A, D}', support: 0.2 },
        { itemset: '{B, C}', support: 0.35 },
        { itemset: '{B, D}', support: 0.25 },
        { itemset: '{C, D}', support: 0.3 },
        { itemset: '{A, B, C}', support: 0.2 },
        { itemset: '{A, B, D}', support: 0.15 },
        { itemset: '{A, C, D}', support: 0.1 },
        { itemset: '{B, C, D}', support: 0.2 },
        { itemset: '{A, B, C, D}', support: 0.1 }
        // 可以继续添加更多的数据
      ]

      this.aprioriResults = testData.filter(item => item.support >= this.supportThreshold)
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
