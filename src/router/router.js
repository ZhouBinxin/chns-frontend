import Vue from 'vue'
import VueRouter from 'vue-router'
import filterPage from '../views/filterPage'
import filterRes from '../views/filterRes'
import medicalHealth from '../views/medicalhealth'
import property from '../views/property.vue'
import personalView from '../views/personalView.vue'
import familyView from '../views/familyView.vue'
import charts from '../views/charts.vue'
import test from '../views/test.vue'
import filterChartPage from '../views/filterChartPage.vue'
import filterChartRes from '../views/filterChartRes.vue'
import rView from '../views/rView.vue'

Vue.use(VueRouter)
/* eslint-disable */
const routes = [
  { path: '/', name: 'filterPage', component: filterPage },
  { path: '/medicalHealth', name: 'medicalHealth', component: medicalHealth },
  { path: '/property', name: 'property', component: property },
  { path: '/personalView', name: 'personalView', component: personalView },
  { path: '/familyView', name: 'familyView', component: familyView },
  { path: '/filterRes', name: 'filterRes', component: filterRes },
  { path: '/charts', name: 'charts', component: charts },
  { path: '/test', name: 'test', component: test },
  { path: '/filterChartPage', name: 'filterChartPage', component: filterChartPage},
  { path: '/filterChartRes', name: 'filterChartRes', component: filterChartRes },
  { path: '/rView', name: 'rView', component: rView }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
