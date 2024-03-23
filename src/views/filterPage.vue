<template>
  <div class="selectType">
    <div class="title">
      <h2>请选择要检索的内容</h2>
    </div>
    <div class="healthSelect">
      <div class="selectTitle">
        <i class="el-icon-office-building"></i>&nbsp;选择年份
      </div>
      <el-select
        v-model="year"
        clearable placeholder="请选择年份">
        <el-option
          v-for="item in yearLists"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <div class="selectTitle">
        <i class="el-icon-office-building"></i>&nbsp;医疗健康
      </div>
      <div class='selectContent'>
        <el-checkbox-group v-model="checkboxGroup1" size="medium">
          <el-checkbox-button
            @change="showHealthDetail(index)"
            v-for="(item, index) in healthTypes"
            :label="item" :key="item">{{ item }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <el-row class="detail-select-box">
          <el-col :span="8" v-if="detailItem.ifShow" v-for="(detailItem, detailIndex) in healthDetailInfo"
                  :key="detailIndex">
            <span class="healthTitle">{{ detailItem.title }}</span>
            <el-select
              v-if="detailIndex !== 4"
              v-model="detailItem.curr" clearable multiple placeholder="请选择"
              @change="healthChange(detailItem, detailIndex)">
              <el-option
                v-for="item in detailItem.detailLists"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-cascader
              v-if="detailIndex === 4"
              v-model="detailItem.curr"
              @change="healthChange(detailItem, detailIndex)"
              placeholder="请选择"
              :options="detailItem.detailLists"
              :props="{ expandTrigger: 'hover' }"></el-cascader>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--  家庭财产   -->
    <div class="propertySelect">
      <div class="selectTitle">
        <i class="el-icon-money"></i>&nbsp;家庭财产
      </div>
      <div class='selectContent'>
        <el-checkbox-group v-model="checkboxGroup1" size="medium">
          <el-checkbox-button
            @change="showPropertyDetail(index)"
            v-for="(item, index) in propertyTypes"
            :label="item" :key="item">{{ item }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <el-row class="detail-select-box">
          <el-col :span="24" v-if="detailItem.ifShow" v-for="(detailItem, detailIndex) in propertyDetailInfo"
                  :key="detailIndex">
            <span class="healthTitle">{{ detailItem.title }}</span>
            <el-select
              v-if="selectItem.itemName !== '饮用水' && selectItem.itemName !== '过滤水'"
              multiple
              v-model="selectItem.curr"
              clearable placeholder="请选择"
              v-for="(selectItem, selectIndex) in detailItem.itemLists" :key="selectIndex"
              @change="propertyChange(detailItem, selectItem, selectIndex)">
              <el-option
                v-for="item in selectItem.detailLists"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select
              v-if="selectItem.itemName === '饮用水' || selectItem.itemName === '过滤水'"
              v-model="selectItem.curr"
              clearable placeholder="请选择"
              v-for="(selectItem, selectIndex) in detailItem.itemLists" :key="selectIndex"
              @change="propertyChange(detailItem, selectItem, selectIndex)">
              <el-option
                v-for="item in selectItem.detailLists"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 立即检索 -->
    <el-row class="submit-btn">
      <el-button type="primary" :loading="showLoading" @click="toFilterRes">{{ submitButtonText }}</el-button>
    </el-row>
  </div>
</template>

<script>
// import {mapState, mapActions} from 'vuex'
// import {filterData} from '../axios/api'

export default {
  name: 'filterPage',
  components: {},
  data () {
    return {
      showLoading: false,
      submitButtonText: '开始检索',
      year: '2015',
      yearLists: ['1989', '1991', '1993', '1997', '2000', '2004', '2006', '2009', '2011', '2015'],
      healthDetailInfo: [
        {
          title: '患病情况',
          ifShow: false,
          curr: '',
          detailLists: ['心脏病、胸痛', '眼耳病', '皮疹', '皮炎', '关节、肌肉疼痛', '头痛、头晕', '哮喘', '胃疼', '腹泻、胃痛', '发烧、咳嗽、喉咙痛', '非传染病', '其他传染病']
        }, {
          title: '身体检查',
          ifShow: false,
          curr: '',
          detailLists: ['妇科检查', '产后检查', '产前检查', '视力/听力检查', '肿瘤筛查', '血压筛查', '血检', '儿童体检', '全身检查', '其他']
        }, {
          title: '医疗保险',
          ifShow: false,
          curr: '',
          detailLists: ['免费的医疗保险', '商业保险', '城市居民基本保险', '城市雇员基本保险', '合作保险', '其他保险']
        }, {
          title: '医疗帮助',
          ifShow: false,
          curr: '',
          detailLists: ['完全没关注', '看医生', '看当地的健康工作者', '自我护理']
        }, {
          title: '医疗费用',
          ifShow: false,
          curr: '',
          detailLists: [{
            value: '第一个地点的治疗费用',
            label: '第一个地点的治疗费用',
            children: [
              {value: '0-2000', label: '0-2000'},
              {value: '2001-5000', label: '2001-5000'},
              {value: '5001-10000', label: '5001-10000'},
              {value: '10001以上', label: '10001以上'}]
          }, {
            value: '第二个地点的治疗费用',
            label: '第二个地点的治疗费用',
            children: [
              {value: '0-2000', label: '0-2000'},
              {value: '2001-5000', label: '2001-5000'},
              {value: '5001-10000', label: '5001-10000'},
              {value: '10001以上', label: '10001以上'}]
          }, {
            value: '额外医疗费用',
            label: '额外医疗费用',
            children: [
              {value: '0-2000', label: '0-2000'},
              {value: '2001-5000', label: '2001-5000'},
              {value: '5001-10000', label: '5001-10000'},
              {value: '10001以上', label: '10001以上'}]
          }, {
            value: '疾病受伤的费用',
            label: '疾病受伤的费用',
            children: [
              {value: '0-2000', label: '0-2000'},
              {value: '2001-5000', label: '2001-5000'},
              {value: '5001-10000', label: '5001-10000'},
              {value: '10001以上', label: '10001以上'}]
          }, {
            value: '过去一年免疫接种费用',
            label: '过去一年免疫接种费用',
            children: [
              {value: '0-2000', label: '0-2000'},
              {value: '2001-5000', label: '2001-5000'},
              {value: '5001-10000', label: '5001-10000'},
              {value: '10001以上', label: '10001以上'}]
          }, {
            value: '预防性服务费用',
            label: '预防性服务费用',
            children: [
              {value: '0-2000', label: '0-2000'},
              {value: '2001-5000', label: '2001-5000'},
              {value: '5001-10000', label: '5001-10000'},
              {value: '10001以上', label: '10001以上'}]
          }]
        }],

      propertyDetailInfo: [
        {
          title: '住房情况',
          ifShow: false,
          itemLists: [{
            itemName: '住房情况',
            curr: '',
            detailLists: ['从国家租房', '从工作单位租房', '向个人租房', '拥有', '免费居住', '部分所有权/产权']
          }]
        }, {
          title: '家庭用水',
          ifShow: false,
          itemLists: [{
            itemName: '饮用水',
            curr: '',
            detailLists: ['为饮用水支付费用', '不为饮用水支付费用']
          }, {
            itemName: '水的种类',
            curr: '',
            detailLists: ['室内自来水', '院子里来的自来水', '院子里的井水', '瓶装水', '其他地方']
          }, {
            itemName: '过滤水',
            curr: '',
            detailLists: ['饮用前过滤水', '饮用前不过滤水']
          }]
        }, {
          title: '室内财产',
          ifShow: false,
          itemLists: [{
            itemName: '选项2',
            curr: '',
            detailLists: ['拥有彩电', '拥有洗衣机', '拥有冰箱', '拥有空调', '拥有缝纫机', '拥有电扇', '拥有大挂钟', '拥有录像机', '拥有黑白电视机', '拥有相机', '拥有微波炉', '拥有电饭煲', '拥有压力锅', '拥有电脑', '拥有电话', '拥有空气净化器']
          }, {
            itemName: '选项3',
            curr: '',
            detailLists: ['煤', '电力', '煤油', '液化石油气', '天然气', '木头、棍子、稻草等', '木炭', '其他']
          }, {
            itemName: '选项1',
            curr: '',
            detailLists: ['无浴室', '室外公共卫生间，可以冲水', '室内，不可以冲水', '室外公共卫生间，不能冲水', '泥土露天（厕所）', '水泥露天（厕所）', '室内，可以冲水', '其他']
          }, {
            itemName: '选项1',
            curr: '',
            detailLists: ['电气', '煤油', '油', '蜡烛', '其他']
          }]
        }, {
          title: '室外财产',
          ifShow: false,
          itemLists: [{
            itemName: '选项2',
            curr: '',
            detailLists: ['拥有三轮车', '拥有自行车', '拥有摩托车', '拥有汽车']
          }, {
            itemName: '选项3',
            curr: '',
            detailLists: ['拥有拖拉机', '拥有手扶拖拉机', '拥有动物车', '拥有灌溉设备', '拥有动力脱粒机', '拥有水泵']
          }]
        }],
      healthTypes: ['患病情况', '身体检查', '医疗保险', '医疗帮助', '医疗费用'],
      propertyTypes: ['住房情况', '家庭用水', '室内财产', '室外财产'],
      checkboxGroup1: [],
      checkboxGroup2: [],
      healthFilterInfoObj: {},
      propertyFilterInfoObj: {}
    }
  },
  computed: {
    // todo：mapActions 不知道哪里出了bug无法直接使用store的值
    // ...mapActions([
    //   'setFilterInfo'
    // ])
  },
  created () {
    // this.userFilterInfo = this.$store.state.userFilterInfo
    // console.log(this.$store)
  },
  methods: {
    // todo：mapState 不知道哪里出了bug无法直接使用store的值
    // ...mapState([
    //   'userFilterInfo'
    // ]),
    // 去筛选结果页
    toFilterRes () {
      // 将用户筛选的数据保存到仓库
      this.$store.dispatch('setFilterInfo', {
        healthFilterInfoObj: this.healthFilterInfoObj,
        propertyFilterInfoObj: this.propertyFilterInfoObj,
        year: this.year
      })

      let that = this
      this.submitButtonText = '正在检索...'
      this.showLoading = true

      // let tempData = this.getUserData()
      // console.log(tempData)
      // filterData(tempData).then(res => {
      //   console.log('数据获取成功', res.data)
      //   // this.$refs.bar.getData('property', res.data)
      // }).catch(err => {
      //   console.log(err)
      // })

      let timeId = setTimeout(function () {
        that.$router.push({name: 'filterRes'})
        this.showLoading = false
        clearTimeout(timeId)
      }, 1000)
    },
    // 医疗选择某一项
    showHealthDetail (index) {
      let temp = this.healthDetailInfo[index]
      this.healthDetailInfo[index].ifShow = !temp.ifShow
      // 当该项数据在用户数据中，但用户未选择时，需要进行删除
      if (temp.title in this.healthFilterInfoObj && !this.healthDetailInfo[index].ifShow) {
        delete this.healthFilterInfoObj[temp.title]
        this.healthDetailInfo[index].curr = ''
      }
      console.log(this.healthFilterInfoObj)
    },
    // 资产选择某一项
    showPropertyDetail (index) {
      let temp = this.propertyDetailInfo[index]
      this.propertyDetailInfo[index].ifShow = !temp.ifShow
      // 当该项数据在用户数据中，但用户未选择时，需要进行删除
      if (temp.title in this.propertyFilterInfoObj && !this.propertyDetailInfo[index].ifShow) {
        delete this.propertyDetailInfo[temp.title]
        this.propertyDetailInfo[index].curr = ''
      }
      console.log(this.propertyFilterInfoObj)
    },
    healthChange (item, index) {
      // if (item.curr === '请选择') return
      this.healthFilterInfoObj[item.title] = item.curr
      console.log(this.healthFilterInfoObj)
    },
    propertyChange (fItem, sItem, index) {
      // if (sItem.curr === '请选择') return
      if (this.propertyFilterInfoObj[fItem.title] === undefined) this.propertyFilterInfoObj[fItem.title] = {}
      this.propertyFilterInfoObj[fItem.title][index] = sItem.curr
      console.log(this.propertyFilterInfoObj)
    },
    toPersonalView () {
      if (this.item1 || this.item2 || this.item3) {
        this.$router.push({name: 'personalview'})
      } else {
        alert('请至少选择一项')
      }
    },
    // 根据用户输入的数据生成后端查询时需要的数据
    getUserData () {
      let obj = {year: this.year}
      obj['quesData'] = []
      // debugger
      let tempHeal = this.healthFilterInfoObj
      let tempProp = this.propertyFilterInfoObj
      let type = 0
      if (JSON.stringify(tempHeal) !== '{}') {
        for (let key in tempHeal) {
          // 判断多选还是单选
          type = Array.isArray(tempHeal[key]) ? 2 : 1
          let tempObj = {
            'questionChinese': key,
            'questionType': type,
            'answer': tempHeal[key],
            'leftStatus': '',
            'leftNum': 0,
            'rightStatus': '',
            'rightNum': 0
          }
          if (key === '医疗费用') tempObj = this.setTempObjMoney(tempObj)
          obj['quesData'].push(tempObj)
        }
      }
      if (JSON.stringify(tempProp) !== '{}') {
        for (let key in tempProp) {
          for (let key_ in tempProp[key]) {
            type = Array.isArray(tempProp[key][key_]) ? 2 : 1
            let tempObj = {
              'questionChinese': key,
              'questionType': type,
              'answer': tempProp[key][key_],
              'leftStatus': '',
              'leftNum': 0,
              'rightStatus': '',
              'rightNum': 0
            }
            obj['quesData'].push(tempObj)
          }
        }
      }
      return obj
    },
    setTempObjMoney (obj) {
      let ans = obj['answer']
      obj['leftStatus'] = '<='
      obj['rightStatus'] = '<'
      obj['questionType'] = 0
      if (ans[1].split('-')[1] === undefined) {
        obj['leftNum'] = 10001
        obj['rightNum'] = 'none'
        obj['rightStatus'] = 'none'
      } else {
        obj['leftNum'] = ans[1].split('-')[0]
        obj['rightNum'] = ans[1].split('-')[1]
      }
      return obj
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
  margin: 30px 30px 0;
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

.healthTitle, .propertyTitle {
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
