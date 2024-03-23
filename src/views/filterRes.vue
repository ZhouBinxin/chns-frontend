<template>
  <div>
    <div class="filterRes">
      <div class="user-info-container">
        <el-page-header @back="goBack" content="筛选条件"> （{{ userFilterInfo.year }})
        </el-page-header>
        <el-row>
          <el-tag class="user-tag" v-for="(value, index) in userInfo" :key="index">{{ value }}</el-tag>
          <!--          <el-tag class="user-tag" v-for="(value, index) in userInfo" :key="index">{{ value }}</el-tag>-->
        </el-row>
      </div>
      <div class="textContent">
        <h3>筛选结果</h3>
        <div class="slotTitle">
          <div class="family-info header">
            <div class="index">序号</div>
            <div class="member-count">成员人数</div>
            <div class="house-status">住房情况</div>
            <div class="car-status">车辆情况</div>
            <div class="more">更多信息</div>
          </div>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index + 1" v-for="(item, index) in ansLists" :key="item + index">
            <div slot="title" class="slotTitle">
              <div class="family-info body">
                <div class="index">{{ index + 1 }}</div>
                <div class="member-count">{{ item.memberNum }}</div>
                <div class="house-status">{{ item.houseStatus }}</div>
                <div class="car-status">{{ item.carStatus }}</div>
                <div class="more" @click.stop="toFamilyMore(item, index)">更多</div>
              </div>
            </div>
            <div class="text" v-for="(memberItem, memberIndex) in item.memberData" :key="memberItem + memberIndex">
              <div class="index">成员 {{ memberIndex + 1 }}</div>
              <div class="name">性别：{{ memberItem.basicInfo.gender }}</div>
              <div class="province">省份：{{ memberItem.basicInfo.province }}</div>
              <div class="cityType">城市类型：{{ memberItem.basicInfo.cityType }}</div>
              <div class="more" @click.stop="toPersonMore(memberItem, memberIndex)">更多</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="block">
        <el-pagination
          :current-page="currentPage4"
          layout="total, prev, pager, next"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'filterRes',
  data () {
    return {
      activeNames: [],
      currentPage4: 1,
      // userFilterInfo: null,
      userInfo: [],
      ansLists: [{
        'id': '20210514',
        'memberNum': 5,
        'houseStatus': '从国家租房', // 住房情况
        'carStatus': '拥有三轮车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 5,
        'houseStatus': '从国家租房', // 住房情况
        'carStatus': '拥有三轮车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 6,
        'houseStatus': '从个人租房', // 住房情况
        'carStatus': '拥有三轮车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 6,
        'houseStatus': '从个人租房', // 住房情况
        'carStatus': '拥有汽车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 7,
        'houseStatus': '拥有', // 住房情况
        'carStatus': '拥有汽车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 7,
        'houseStatus': '免费居住', // 住房情况
        'carStatus': '拥有汽车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 5,
        'houseStatus': '部分所有权', // 住房情况
        'carStatus': '拥有自行车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 4,
        'houseStatus': '从工作单位租房', // 住房情况
        'carStatus': '拥有自行车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 4,
        'houseStatus': '从国家租房', // 住房情况
        'carStatus': '拥有三轮车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }, {
        'id': '20210514',
        'memberNum': 4,
        'houseStatus': '从国家租房', // 住房情况
        'carStatus': '拥有三轮车', // 车辆情况
        'memberData': [{ // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }, { // 每一个家庭成员的信息
          'id': '20210514',
          'basicInfo': { // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
            'gender': '男',
            'province': 'jilin',
            'cityType': '城市' // 农村，城市，balbala
          },
          'diseaseStatusText': '发烧', // 数据库里的个人的情况文字
          'bodyExamText': '发烧',
          'bodyExamText2': '发烧',
          'bodyExamText3': '发烧'
        }]
      }]
    }
  },
  created () {
    // this.userFilterInfo = this.userFilterInfo
    console.log(this.userFilterInfo)
    // this.setUserChosenInfo()
  },
  computed: {
    ...mapActions([
      'setFilterInfo'
    ])
    // eslint-disable-next-line vue/no-dupe-keys
  },
  methods: {
    ...mapState([
      'userFilterInfo'
    ]),
    handleChange (val) {
      // console.log(val)
    },
    setUserChosenInfo () {
      let tempHeal = this.userFilterInfo.healthFilterInfoObj
      let tempProp = this.userFilterInfo.propertyFilterInfoObj
      if (JSON.stringify(tempHeal) !== '{}') {
        for (let key in tempHeal) {
          if (Array.isArray(tempHeal[key])) {
            tempHeal[key].forEach(e => {
              this.userInfo.push(key + '：' + e)
            })
          } else {
            this.userInfo.push(key + '：' + tempHeal[key])
          }
        }
      }
      // debugger
      if (JSON.stringify(tempProp) !== '{}') {
        for (let key in tempProp) {
          for (let key_ in tempProp[key]) {
            if (Array.isArray(tempHeal[key])) {
              tempHeal[key].forEach(e => {
                this.userInfo.push(key + '：' + e)
              })
            } else {
              this.userInfo.push(key + '：' + tempProp[key][key_])
            }
          }
        }
      }
      console.log(this.userInfo)
    },
    goBack () {
      this.$router.push({name: 'filterPage'})
    },
    toFamilyMore (item, index) {
      this.$router.push({name: 'familyView'})
    },
    toPersonMore (item, index) {
      this.$router.push({name: 'personalView'})
    }
  }
}
</script>
<style scoped>

/*隐藏滚动条*/
* {
  scrollbar-width: none; /*Firefox*/
  -ms-overflow-style: none; /*IE10+*/
}

*::-webkit-scrollbar {
  display: none; /*ChromeSafari*/
}

.el-page-header {
  margin: 0 0 30px;
  font-weight: 700;
}

.filterRes {
  height: 820px;
  background-color: white;
  /* margin: 20px 30px 0; */
  border-radius: 4px;
  padding: 20px;
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
}

.slotTitle {
  font-size: 15px;
}

.user-info-container .el-row {
  max-height: 120px;
  overflow: scroll;
  padding: 20px 0;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}

.user-tag {
  margin: 5px 0 5px 10px;
}

.textContent {
  overflow: scroll;
}

.textContent h3 {
  margin-top: 30px;
}

.slotTitle {
  width: 100%;
}

.textContent .family-info {
  width: 100%;
  justify-content: space-between;
  display: flex;
}

.family-info div {
  width: 24%;
}

.family-info.header div {
  font-weight: 700;
}

.family-info.header {
  width: 99%;
  height: 50px;
  line-height: 50px;
  font-size: medium;
}

.family-info.body div.more,
.text div.more {
  color: rgb(64, 158, 255);
  cursor: pointer;
}

.family-info.body div.more:hover,
.text div.more:hover {
  text-decoration: underline;
}

.textContent .text {
  display: flex;
  width: 99%;
  margin: 10px 0 10px 20px;
  border-bottom: 1px solid #ebebeb;
}

.textContent .text div {
  width: 24%;
  font-size: small;
}

.el-collapse-item__content {
  padding-bottom: 0;
}

.el-collapse {
  max-height: 490px;
  overflow: scroll;
}

.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
