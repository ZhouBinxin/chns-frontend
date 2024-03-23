import Vue from 'vue'
import VueRouter from 'vue-router'
import filterPage from '../views/filterPage'
import filterRes from '../views/filterRes'
import medicalHealth from '../views/medicalhealth'
import property from '../views/property.vue'
import personalView from '../views/personalView.vue'
import familyView from '../views/familyView.vue'

Vue.use(VueRouter)
/* eslint-disable */
const routes = [
  {path: '/', name: 'filterPage', component: filterPage},
  {path: '/medicalHealth', name: 'medicalHealth', component: medicalHealth},
  {path: '/property', name: 'property', component: property},
  {path: '/personalView', name: 'personalView', component: personalView},
  {path: '/familyView', name: 'familyView', component: familyView},
  {path: '/filterRes', name: 'filterRes', component: filterRes}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
