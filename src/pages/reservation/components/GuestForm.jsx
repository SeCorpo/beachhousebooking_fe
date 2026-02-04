import "../../../assets/styles/components/forms.css";
import ReservationModel from "../models/ReservationModel.jsx";

const PHONE_REGEX = /^[+]?[\d\s\-()]{7,20}$/;

const MAX = {
    firstName: 64,
    infix: 32,
    lastName: 64,
    street: 64,
    houseNumber: 6,
    postalCode: 10,
    city: 64,
    country: 64,
    email: 255,
    phoneNumber: 15,
    messageForOwner: 250,
};

export default function GuestForm({ reservationModel, onReservationModelChange }) {
    function updateField(key, value) {
        onReservationModelChange({ [key]: value });
    }

    function updateNumberField(key, rawValue) {
        const n = Number(rawValue);
        updateField(key, Number.isFinite(n) ? n : 0);
    }

    function validateRequiredTrimmedString(inputEl, label, maxLen) {
        const value = inputEl.value ?? "";
        const trimmed = value.trim();

        let msg = "";
        if (!trimmed) {
            msg = `${label} is required.`;
        } else if (trimmed.length > maxLen) {
            msg = `${label} must be at most ${maxLen} characters.`;
        }

        inputEl.setCustomValidity(msg);
    }

    function validateOptionalTrimmedString(inputEl, label, maxLen) {
        const value = inputEl.value ?? "";
        const trimmed = value.trim();

        let msg = "";
        if (trimmed && trimmed.length > maxLen) {
            msg = `${label} must be at most ${maxLen} characters.`;
        }

        inputEl.setCustomValidity(msg);
    }

    function validateEmailInput(inputEl) {
        const value = (inputEl.value ?? "").trim();

        let msg = "";
        if (!value) {
            msg = "Email is required.";
        } else if (value.length > MAX.email) {
            msg = `Email must be at most ${MAX.email} characters.`;
        } else if (!ReservationModel.isValidEmail(value)) {
            msg = "Please enter a valid email address.";
        }

        inputEl.setCustomValidity(msg);
    }

    function validatePhoneInput(inputEl) {
        const value = (inputEl.value ?? "").trim();

        let msg = "";
        if (!value) {
            msg = "Phone number is required.";
        } else if (value.length > MAX.phoneNumber) {
            msg = `Phone number must be at most ${MAX.phoneNumber} characters.`;
        } else if (!PHONE_REGEX.test(value)) {
            msg = "Please enter a valid phone number.";
        }

        inputEl.setCustomValidity(msg);
    }

    function validateAdultGuestsInput(inputEl) {
        const n = Number(inputEl.value);
        const msg = Number.isInteger(n) && n >= 1 ? "" : "At least one adult guest is required.";
        inputEl.setCustomValidity(msg);
    }

    function validateChildrenGuestsInput(inputEl) {
        const n = Number(inputEl.value);
        const msg = Number.isInteger(n) && n >= 0 ? "" : "Number of children must be zero or more.";
        inputEl.setCustomValidity(msg);
    }

    function onRequiredTrimmedChange(key, e, maxLen, label) {
        updateField(key, e.target.value);
        validateRequiredTrimmedString(e.target, label, maxLen);
    }

    function onRequiredTrimmedBlur(e, maxLen, label) {
        validateRequiredTrimmedString(e.target, label, maxLen);
        e.target.classList.add("touched");
    }

    function onOptionalInfixChange(e) {
        updateField("infix", e.target.value);
        validateOptionalTrimmedString(e.target, "Infix", MAX.infix);
    }

    function onOptionalInfixBlur(e) {
        validateOptionalTrimmedString(e.target, "Infix", MAX.infix);
        e.target.classList.add("touched");
    }

    return (
        <form className="app-form" autoComplete="on" noValidate>
            <section className="card form-card">
                <h3 className="form-title">Guest details</h3>

                <div className="form-grid form-grid--name">
                    <label>
                        First name <span className="form-required">*</span>
                        <input
                            type="text"
                            name="firstName"
                            autoComplete="given-name"
                            value={reservationModel.firstName ?? ""}
                            maxLength={MAX.firstName}
                            onChange={(e) => onRequiredTrimmedChange("firstName", e, MAX.firstName, "First name")}
                            onBlur={(e) => onRequiredTrimmedBlur(e, MAX.firstName, "First name")}
                            placeholder="First name"
                            required
                        />
                        <small className="form-error">First name is required.</small>
                    </label>

                    <label>
                        Infix <span className="form-optional">(optional)</span>
                        <input
                            type="text"
                            name="infix"
                            value={reservationModel.infix ?? ""}
                            maxLength={MAX.infix}
                            onChange={onOptionalInfixChange}
                            onBlur={onOptionalInfixBlur}
                            placeholder="Optional"
                        />
                        <small className="form-error">Infix must be at most {MAX.infix} characters.</small>
                    </label>

                    <label>
                        Last name <span className="form-required">*</span>
                        <input
                            type="text"
                            name="lastName"
                            autoComplete="family-name"
                            value={reservationModel.lastName ?? ""}
                            maxLength={MAX.lastName}
                            onChange={(e) => onRequiredTrimmedChange("lastName", e, MAX.lastName, "Last name")}
                            onBlur={(e) => onRequiredTrimmedBlur(e, MAX.lastName, "Last name")}
                            placeholder="Last name"
                            required
                        />
                        <small className="form-error">Last name is required.</small>
                    </label>
                </div>
            </section>

            <section className="card form-card">
                <h3 className="form-title">Address</h3>

                <div className="form-grid form-grid--address">
                    <label>
                        Street <span className="form-required">*</span>
                        <input
                            type="text"
                            name="street"
                            autoComplete="address-line1"
                            value={reservationModel.street ?? ""}
                            maxLength={MAX.street}
                            onChange={(e) => onRequiredTrimmedChange("street", e, MAX.street, "Street")}
                            onBlur={(e) => onRequiredTrimmedBlur(e, MAX.street, "Street")}
                            placeholder="Street"
                            required
                        />
                        <small className="form-error">Street is required.</small>
                    </label>

                    <label>
                        House number <span className="form-required">*</span>
                        <input
                            type="text"
                            name="houseNumber"
                            inputMode="numeric"
                            autoComplete="address-line2"
                            value={reservationModel.houseNumber ?? ""}
                            maxLength={MAX.houseNumber}
                            onChange={(e) => onRequiredTrimmedChange("houseNumber", e, MAX.houseNumber, "House number")}
                            onBlur={(e) => onRequiredTrimmedBlur(e, MAX.houseNumber, "House number")}
                            placeholder="No."
                            required
                        />
                        <small className="form-error">House number is required.</small>
                    </label>

                    <label>
                        Postal code <span className="form-required">*</span>
                        <input
                            type="text"
                            name="postalCode"
                            autoComplete="postal-code"
                            value={reservationModel.postalCode ?? ""}
                            maxLength={MAX.postalCode}
                            onChange={(e) => onRequiredTrimmedChange("postalCode", e, MAX.postalCode, "Postal code")}
                            onBlur={(e) => onRequiredTrimmedBlur(e, MAX.postalCode, "Postal code")}
                            placeholder="Postal code"
                            required
                        />
                        <small className="form-error">Postal code is required.</small>
                    </label>

                    <label>
                        City <span className="form-required">*</span>
                        <input
                            type="text"
                            name="city"
                            autoComplete="address-level2"
                            value={reservationModel.city ?? ""}
                            maxLength={MAX.city}
                            onChange={(e) => onRequiredTrimmedChange("city", e, MAX.city, "City")}
                            onBlur={(e) => onRequiredTrimmedBlur(e, MAX.city, "City")}
                            placeholder="City"
                            required
                        />
                        <small className="form-error">City is required.</small>
                    </label>

                    <label className="form-span-2">
                        Country <span className="form-required">*</span>
                        <input
                            type="text"
                            name="country"
                            autoComplete="country-name"
                            value={reservationModel.country ?? ""}
                            maxLength={MAX.country}
                            onChange={(e) => onRequiredTrimmedChange("country", e, MAX.country, "Country")}
                            onBlur={(e) => onRequiredTrimmedBlur(e, MAX.country, "Country")}
                            placeholder="Country"
                            required
                        />
                        <small className="form-error">Country is required.</small>
                    </label>
                </div>
            </section>

            <section className="card form-card">
                <h3 className="form-title">Contact</h3>

                <div className="form-grid form-grid--contact">
                    <label>
                        Email <span className="form-required">*</span>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={reservationModel.email ?? ""}
                            maxLength={MAX.email}
                            onChange={(e) => {
                                updateField("email", e.target.value);
                                validateEmailInput(e.target);
                            }}
                            onBlur={(e) => {
                                validateEmailInput(e.target);
                                e.target.classList.add("touched");
                            }}
                            placeholder="name@example.com"
                            required
                        />
                        <small className="form-error">Please enter a valid email address.</small>
                    </label>

                    <label>
                        Phone number <span className="form-required">*</span>
                        <input
                            type="tel"
                            name="phoneNumber"
                            inputMode="tel"
                            autoComplete="tel"
                            value={reservationModel.phoneNumber ?? ""}
                            maxLength={MAX.phoneNumber}
                            onChange={(e) => {
                                updateField("phoneNumber", e.target.value);
                                validatePhoneInput(e.target);
                            }}
                            onBlur={(e) => {
                                validatePhoneInput(e.target);
                                e.target.classList.add("touched");
                            }}
                            placeholder="Phone number"
                            required
                        />
                        <small className="form-error">Please enter a valid phone number.</small>
                    </label>
                </div>
            </section>

            <section className="card form-card">
                <h3 className="form-title">Guests</h3>

                <div className="form-grid form-grid--guests">
                    <label>
                        Adults <span className="form-required">*</span>
                        <input
                            type="number"
                            name="numberOfAdultGuest"
                            min={1}
                            step={1}
                            value={reservationModel.numberOfAdultGuest ?? 1}
                            onChange={(e) => {
                                updateNumberField("numberOfAdultGuest", e.target.value);
                                validateAdultGuestsInput(e.target);
                            }}
                            onBlur={(e) => {
                                validateAdultGuestsInput(e.target);
                                e.target.classList.add("touched");
                            }}
                            required
                        />
                        <small className="form-error">At least one adult guest is required.</small>
                    </label>

                    <label>
                        Children <span className="form-optional">(optional)</span>
                        <input
                            type="number"
                            name="numberOfChildrenGuest"
                            min={0}
                            step={1}
                            value={reservationModel.numberOfChildrenGuest ?? 0}
                            onChange={(e) => {
                                updateNumberField("numberOfChildrenGuest", e.target.value);
                                validateChildrenGuestsInput(e.target);
                            }}
                            onBlur={(e) => {
                                validateChildrenGuestsInput(e.target);
                                e.target.classList.add("touched");
                            }}
                        />
                        <small className="form-error">Number of children must be zero or more.</small>
                    </label>

                    <div className="form-checkbox form-span-2">
                        <span className="form-checkbox__label">Bringing a pet?</span>
                        <input
                            type="checkbox"
                            name="petGuest"
                            checked={Boolean(reservationModel.petGuest)}
                            onChange={(e) => updateField("petGuest", e.target.checked)}
                        />
                    </div>
                </div>

                <p className="form-required-hint">
                    <span className="form-required">*</span> Required fields
                </p>
            </section>
        </form>
    );
}
