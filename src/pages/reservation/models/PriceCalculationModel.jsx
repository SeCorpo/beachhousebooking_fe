
export default class PriceCalculationModel {
    // After a guest selects a date range an api call returns its price
    constructor(
        days = [],
        cleaningFee,
        totalPrice,
    ) {
        this.days = days;
        this.cleaningFee = cleaningFee;
        this.totalPrice = totalPrice;
    }

    get numberOfDays() {
        return this.days.length;
    }

    get priceOfDaysCombined() {
        return this.days.reduce((sum, d) => sum + (d.price ?? 0), 0);
    }
}