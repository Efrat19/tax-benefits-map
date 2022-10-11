
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
        try {
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
        catch (error) {
            console.log(`Failed to find city: ${cityTax.cityName}`)
            return {
                city: "",
                x: "",
                y: ""
            }
        }
    }
    async getBubblesRequest(income) {
        const wkts = []
        const names = []
        const tooltips = []
        const log = []
        console.log('before map')
        const cityPromises = this.taxCalculator.cityTaxArray.map(async cityTax => {
            const benefit = this.taxCalculator.calcMonthlyBenefitBy(cityTax, income)
            // if (benefit > 2500) {
                const coords = await this.getCityCoords(cityTax)
                wkts.push(this.coordsToWkt(coords.x, coords.y))
                names.push(cityTax.cityName)
                tooltips.push(`save ${benefit}₪ in ${cityTax.cityName}`)
                log.push(`you save ${benefit}₪/month in ${cityTax.cityName}`)
            // }
        })
        await Promise.all(cityPromises);
        console.log('after map')
        console.log(log)
        const request = {
            wkts: wkts,
            names: names,
            geometryType: window.govmap.drawType.Point,
            data: {
                tooltips: tooltips,
                headers: names,
            },
            defaultSymbol: {
                url: 'https://icon-library.com/images/map-point-icon/map-point-icon-17.jpg',
                width: 20,
                height: 20
            },
        }
        return request
    }
    async drawBubbles(income) {
        try {
            const request = await this.getBubblesRequest(income)
            console.log('before: displayGeometries')
            const response = await window.govmap.displayGeometries(request)
            console.log('after: displayGeometries')
            console.log(response)
        } catch (error) {
            console.error(error)
        }

    }
    coordsToWkt(x, y) {
        return `POINT(${x} ${y})`
    }
}

