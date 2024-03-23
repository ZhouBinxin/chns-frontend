export default {
  // 更改用户筛选信息
  setFilterInfo ({commit}, obj) {
    console.log(obj)
    commit('SET_FILTER_INFO', obj)
  }
}
