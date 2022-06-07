
// https://protocol.co.il/beneficiary-settlement/
import cityTaxArray from './cityTax2022.json'

export default class TaxCalcService {

    constructor(income) {
        this.income = income
        this.cityTaxArray = cityTaxArray
    }
    calcMonthlyBenefitBy(cityTax) {
        const benefitPercent = cityTax.benefitRate / 100
        const annualIncome = this.income * 12
        const incomeForBenefit = Math.min(annualIncome, cityTax.benefitCeiling)
        const benefit = incomeForBenefit * benefitPercent
        const monthlyBenefit = benefit / 12
        return monthlyBenefit
    }
}