
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
        const answers = response.data
        // console.log('response.data:')
        // console.log(response.data)
        const rightAnswer = answers.find(x=> {
            console.log(` cityTax.cityID: ${cityTax.cityID}, x.ObjectID: ${x.ObjectID}, result: ${x.ObjectID == cityTax.cityID}`)
            return x.ObjectID == cityTax.cityID
        })
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
        await taxCalculator.cityTaxArray.map(async cityTax => {
            const coords = await this.getCityCoords(cityTax)
            // console.log('coords:')
            // console.log(coords)
            wkts.push(this.coordsToWkt(coords.x,coords.y))
            names.push(cityTax.cityName)
            const benefit = taxCalculator.calcMonthlyBenefitBy(cityTax)
            tooltips.push(`save ${benefit}₪`)
        })
        // console.log('wkts') 
        // console.log(wkts) 
        // console.log('names') 
        // console.log(names) 
        // console.log('tooltips') 
        // console.log(tooltips) 
        // const bubbleContent = "<div style='border: 1px solid #525252; margin: 10px;padding: 10px;'><div style='background-color: yellow;'>{0}</div><div               style='background-color: blue;'>{1}</div></div>";
        const request = {
            // wkts: ['POINT(196062.48 621458.39)', 'POINT(200000.48 600000.39)', 'POINT(25000.48 650000.39)' ],
            wkts: wkts,
            names: names,
            geometryType: window.govmap.drawType.Point,
            data: {  
                tooltips: tooltips,
                headers: ['hi', 'hi','hi'],
                // bubbles: ['hi', 'hi','hi'],
                // bubbleUrl: 'http://localhost:8080/',
                // BubbleType: ['BUS','BUS','BUS'],
                // bubbleHTML: bubbleContent,
                // bubbleHTMLParameters: [['פוליגון 1','מידע נוסף...'], ['פוליגון 2', 'מידע נוסף...'],['פוליגון 2', 'מידע נוסף...']]
            },
            defaultSymbol: {  
                url:'https://icon-library.com/images/map-point-icon/map-point-icon-17.jpg',  
                width:15,  
                height:15  
            },
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