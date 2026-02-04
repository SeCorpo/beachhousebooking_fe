
export default class PriceCalculationModel {
    // Price is calculated locally with AvailabilityModel
    constructor(days = [], cleaningFee = 0) {
        this.days = days;
        this.cleaningFee = cleaningFee;
    }

    get numberOfDays() {
        return this.days.length;
    }

    get priceOfDaysCombined() {
        return this.days.reduce((sum, d) => sum + (d.price ?? 0), 0);
    }

    get totalPrice() {
        return this.priceOfDaysCombined + (this.cleaningFee ?? 0);
    }
}