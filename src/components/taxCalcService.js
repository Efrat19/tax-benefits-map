
// https://protocol.co.il/beneficiary-settlement/
import cityTaxArray from './cityTax2022-short.json'

export default class TaxCalcService {

    constructor() {
        this.cityTaxArray = cityTaxArray
    }
    
    calcMonthlyBenefitBy(cityTax,income) {
        const benefitPercent = cityTax.benefitRate / 100
        const annualIncome = income * 12
        const incomeForBenefit = Math.min(annualIncome, cityTax.benefitCeiling)
        const benefit = incomeForBenefit * benefitPercent
        const monthlyBenefit = benefit / 12
        return monthlyBenefit
    }
}