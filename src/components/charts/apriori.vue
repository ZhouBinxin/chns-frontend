<template>
  <div>
    <el-table v-if="data.length > 0" :data="data" style="width: 100%">
      <el-table-column prop="itemset" label="频繁项集">
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
  props: {
    showAlert: {
      type: Boolean,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
