<template>
  <div>
    <div class="personalView">
      <el-page-header @back="goBack" content="家庭信息"></el-page-header>
      <!-- 每一个图表的div -->
      <div class="textContent">
        <h3>基本信息</h3>
        <div class="basic-info">
          <div class="memberNum">人数：{{memberNum}} 人</div>
          <div class="house">住房情况：{{houseStatus}}</div>
          <div class="car">车辆情况：{{carStatus}}</div>
        </div>
        <h3>财产情况</h3>
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
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
      memberNum: '4',
      houseStatus: '吉林省',
      carStatus: '皇家贵族',
      year: '2015',
      tableData: [{
        item: '住房情况',
        desc: '家庭的住房情况为：拥有'
      }, {
        item: '家庭用水',
        desc: "家庭是否为饮用水支付费用：是"
      }, {
        item: '家庭用水',
        desc: '家庭获得的饮用水为：室内自来水'
      }, {
        item: '家庭用水',
        desc: '家庭饮用前是否过滤水：是'
      }, {
        item: '室内财产',
        desc: '家庭拥有的家电是：电扇、电视'
      },  {
        item: '室内财产',
        desc: '家庭使用的烹饪燃料是：天然气'
      }, {
        item: '室内财产',
        desc: '家庭使用的厕所类型为：室内，可以冲水'
      }, {
        item: '室内财产',
        desc: '家庭使用的照明类型为：电气'
      }, {
        item: '室外财产',
        desc: '家庭拥有的车辆是：汽车'
      }, {
        item: '室外财产',
        desc: '家庭拥有的农机是：水泵'
      }],
      spanArr: [],      //声明一个数组
    }
  },
  mounted: function() {
    this.tableDatas();               //加载数据就调用该方法
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    goBack () {
      this.$router.push({name: 'filterRes'})
    },
    //合并行数
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {                     //合并第一列
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    tableDatas() {
      let contactDot = 0;
      this.tableData.forEach((tableItem, index) => {
        tableItem.index = index;
        if (index === 0) {
          this.spanArr.push(1);
        } else {
          if (tableItem.item === this.tableData[index - 1].item) {
            this.spanArr[contactDot] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            contactDot = index;
          }
        }
      });
    },
  }
}
</script>
<style scoped>

.el-page-header {
  margin: 0 0 30px;
  font-weight: 700;
}

.personalView {
  min-height: 800px;
  background-color: white;
  margin: 20px 30px;
  border-radius: 4px;
  padding: 50px;
}

.personalView {
  padding: 30px;
}

.textContent h3 {
  margin-top: 30px;
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

.el-table__row .cell {
  white-space: pre-line!important;
}
</style>
