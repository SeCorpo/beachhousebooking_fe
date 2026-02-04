
export default class CreatedReservationResponseModel {
    constructor(
        fullName,
        email
    ) {
        this.fullName = fullName;
        this.email = email;
    }

    static empty() {
        return new CreatedReservationResponseModel("", "");
    }

    static fromApi(dto) {
        return new CreatedReservationResponseModel(
            dto?.fullName ?? "",
            dto?.email ?? ""
        );
    }
}
