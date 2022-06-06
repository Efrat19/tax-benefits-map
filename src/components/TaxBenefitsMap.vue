<template>
  <div class="hello">
    <div id="map" style="width: 1500px; height: 800px"></div>
  </div>
</template>

<script>
// eslint-disable-next-line
import $ from "jquery";
// eslint-disable-next-line
import GovmapService from './govmapService.js'
export default {
  name: "TaxBenefitsMap",
  data(){
      return {
        govmapService: new GovmapService(),
      }
    },
  props: {
    income: Number
  },
  beforeCreate() {
    window.$ = window.jQuery = require('jquery')
  },
  mounted() {
    this.includeGovMapAPI()
    // setTimeout(this.govmapService.createMap, 3000);

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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
