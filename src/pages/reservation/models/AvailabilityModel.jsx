
export default class AvailabilityModel {
    // Complete model for information needed to make a reservation
    constructor(
        RentalPropertyModel,
        dayModels = [],
    ) {
        this.rentalPropertyModel = RentalPropertyModel;
        this.dayModels = dayModels;
    }
}