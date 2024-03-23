import {api} from './fetch'

// ==================
// 医疗情况
// ==================

// 获取某年所有疾病的患病率
export function getAllDiseaseRate (year) {
  let url = 'medical/statistics/disease?year=' + year
  return api.get(url)
}

// 获取某年所有身体检查项的检查率。
export function getAllBodyExamRate (year) {
  let url = 'medical/statistics/bodyExam?year=' + year
  return api.get(url)
}

// 获取某年所有各类保险拥有率。
export function getAllInsuranceRate (year) {
  let url = 'medical/statistics/insurance?year=' + year
  return api.get(url)
}

// 获取某年所有医疗帮助项的选择率。
export function getAllHelperRate (year) {
  let url = 'medical/statistics/helper?year=' + year
  return api.get(url)
}

// 获取个人疾病情况
export function getPersonalDisease (id, year) {
  let url = 'medical/personal/' + id + '/disease?year=' + year
  return api.get(url)
}

// 获取个人身体检查情况
export function getPersonalBodyExam (id, year) {
  let url = 'medical/personal/' + id + '/bodyExam?year=' + year
  return api.get(url)
}

// 获取个人保险情况
export function getPersonalInsurance (id, year) {
  let url = 'medical/personal/' + id + '/insurance?year=' + year
  return api.get(url)
}

// 获取个人医疗花费情况
export function getPersonalMoney (id, year) {
  let url = 'medical/personal/' + id + '/money?year=' + year
  return api.get(url)
}

// 获取个人医疗帮助
export function getPersonalHelper (id, year) {
  let url = 'medical/personal/' + id + '/helper?year=' + year
  return api.get(url)
}

// ==================
// 资产情况
// ==================

// 获取所有家庭拥有资产情况
export function getAllAssetRate (year) {
  let url = 'asset/statistics?year=' + year
  return api.get(url)
}

// 筛选数据
export function filterData (obj) {
  let data = {
    leftStr: '==',
    leftNum: '200',
    rightStr: '<',
    rightNum: '300'
  }
  let params = new URLSearchParams()
  params.append('data', JSON.stringify(data))
  return api.post('/search', params)
}

// 上传添补excel
// export function addExcel (file) {
//   let param = new FormData()
//   param.append('excel', file)
//   return api.put('/excel/add', param, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     }
//   })
// }

// 上传重置excel
// export function resetExcel (file) {
//   let param = new FormData()
//   param.append('excel', file)
//   return api.put('/excel/reset', param, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     }
//   })
// }
