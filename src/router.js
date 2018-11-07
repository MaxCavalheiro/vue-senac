import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import BeerDetail from './views/BeerDetail.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/checkout',
      name: 'checkout',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ './views/Checkout.vue')
    },
    { path: '/BeerDetail/:id', component: BeerDetail },
    {
      path: '/BeerDetail/:id',
      name: 'BeerDetail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ './views/BeerDetail.vue')
    }
  ]
})
