<template>
  <div class="apriori">
    <el-table v-if="results.length > 0" :data="results" style="width: 100%">
      <el-table-column prop="itemset" label="频繁项集" :align="'center'">
        <template slot-scope="scope">
          <div v-if="Array.isArray(scope.row.itemset)" class="itemset-list">
            <div style="display: flex; justify-content: center;">
              <div v-for="(item, index) in scope.row.itemset" :key="index" class="itemset-item">{{ item }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="support" label="支持度" sortable :sort-by="['support']" :align="'center'">
      </el-table-column>
      <el-table-column prop="confidence" label="置信度" sortable :sort-by="['confidence']" :align="'center'">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    results: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.apriori {
  margin: 0 50px 0 50px;
}

.itemset-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.itemset-item {
  background-color: #f5f5f5;
  padding: 5px 10px;
  margin: 5px;
}
</style>
