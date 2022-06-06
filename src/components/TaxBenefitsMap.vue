<template>
  <div class="hello">
    <div id="map" style="width: 1500px; height: 800px"></div>
  </div>
</template>

<script>
// eslint-disable-next-line
import $ from "jquery";

export default {
  name: "TaxBenefitsMap",
  props: {
    income: Number,
    // taxRate: Number,
  },
  beforeCreate() {
    window.$ = window.jQuery = require('jquery')
  },
  mounted() {
    this.includeGovMapAPI()
    setTimeout(this.createMap, 3000); 
    
  },
  methods: {
    includeGovMapAPI() {
      if (document.getElementById('govmap-api')) return; // was already loaded
      var scriptTag = document.createElement("script");
      scriptTag.src = "https://www.govmap.gov.il/govmap/api/govmap.api.js";
      scriptTag.id = "govmap-api";
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    },
    createMap() {
      window.govmap.createMap("map", {
        token: "5a4b8472-b95b-4687-8179-0ccb621c7990",
        layers: [],
        showXY: true,
        identifyOnClick: true,
        isEmbeddedToggle: false,
				center: {x: 217009, y: 755000},// {x: 180996, y: 663402},
        layersMode: 1,
        level: 2,
        zoomButtons: false,
      });
      this.getCityCoords()
    },
    getCityCoords(){
      window.govmap.geocode({keyword: 'אבירים', type: window.govmap.geocodeType.AccuracyOnly}
            ).then(function(response){
                console.log(response)
            });  
    }
  },
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
