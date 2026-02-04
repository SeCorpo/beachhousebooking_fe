export default class ReservationModel {
    constructor(
        startDate = undefined,
        endDate = undefined,

        firstName = "",
        infix = "",
        lastName = "",
        street = "",
        houseNumber = "",
        postalCode = "",
        city = "",
        country = "",
        email = "",
        phoneNumber = "",
        numberOfAdultGuest = 1,
        numberOfChildrenGuest = 0,
        petGuest = false,
        messageForOwner = ""
    ) {
        this.startDate = startDate;
        this.endDate = endDate;

        this.firstName = firstName;
        this.infix = infix;
        this.lastName = lastName;
        this.street = street;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.numberOfAdultGuest = numberOfAdultGuest;
        this.numberOfChildrenGuest = numberOfChildrenGuest;
        this.petGuest = petGuest;
        this.messageForOwner = messageForOwner;
    }

    copyWith(patch = {}) {
        const has = (k) => Object.prototype.hasOwnProperty.call(patch, k);

        return new ReservationModel(
            has("startDate") ? patch.startDate : this.startDate,
            has("endDate") ? patch.endDate : this.endDate,

            has("firstName") ? patch.firstName : this.firstName,
            has("infix") ? patch.infix : this.infix,
            has("lastName") ? patch.lastName : this.lastName,
            has("street") ? patch.street : this.street,
            has("houseNumber") ? patch.houseNumber : this.houseNumber,
            has("postalCode") ? patch.postalCode : this.postalCode,
            has("city") ? patch.city : this.city,
            has("country") ? patch.country : this.country,
            has("email") ? patch.email : this.email,
            has("phoneNumber") ? patch.phoneNumber : this.phoneNumber,
            has("numberOfAdultGuest") ? patch.numberOfAdultGuest : this.numberOfAdultGuest,
            has("numberOfChildrenGuest") ? patch.numberOfChildrenGuest : this.numberOfChildrenGuest,
            has("petGuest") ? patch.petGuest : this.petGuest,
            has("messageForOwner") ? patch.messageForOwner : this.messageForOwner
        );
    }


    static isBlank(value) {
        return value === null || value === undefined || String(value).trim().length === 0;
    }

    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
    }

    static isValidPhone(phone) {
        return /^[+]?[\d\s\-()]{7,20}$/.test(String(phone).trim());
    }

    // Returns an array of validation error messages.
    // Empty array = valid.
    validate() {
        const errors = [];

        if (ReservationModel.isBlank(this.startDate) || ReservationModel.isBlank(this.endDate)) {
            errors.push("Please select a start and end date.");
        } else {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);

            if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
                errors.push("Invalid start or end date.");
            } else if (start >= end) {
                errors.push("End date must be after start date.");
            }
        }

        if (ReservationModel.isBlank(this.firstName)) errors.push("First name is required.");
        if (ReservationModel.isBlank(this.lastName)) errors.push("Last name is required.");
        if (ReservationModel.isBlank(this.street)) errors.push("Street is required.");
        if (ReservationModel.isBlank(this.houseNumber)) errors.push("House number is required.");
        if (ReservationModel.isBlank(this.postalCode)) errors.push("Postal code is required.");
        if (ReservationModel.isBlank(this.city)) errors.push("City is required.");
        if (ReservationModel.isBlank(this.country)) errors.push("Country is required.");

        if (ReservationModel.isBlank(this.email)) {
            errors.push("Email is required.");
        } else if (!ReservationModel.isValidEmail(this.email)) {
            errors.push("Please enter a valid email address.");
        }

        if (ReservationModel.isBlank(this.phoneNumber)) {
            errors.push("Phone number is required.");
        } else if (!ReservationModel.isValidPhone(this.phoneNumber)) {
            errors.push("Please enter a valid phone number.");
        }

        if (!Number.isInteger(this.numberOfAdultGuest) || this.numberOfAdultGuest < 1) {
            errors.push("At least one adult guest is required.");
        }

        if (!Number.isInteger(this.numberOfChildrenGuest) || this.numberOfChildrenGuest < 0) {
            errors.push("Number of children must be zero or more.");
        }

        return errors;
    }
}
