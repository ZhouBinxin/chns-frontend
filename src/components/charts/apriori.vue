<template>
  <div>
    <el-table v-if="results.length > 0" :data="results" style="width: 100%">
      <el-table-column prop="itemset" label="频繁项集">
        <template slot-scope="scope">
          <div v-if="Array.isArray(scope.row.itemset)" class="itemset-list">
            <div v-for="(item, index) in scope.row.itemset" :key="index" class="itemset-item">{{ item }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="support" label="支持度" sortable :sort-by="['support']">
      </el-table-column>
      <el-table-column prop="confidence" label="置信度" sortable :sort-by="['confidence']">
      </el-table-column>
    </el-table>
    <div v-else>
      <el-result v-if="showAlert" icon="warning" title="" subTitle="无满足数据">

      </el-result>
    </div>

  </div>
</template>

<script>
export default {
  data () {

  },
  props: {
    showAlert: {
      type: Boolean,
      required: true
    },
    results: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.itemset-list {
  display: flex;
  flex-wrap: wrap;
}

.itemset-item {
  background-color: #f5f5f5;
  padding: 5px 10px;
  margin: 5px;
}
</style>
