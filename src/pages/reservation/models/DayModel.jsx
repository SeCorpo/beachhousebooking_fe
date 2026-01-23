
export default class DayModel {
    // Partial model, use AvailabilityModel directly
    constructor(
        day,
        availability,
        price = null,
    ) {
        this.day = day;
        this.availability = availability;
        this.price = price;
    }
}