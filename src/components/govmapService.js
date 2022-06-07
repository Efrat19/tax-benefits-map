
import TaxCalcService from './taxCalcService.js'
export default class GovmapService {

    constructor() {
        this.taxCalculator = new TaxCalcService()
    }
    createMap() {
        window.govmap.createMap("map", {
            token: "5a4b8472-b95b-4687-8179-0ccb621c7990",
            layers: [],
            showXY: true,
            identifyOnClick: true,
            isEmbeddedToggle: false,
            center: { x: 217009, y: 755000 },
            layersMode: 1,
            level: 2,
            zoomButtons: false,
        });
    }
    async getCityCoords(cityTax) {
        const response = await window.govmap.geocode({ keyword: cityTax.cityName, type: window.govmap.geocodeType.AccuracyOnly })
        const answers = response.data
        const rightAnswer = answers.find(x => {
            // console.log(` cityTax.cityID: ${cityTax.cityID}, x.ObjectID: ${x.ObjectID}, result: ${x.ObjectID == cityTax.cityID}`)
            return x.ObjectID == cityTax.cityID
        })
        return {
            city: rightAnswer.ResultLable,
            x: rightAnswer.X,
            y: rightAnswer.Y
        }
    }
    async drawBubbles(income) {
        const wkts = []
        const names = []
        const tooltips = []
        await this.taxCalculator.cityTaxArray.map(async cityTax => {
            const coords = await this.getCityCoords(cityTax)
            wkts.push(this.coordsToWkt(coords.x, coords.y))
            names.push(cityTax.cityName)
            const benefit = this.taxCalculator.calcMonthlyBenefitBy(cityTax, income)
            tooltips.push(`save ${benefit}₪`)
            // console.log(`you save ${benefit}₪/month in ${cityTax.cityName}`)
        })
        const request = {
            wkts: wkts,
            names: names,
            geometryType: window.govmap.drawType.Point,
            data: {
                tooltips: tooltips,
                headers: ['hi', 'hi', 'hi'],
            },
            defaultSymbol: {
                url: 'https://icon-library.com/images/map-point-icon/map-point-icon-17.jpg',
                width: 20,
                height: 20
            },
        }
        console.log('before: displayGeometries')
        try {
            const response = await window.govmap.displayGeometries(request)
            console.log('after: displayGeometries')
            console.log(response)
        } catch (error) {
            console.error(error) // from creation or business logic
        }

    }
    coordsToWkt(x, y) {
        return `POINT(${x} ${y})`
    }
}

