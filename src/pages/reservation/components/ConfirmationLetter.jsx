import "../letter.css";

export default function ConfirmationLetter({
                                               reservationModel,
                                               beachhousename,
                                               priceCalculationModel,
                                               onReservationModelChange,
                                           }) {
    const fullName = [
        reservationModel.firstName?.trim(),
        reservationModel.infix?.trim(),
        reservationModel.lastName?.trim(),
    ].filter(Boolean).join(" ") || "Guest";

    const startDateText = reservationModel.startDate
        ? new Date(reservationModel.startDate).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "—";

    const endDateText = reservationModel.endDate
        ? new Date(reservationModel.endDate).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "—";

    const nights = priceCalculationModel?.numberOfDays;
    const totalPrice = priceCalculationModel?.totalPrice;
    const cleaningFee = priceCalculationModel?.cleaningFee;

    const houseNameText = (beachhousename?.trim() ? beachhousename.trim() : "our beach house");

    return (
        <section className="letter">
            <header className="letter__header">
                <div>
                    <p className="letter__small">Confirmation overview</p>
                    <h2 className="letter__title">Your reservation letter</h2>
                </div>

                <p className="letter__date">
                    {new Date().toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </header>

            <div className="letter__body">
                <p>Dear {fullName},</p>

                <p>
                    Thank you for choosing <strong>{houseNameText}</strong>. Below you will find a complete
                    overview of your reservation.
                </p>

                <p>
                    Your stay is planned from <strong>{startDateText}</strong> until{" "}
                    <strong>{endDateText}</strong>
                    {nights !== undefined
                        ? `, for a total of ${nights} night${nights === 1 ? "" : "s"}.`
                        : "."}
                </p>

                <p>
                    You will be staying with{" "}
                    <strong>{reservationModel.numberOfAdultGuest}</strong> adult
                    {reservationModel.numberOfAdultGuest === 1 ? "" : "s"}
                    {reservationModel.numberOfChildrenGuest > 0
                        ? ` and ${reservationModel.numberOfChildrenGuest} child${
                            reservationModel.numberOfChildrenGuest === 1 ? "" : "ren"
                        }`
                        : ""}.
                    {reservationModel.petGuest
                        ? " You will be bringing a pet along."
                        : " You will not be bringing a pet."}
                </p>

                <p>
                    We will contact you via{" "}
                    <strong>{reservationModel.email || "—"}</strong>
                    {reservationModel.phoneNumber
                        ? ` or by phone at ${reservationModel.phoneNumber}.`
                        : "."}
                </p>

                <p>
                    Your address details are recorded as{" "}
                    <strong>
                        {[reservationModel.street, reservationModel.houseNumber]
                            .filter(Boolean)
                            .join(" ") || "—"}
                        {reservationModel.postalCode || reservationModel.city
                            ? `, ${[reservationModel.postalCode, reservationModel.city]
                                .filter(Boolean)
                                .join(" ")}`
                            : ""}
                        {reservationModel.country
                            ? `, ${reservationModel.country}`
                            : ""}
                    </strong>.
                </p>

                <hr className="letter__rule" />

                <h3 className="letter__subtitle">Pricing summary</h3>

                <p className="letter__pricing">
                    {priceCalculationModel ? (
                        <>
                            The total price for your stay is{" "}
                            <strong>
                                {typeof totalPrice === "number"
                                    ? new Intl.NumberFormat(undefined, {
                                        style: "currency",
                                        currency: "EUR",
                                    }).format(totalPrice)
                                    : "—"}
                            </strong>
                            {typeof cleaningFee === "number"
                                ? `, including the cleaning fee of ${new Intl.NumberFormat(
                                    undefined,
                                    { style: "currency", currency: "EUR" }
                                ).format(cleaningFee)}.`
                                : "."}
                        </>
                    ) : (
                        <>Pricing information is not available yet.</>
                    )}
                </p>

                <hr className="letter__rule" />

                <h3 className="letter__subtitle">Message for the owner</h3>

                <p className="letter__hint">
                    If you have any questions, arrival details, or special requests, you
                    can leave a message below. This note will be sent together with your
                    reservation.
                </p>

                <label className="letter__label">
                    Your message
                    <textarea
                        className="letter__textarea"
                        name="messageForOwner"
                        value={reservationModel.messageForOwner ?? ""}
                        maxLength={250}
                        onChange={(e) =>
                            onReservationModelChange({ messageForOwner: e.target.value })
                        }
                        placeholder="For example: We expect to arrive around 16:30."
                    />
                    <span className="letter__char-count">
                        {(reservationModel.messageForOwner?.length ?? 0)}/250
                    </span>
                </label>

                <p className="letter__closing">
                    Kind regards,
                    <br />
                    <span className="letter__signature">
                        The Beach House Team
                    </span>
                </p>
            </div>
        </section>
    );
}
