import "../letter.css";

export default function ReservationDoneLetter({ createdReservationResponseModel }) {
    const emailText =
        createdReservationResponseModel?.email?.trim()
            ? createdReservationResponseModel.email.trim()
            : "—";

    const fullName =
        createdReservationResponseModel?.fullName?.trim()
            ? createdReservationResponseModel.fullName.trim()
            : null;

    return (
        <section className="letter">
            <header className="letter__header">
                <div>
                    <p className="letter__small">Reservation status</p>
                    <h2 className="letter__title">Reservation sent</h2>
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
                {fullName && (
                    <p>Dear <strong>{fullName}</strong>,</p>
                )}

                <p>
                    We have sent a confirmation email to{" "}
                    <strong>{emailText}</strong>.
                </p>

                <p>
                    Please wait for the owner to confirm your reservation request.
                </p>

                <p>
                    Once the owner accepts your reservation, you will receive an email
                    with payment instructions.
                </p>

                <hr className="letter__rule" />

                <h3 className="letter__subtitle">Need to make changes?</h3>

                <p className="letter__hint">
                    If you want to make changes to the reservation, please check the
                    information in the confirmation email.
                </p>

                <p className="letter__hint">
                    You may close this window now.
                </p>

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
