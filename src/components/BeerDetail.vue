<template>
  <v-card>
    <v-card-actions>
      <v-btn flat icon color="primary" @click="$router.go(-1)">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
    </v-card-actions>
    
    <v-img
      :src="beer.image_url"
      aspect-ratio="1"
      height="200px"
      contain
    ></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{beer.name}}</h3><br>
        <div>{{beer.tagline}}</div><br>
        <h3>description: {{beer.description}}</h3><br>
        <h3>brewers_tips:  {{beer.brewers_tips}}</h3><br>
        <h3>contributed_by: {{beer.contributed_by}}</h3><br>
        <h3>first_brewed: {{beer.first_brewed}}</h3><br>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat icon color="primary" v-on:click="addToCart(beer)">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import axios from "axios";
import store from "@/store/cart.js";
import router from '../router.js';

export default {
  data() {
    return {beer:{}}  
    },
    mounted() {
      this.performData();
    },
    watch: {
      '$route' (to, from) {
        this.performData();
      }
    },
  methods: {
    addToCart(beer) {
        store.commit("addToCart", beer);
    },
    performData() {
      axios
        .get("https://api.punkapi.com/v2/beers/"+this.$route.params.id)
        .then(response => (this.beer = response.data[0]));
    }
  }
};
</script>

