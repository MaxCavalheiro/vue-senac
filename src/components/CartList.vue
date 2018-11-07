<template>
  <v-list two-line subheader>
    <v-subheader inset>Shopping Cart</v-subheader>

    <v-list-tile
      v-for="beer in beers"
      :key="beer.id"
      avatar
      @click="navigateToDetail(beer)"
    >
      <v-list-tile-avatar>
        <img :src="beer.image_url">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
        <v-list-tile-sub-title>Qtde: 
      
        <v-btn flat icon color="primary" v-on:click="addQtdeProd(beer)">
          <v-icon>add</v-icon>
        </v-btn>

        {{ beer.quantity }}

        <v-btn flat icon color="pink" v-on:click="removeQtdeProd(beer)">
          <v-icon>remove</v-icon>
        </v-btn>

      </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1" v-on:click="deleteBeer(beer)">delete_forever</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider inset></v-divider>

    <v-alert :value="true" type="success">
      R$: {{totalBeers}}
    </v-alert>

    <v-btn flat color="teal" :to="{name: 'checkout'}">
        <v-icon>shopping_cart</v-icon>
        <span>Check-Out</span>
    </v-btn>
  </v-list>
</template>

<script>

import store from "@/store/cart.js";
import router from '../router.js';

export default {
  computed: {
    beers() {
      return store.state.beers;
    },
    totalBeers() {
       return store.state.beers.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }
  },
  methods:{
    addQtdeProd(beer){
      store.commit("addQtdeProd", beer)
    },
    removeQtdeProd(beer){
      store.commit("removeQtdeProd", beer)
    },
    deleteBeer(beer){
      store.commit("excluir", beer)
    },
    navigateToDetail(beer) {
      router.push({name: 'BeerDetail', params: { id: beer.id }});
    }
  }
};
</script>
