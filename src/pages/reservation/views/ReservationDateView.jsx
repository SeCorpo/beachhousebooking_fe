import ReservationSummaryAside from "../components/ReservationSummaryAside.jsx";
import StepNavigation from "../components/StepNavigation.jsx";
import DatesPicker from "../components/DatesPicker.jsx";
import LoadingAnimation from "../../../components/LoadingAnimation.jsx";

export default function ReservationDateView ({
    isLoading,
    error,
    availabilityModel,
    startDate,
    endDate,
    onDateRangeChange,
    onMonthChange,
    priceCalculationModel,
    onNextStep,
}) {
    const isNextDisabled = !(startDate && endDate);

    return (
        <>
            <LoadingAnimation visible={isLoading} />
            <main className="app-main step-date">
                <DatesPicker
                    availabilityModel={availabilityModel}
                    startDate={startDate}
                    endDate={endDate}
                    onDateRangeChange={onDateRangeChange}
                    onMonthChange={onMonthChange}
                />

                <StepNavigation
                    onNextStep={onNextStep}
                    isNextDisabled={isNextDisabled}
                />
            </main>

            <ReservationSummaryAside
                startDate={startDate}
                endDate={endDate}
                priceCalculationModel={priceCalculationModel}
            />
        </>
    )
}