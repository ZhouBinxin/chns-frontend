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
  {path: '/chns/', name: 'filterPage', component: filterPage},
  {path: '/chns/medicalHealth', name: 'medicalHealth', component: medicalHealth},
  {path: '/chns/property', name: 'property', component: property},
  {path: '/chns/personalView', name: 'personalView', component: personalView},
  {path: '/chns/familyView', name: 'familyView', component: familyView},
  {path: '/chns/filterRes', name: 'filterRes', component: filterRes}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
