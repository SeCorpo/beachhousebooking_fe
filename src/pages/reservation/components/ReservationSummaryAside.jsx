
export default function ReservationSummaryAside({
    className = "",
    startDate,
    endDate,
    priceCalculationModel,
}) {
    // No dates chosen yet
    if (!startDate || !endDate) {
        return (
            <aside className={`app-aside ${className}`.trim()}>
                <h3>Your stay</h3>
                <p>Select dates to see pricing.</p>
            </aside>
        );
    }

    // Dates chosen (show immediately)
    return (
        <aside className={`app-aside ${className}`.trim()}>
            <h3>Overview</h3>

            <p>
                <strong>Dates</strong>
                <br />
                From: {startDate.toLocaleDateString()}
                <br />
                Till: {endDate.toLocaleDateString()}
            </p>

            {!priceCalculationModel ? (
                <p>Calculating price…</p>
            ) : (
                <>
                    <p>
                        <strong>Nights:</strong> {priceCalculationModel.numberOfDays}
                    </p>

                    <hr />

                    <div>
                        <p>
                            <strong>Subtotal:</strong>
                            <br />€ {priceCalculationModel.priceOfDaysCombined}
                        </p>

                        <p>
                            <strong>Cleaning fee:</strong>
                            <br />€ {priceCalculationModel.cleaningFee}
                        </p>

                        <p>
                            <strong>Total price:</strong>
                            <br />€ {priceCalculationModel.totalPrice}
                        </p>
                    </div>
                </>
            )}
        </aside>
    );
}
