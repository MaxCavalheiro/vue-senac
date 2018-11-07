<template>

<v-container>
  <v-list two-line subheader>
    <v-subheader inset>Checkout</v-subheader>

    <v-list-tile
      v-for="beer in beers"
      :key="beer.id"
      avatar
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
      R$: {{totalBeersPrice}}
    </v-alert>

    <v-btn flat color="teal">
        <v-icon>shopping_cart</v-icon>
        <span>Finalizar pedido</span>
    </v-btn>

    <v-btn flat color="orange" @click="$router.go(-1)">Voltar</v-btn>

  </v-list>   
     
  <v-list three-line subheader>

    <span class="price"> R$ {{(totalBeersPrice - discount).toFixed(2).replace('.',',')}} </span>
    <br>

    <span class="discount" v-if="discount > 0"> R$ {{totalBeersPrice.toFixed(2).replace('.',',')}}  </span>
    <v-chip v-if="discount > 0" label color="success" text-color="white"> 10% OFF </v-chip>

  </v-list>

  </v-container>
</template>

<style scoped>
.discount {
  text-decoration: line-through;
  color: darkgray;
}
.price {
  font-weight: bold;
}
</style>

<script>
import store from "@/store/cart.js";

export default {
  computed: {
    beers() {
      return store.state.beers;
    },
    totalBeersPrice() {
      return store.state.beers.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    totalBeers() {
      return store.state.beers.reduce((acc, item) => acc + item.quantity, 0);
    }
  },
  data() {
    return {
      discount: 0
    };
  },
  created() {
    this.updateDiscount();
  },
  methods: {
    addQtdeProd(beer) {
      store.commit("addQtdeProd", beer);
    },
    removeQtdeProd(beer) {
      store.commit("removeQtdeProd", beer);
    },
    deleteBeer(beer) {
      store.commit("deleteBeer", beer);
    },
    updateDiscount() {
      if (this.totalBeers >= 10) {
        this.discount = (this.totalBeersPrice / 100) * 10;
      } else {
        this.discount = 0;
      }
    }
  },
  watch: {
    totalBeers: function() {
      this.updateDiscount();
    }
  }
};
</script>