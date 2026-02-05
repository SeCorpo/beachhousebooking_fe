import ReservationSummaryAside from "../components/ReservationSummaryAside.jsx";
import StepNavigation from "../components/StepNavigation.jsx";
import ConfirmationLetter from "../components/ConfirmationLetter.jsx";
import LoadingAnimation from "../../../components/LoadingAnimation.jsx";

export default function ReservationConfirmationView ({
    isLoading,
    error,
    reservationModel,
    beachhousename,
    onReservationModelChange,
    priceCalculationModel,
    onPreviousStep,
    onNextStep,
}) {
    return (
        <>
            <LoadingAnimation visible={isLoading} label="Placing reservation" />
            <main className="app-main">
                <ConfirmationLetter
                    reservationModel={reservationModel}
                    beachhousename={beachhousename}
                    priceCalculationModel={priceCalculationModel}
                    onReservationModelChange={onReservationModelChange}
                />

                <StepNavigation
                    isNextDisabled={isLoading}
                    onPreviousStep={onPreviousStep}
                    onNextStep={onNextStep}
                    nextLabel="Place Reservation"
                />
            </main>

            <ReservationSummaryAside
                startDate={reservationModel.startDate}
                endDate={reservationModel.endDate}
                priceCalculationModel={priceCalculationModel}
            />
        </>
    )
}