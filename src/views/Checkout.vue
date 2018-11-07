<template>
  <v-container fluid>

    <!-- Nosso primeiro componente -->
    <CheckOut />

  </v-container>
</template>

<script>
// Importação do componente
import CheckOut from "../components/Checkout.vue";
export default {
  // Registro do componente
  components: {
    CheckOut
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>