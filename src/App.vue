<template>
  <div id="app">
            <tax-benefits-map />
  </div>
</template>

<script>
import TaxBenefitsMap from './components/TaxBenefitsMap.vue'

export default {
  name: 'App',
  data(){
      return {
      }
    },
  components: {
     TaxBenefitsMap
  },
  methods:{}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
