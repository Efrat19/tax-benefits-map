<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <tax-benefits-map msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import TaxBenefitsMap from './components/TaxBenefitsMap.vue'

export default {
  name: 'App',
  components: {
     TaxBenefitsMap
  },
  mounted() {
    this.includeGovMapAPI()
  },
  methods: {
    includeGovMapAPI() {
      if (document.getElementById('govmap-api')) return; // was already loaded
      var scriptTag = document.createElement("script");
      scriptTag.src = "https://www.govmap.gov.il/govmap/api/govmap.api.js";
      scriptTag.id = "govmap-api";
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
  }
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
