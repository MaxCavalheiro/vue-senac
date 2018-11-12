<template>
  <div>
    <v-container>
      <v-checkbox :label="`Bebidas Alcoólicas `" v-model="checkbox1" ></v-checkbox>
      <v-checkbox :label="`Cervejas Amargas `" v-model="checkbox2" ></v-checkbox>
      <v-checkbox :label="`Todas Cervejas `" v-model="checkbox3" ></v-checkbox>
    </v-container>

    <v-container grid-list-md>
      <v-layout row wrap>
        <!-- Laço com os dados de cervejas -->
        <!-- Notem que usamos a id devido ao object observer -->
        <v-flex v-for="beer in products" :key="beer.id" xs4>
          <!-- Passamos a prop com a nossa cerveja específica para ser renderizada no card. -->
          <BeerCard :beer="beer" />
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
// Como padrão, importamos nosso componente de card.
import BeerCard from "../components/BeerCard.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      // Criamos um dado para fazer o storage das nossas cervejas
      beers: [],
      loading: false
    };
  },
  components: {
    // Como padrão, registramos o componente
    BeerCard
  },
  computed: {
    // alcoholicBeers() {
    //   return store.getters.alcoholicBeers;
    // },
    // bitterBeers() {
    //   return store.getters.bitterBeers;
    // },
    // products() {
    //   return store.state.products;
    // },
    ...mapState({
      products: state => state.products
    }),

    ...mapGetters(['alcoholicBeers', 'bitterBeers'])

  },
  methods:{
    ...mapActions({
      fetchProducts: 'fetchProducts'
    })
  },

  created() {
    this.fetchProducts()
  }
};
</script>
