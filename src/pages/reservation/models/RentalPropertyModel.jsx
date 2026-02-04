
export default class RentalPropertyModel {
    constructor(
        name,
        minimalBookingLength,
        maximalBookingLength,
        cleaningFee = null,
    ) {
        this.name = name;
        this.minimalBookingLength = minimalBookingLength;
        this.maximalBookingLength = maximalBookingLength;
        this.cleaningFee = cleaningFee;
    }

    static fromApi(dto) {
        if (!dto) return null;
        return new RentalPropertyModel(
            dto.name,
            dto.minimalBookingLength,
            dto.maximalBookingLength,
            dto.cleaningFee != null ? Number(dto.cleaningFee) : null,
        );
    }
}
