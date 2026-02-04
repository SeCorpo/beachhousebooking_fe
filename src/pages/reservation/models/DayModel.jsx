
export default class DayModel {
    constructor(
        dayIso,
        price = null
    ) {
        // dayIso: "YYYY-MM-DD"
        this.day = dayIso;
        this.price = price;
    }

    static fromApi(dto) {
        return new DayModel(dto.day, dto.price != null ? Number(dto.price) : null);
    }
}
