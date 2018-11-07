<template>
  <v-container fluid>
    <BeerDetail />
  </v-container>
</template>

<script>
// Importação do componente
import BeerDetail from "../components/BeerDetail.vue";
import router from '../router.js';

export default {
  // Registro do componente
  components: {
    BeerDetail
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>