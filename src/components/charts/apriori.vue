<template>
  <div class="apriori">
    <div class="text-title">表格</div>
    <!-- <div class="tag-group">
      <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain" size="mini">
        {{ item.label }}
      </el-tag>
    </div> -->
    <el-table :data="results" style="width: 100%">
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
      <el-table-column prop="lift" label="提升度" sortable :sort-by="['lift']" :align="'center'">
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
    },
    items: {
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
  justify-content: center;
}

.itemset-item {
  background-color: #f5f5f5;
  padding: 5px 10px;
  margin: 5px;
}

.el-tag {
  margin: 5px;
}

.text-title {
  margin-top: 60px;
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
}
</style>
