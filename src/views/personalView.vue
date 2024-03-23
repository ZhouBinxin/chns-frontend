<template>
  <div>
    <div class="personalView">
      <el-page-header @back="goBack" content="个人信息"></el-page-header>
      <!-- 每一个图表的div -->
      <div class="textContent">
        <h3>基本信息</h3>
        <el-row class="basic-info">
          <el-col :span="12" class="name">id：{{ id }}</el-col>
          <el-col :span="12" class="gender">性别：{{ gender }}</el-col>
          <el-col :span="12" class="years">年龄：{{ years }}</el-col>
          <el-col :span="12" class="nation">民族：{{ nation }}</el-col>
          <el-col :span="12" class="province">省份：{{ province }}</el-col>
          <el-col :span="12" class="cityType">城市/农村：{{ cityType }}</el-col>
        </el-row>
        <h3>医疗情况</h3>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="item"
            width="200"
            label="项目">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    return {
      activeNames: ['1'],
      id: '20210513',
      years: '25',
      gender: '男',
      nation: '汉',
      province: '吉林省',
      cityType: '皇家贵族',
      year: '2015',
      tableData: [{
        item: '医疗保险',
        desc: '拥有的医疗保险类型有：『 商业保险 城市雇员基本保险 』'
      }, {
        item: '患病情况',
        desc: '在近一个月内有过『 发烧-喉咙痛-咳嗽 头痛-头晕 』的症状'
      }, {
        item: '身体检查',
        desc: '进行过的身体检查有：『 血压筛查 』'
      }, {
        item: '医疗费用',
        desc: '2015年的医疗总花费为：『 xx元 』，其中预防性医疗费用占比xx%，总治疗费用占比xx%'
      }, {
        item: '医疗帮助',
        desc: '当感到不舒服时，选择了『 看医生  』，地点是『 工作单位诊所 』'
      }]
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    goBack () {
      this.$router.push({name: 'filterRes'})
    }
  }
}
</script>
<style scoped>

.el-page-header {
  margin: 0 0 30px;
  font-weight: 700;
}

.personalView {
  height: 800px;
  background-color: white;
  margin: 20px 30px 0;
  border-radius: 4px;
  padding: 50px;
}

.personalView {
  padding: 30px;
}

.textContent h3 {
  margin-top: 50px;
}

.basic-info {
  width: 60%;
}

.basic-info div {
  margin: 10px 0;
  border-left: 3px solid rgb(64, 158, 255);
  padding-left: 20px;
}

.title {
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
  margin-bottom: 40px;
}

/* .el-collapse-item{
    font-size: large;
} */
.text {
  font-size: 16px;
  width: 70%;
  margin-left: 15%;
}

.slotTitle {
  font-size: 15px;
}
</style>
