
export default class GovmapService {

    constructor() {

    }
    createMap() {
        window.govmap.createMap("map", {
            token: "5a4b8472-b95b-4687-8179-0ccb621c7990",
            layers: [],
            showXY: true,
            identifyOnClick: true,
            isEmbeddedToggle: false,
            center: { x: 217009, y: 755000 },// {x: 180996, y: 663402},
            layersMode: 1,
            level: 2,
            zoomButtons: false,
        });
    }
    async getCityCoords(cityTax) {
        const response = await window.govmap.geocode({ keyword: cityTax.cityName, type: window.govmap.geocodeType.AccuracyOnly })
        console.log(response)
        const answers = response.data
        const rightAnswer = answers.find(x=> x.ObjectID == cityTax.cityID)
        return {
            city: rightAnswer.ResultLable,
            x: rightAnswer.X,
            y: rightAnswer.Y
        }
    }
    async drawBubbles(taxCalculator) {
        const wkts = []
        const names = []
        const tooltips = []
        // const headers = []
        await taxCalculator.cityTaxArray.map(cityTax => {
            const coords = this.getCityCoords(cityTax)
            wkts.push(this.coordsToWkt(coords.x,coords.y))
            names.push(cityTax.cityName)
            tooltips.push(taxCalculator.calcMonthlyBenefitBy(cityTax))
        })
        const request = {
            // wkts: ['POINT(196062.48 621458.39)', 'POINT(200000.48 600000.39)', 'POINT(25000.48 650000.39)' ],
            wkts: wkts,
            names: names,
            geometryType: window.govmap.drawType.Point,
            data: {  
                tooltips: tooltips  
                // headers: ['כלכלה','חדשות','תרבות'],
            }
        }
        const response = await window.govmap.displayGeometries(request)
        console.log(response)
    }
    coordsToWkt(x,y) {
        return `POINT(${x} ${y})`
    }
}


// response.data[0].
// {
//     "ResultLable": "אבירים",
//     "ResultType": 1,
//     "ObjectID": "1220",
//     "ObjectIDType": "number",
//     "ObjectKey": "SETL_CODE",
//     "DescLayerID": "SETL_MID_POINT",
//     "Alert": null,
//     "X": 227273.51502654,
//     "Y": 771538.3731939,
//     "Gush": "",
//     "Parcel": "",
//     "showLotParcel": false,
//     "showLotAddress": false
// }