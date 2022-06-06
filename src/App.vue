<template>
  <div id="app">
    <label for="income">Enter your monthly bruto:</label><br>
    <input type="number" name="month bruto" v-model="income" id="income">
    <!-- <br>
    <label for="taxRate">Enter your tax rate:</label><br>
    <select name="tax rate %" v-model="taxRate" id="taxRate">
    <option disabled value="">Please select your tax rate</option>
    <option>10</option>
    <option>14</option>
    <option>20</option>
    <option>31</option>
    <option>35</option>
    <option>47</option>
    <option>50</option>
  </select> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <tax-benefits-map :income="income" />
  </div>
</template>

<script>
import TaxBenefitsMap from './components/TaxBenefitsMap.vue'

export default {
  name: 'App',
  data(){
      return {
        income: 0,
        // taxRate: 0
      }
    },
  components: {
     TaxBenefitsMap
  },
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
