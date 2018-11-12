import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

import VuexPersist from 'vuex-persist'

import {
  findIndex
} from 'lodash-es'
Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'appbeers',
  storage: localStorage
})

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],

  state: {
    products: [],
    beers: [],
    qty: 0,
    count: 0,
    cartTotal: 0
  },

  getters: {
    alcoholicBeers(state, getters) {
      return state.products.filter(product => product.abv > 13)
    },
    bitterBeers(state, getters) {
      return state.products.filter(product => product.ibu > 20)
    },
    availableProducts(state, getters) {
      return state.products.filter(product => product.ibu > 30)
    },
  },

  mutations: {
    addToCart(state, beer) {
      let index = findIndex(state.beers, (o) => o.id == beer.id)
      if (index === -1) {
        state.beers.push({
          id: beer.id,
          name: beer.name,
          price: 2.5,
          quantity: 1,
          image_url: beer.image_url
        })
      } else {
        state.beers[index].quantity++;
      }

      state.cartTotal = state.beers.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0)
      state.count++

    },
    setProducts(state, products) {
      state.products = products
    },
    addQtdeProd(state,beer){
      let index = findIndex(state.beers, (o) => o.id == beer.id)
      state.beers[index].quantity++;
    },
    removeQtdeProd(state,beer){
      let index = findIndex(state.beers, (o) => o.id == beer.id)
      if(state.beers[index].quantity > 1){
        state.beers[index].quantity--;
      }
    },
    deleteBeer(state,beer){
      let index = findIndex(state.beers, (o) => o.id == beer.id)
      state.beers.splice(index, 1)
    }
  },
  actions: {
    fetchProducts({
      commit
    }) {
      axios
        .get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6")
        .then(response => {
          let results = response.data
          commit('setProducts', results)
        })
    },
  }
})