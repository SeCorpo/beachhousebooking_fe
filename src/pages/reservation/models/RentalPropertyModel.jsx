
export default class RentalPropertyModel {
    // Partial model, use AvailabilityModel directly
    constructor(
        name,
        minimalBookingLength,
        maximalBookingLength,
    ) {
        this.name = name;
        this.minimalBookingLength = minimalBookingLength;
        this.maximalBookingLength = maximalBookingLength;
    }
}