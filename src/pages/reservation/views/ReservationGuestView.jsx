import ReservationSummaryAside from "../components/ReservationSummaryAside.jsx";
import StepNavigation from "../components/StepNavigation.jsx";
import GuestForm from "../components/GuestForm.jsx";

export default function ReservationGuestView ({
    error,
    reservationModel,
    onReservationModelChange,
    priceCalculationModel,
    onPreviousStep,
    onNextStep,
}) {
    const isNextDisabled = !(
        reservationModel.firstName?.trim() &&
        reservationModel.lastName?.trim() &&
        reservationModel.street?.trim() &&
        reservationModel.houseNumber?.trim() &&
        reservationModel.postalCode?.trim() &&
        reservationModel.city?.trim() &&
        reservationModel.country?.trim() &&
        reservationModel.email?.trim() &&
        reservationModel.phoneNumber?.trim() &&
        (reservationModel.numberOfAdultGuest ?? 0) >= 1
    );

    return (
        <>
            <main className="app-main">
                <GuestForm
                    reservationModel={reservationModel}
                    onReservationModelChange={onReservationModelChange}
                />

                <StepNavigation
                    onPreviousStep={onPreviousStep}
                    onNextStep={onNextStep}
                    isNextDisabled={isNextDisabled}
                />
            </main>

            <ReservationSummaryAside
                className="app-aside-hidden-on-mobile"
                startDate={reservationModel.startDate}
                endDate={reservationModel.endDate}
                priceCalculationModel={priceCalculationModel}
            />
        </>
    )
}