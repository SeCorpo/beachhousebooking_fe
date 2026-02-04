import React, {useEffect, useState} from "react";
import ReservationDateView from "./views/ReservationDateView.jsx";
import ReservationModel from "./models/ReservationModel.jsx";
import ReservationGuestView from "./views/ReservationGuestView.jsx";
import ReservationConfirmationView from "./views/ReservationConfirmationView.jsx";
import ReservationDoneView from "./views/ReservationDoneView.jsx";

import Header from "../../components/layout/Header.jsx";
import {useParams} from "react-router-dom";
import Nav from "../../components/layout/Nav.jsx";
import NavItem from "../../components/layout/NavItem.jsx";
import "./stepNavigation.css"

import {RESERVATION_STEP} from "./reservationSteps.jsx";
import AvailabilityModel from "./models/AvailabilityModel.jsx";
import {createReservation, fetchAvailability} from "./reservationApi.jsx";
import {toastError, toastSuccess} from "../../utils/toastHelper.jsx";
import {addMonths, endOfMonth, startOfMonth, toIsoDateLocal} from "../../utils/dateUtils.jsx";
import PriceCalculationModel from "./models/PriceCalculationModel.jsx";
import CreatedReservationResponseModel from "./models/CreatedReservationResponseModel.jsx";


export default function ReservationController() {
    const { beachhousename } = useParams();

    const [step, setStep] = useState(RESERVATION_STEP.DATE);
    const [maxStep, setMaxStep] = useState(RESERVATION_STEP.DATE);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [availabilityModel, setAvailabilityModel] = useState(null);
    const [reservationModel, setReservationModel] = useState(new ReservationModel());
    const [priceCalculationModel, setPriceCalculationModel] = useState(null);
    const [createdReservationResponseModel, setCreatedReservationResponseModel] = useState(null);

    const [leftMonth, setLeftMonth] = useState(new Date());


    async function loadAvailability(startDate = null, endDate = null, toastMessage = null) {
        setIsLoading(true);
        setError(null);

        try {
            const availabilityDto = await fetchAvailability(beachhousename, startDate, endDate);
            const incoming = AvailabilityModel.fromApi(availabilityDto);

            setAvailabilityModel((prev) =>
                prev ? AvailabilityModel.merge(prev, incoming) : incoming
            );

            if (toastMessage) {
                toastSuccess(toastMessage);
            }
        } catch (e) {
            const msg = e?.message ?? "Failed to load availability.";
            toastError(msg);
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    }

    // visible months helper
    function getVisibleMonthsIso(monthDate) {
        const left = startOfMonth(monthDate);
        const right = addMonths(left, 1);

        const startIso = toIsoDateLocal(left);
        const endIso = toIsoDateLocal(endOfMonth(right));

        return { startIso, endIso };
    }

    // Fetch the 2 visible months (leftMonth + nextMonth)
    function loadForVisibleMonths(leftMonthDate, toastMessage = null) {
        setLeftMonth(leftMonthDate);
        const { startIso, endIso } = getVisibleMonthsIso(leftMonthDate);
        loadAvailability(startIso, endIso, toastMessage);
    }

    // Fetch selected range too (if selected). Useful when user scrolls away.
    function loadForSelectedRangeIfAny(toastMessage = null) {
        const start = reservationModel.startDate;
        const end = reservationModel.endDate;
        if (!start || !end) return Promise.resolve();

        const startIso = toIsoDateLocal(start);
        const endIso = toIsoDateLocal(end);

        return loadAvailability(startIso, endIso, toastMessage);
    }

    // Refresh logic:
    // - On DATE step: refresh visible window, and also refresh selected range if it isn't fully inside visible window
    // - On other steps: refresh selected range only (so we can invalidate selection if needed)
    async function refreshOutdatedAvailability() {
        const start = reservationModel.startDate;
        const end = reservationModel.endDate;

        const hasSelection = !!(start && end);

        if (step === RESERVATION_STEP.DATE) {
            const { startIso: visibleStart, endIso: visibleEnd } = getVisibleMonthsIso(leftMonth);

            await loadAvailability(visibleStart, visibleEnd);

            if (hasSelection) {
                const selectedStart = toIsoDateLocal(start);
                const selectedEnd = toIsoDateLocal(end);

                const selectionInsideVisible =
                    selectedStart >= visibleStart && selectedEnd <= visibleEnd;

                if (!selectionInsideVisible) {
                    await loadAvailability(selectedStart, selectedEnd);
                }
            }

            return;
        }

        // Not on date step: only refresh selected range
        if (hasSelection) {
            await loadForSelectedRangeIfAny();
        }
    }

    // initial load for current visible months
    useEffect(() => {
        if (!beachhousename) return;
        loadForVisibleMonths(new Date(), "Availability loaded");
    }, [beachhousename]);


    async function confirmReservation() {
        if (isLoading) return;

        const validationErrors = reservationModel.validate();
        if (validationErrors.length > 0) {
            validationErrors.forEach((msg) => toastError(msg));
            setError(validationErrors[0]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const createdDto = await createReservation(beachhousename, reservationModel);
            const created = CreatedReservationResponseModel.fromApi(createdDto);
            setCreatedReservationResponseModel(created);

            setAvailabilityModel(null);
            setPriceCalculationModel(null);
            setReservationModel(new ReservationModel());

            toastSuccess("Reservation confirmed!");
            setStep(RESERVATION_STEP.DONE);
        } catch (e) {
            toastError(e?.message ?? "Failed to place reservation.");
            setError(e?.message ?? "Failed to place reservation.");
        } finally {
            setIsLoading(false);
        }
    }

    function buildPriceCalculationModel(startDate, endDate, availabilityModel) {
        if (!startDate || !endDate || !availabilityModel) return null;

        const startIso = toIsoDateLocal(startDate);
        const endIso = toIsoDateLocal(endDate);

        // nights: [start, end) => exclude checkout day
        const days = (availabilityModel.dayModels ?? [])
            .filter((d) => d.day >= startIso && d.day < endIso)
            .map((d) => ({
                isoDate: d.day,
                price: d.price ?? 0,
            }));

        const cleaningFee = availabilityModel.rentalPropertyModel?.cleaningFee ?? 0;

        return new PriceCalculationModel(days, cleaningFee);
    }


    function updateReservationModel(patch) {
        setReservationModel((prev) => prev.copyWith(patch));
    }

    function updateDateRange(startDate, endDate) {
        updateReservationModel({ startDate, endDate });
        setPriceCalculationModel(
            buildPriceCalculationModel(startDate, endDate, availabilityModel)
        );
    }


    function isRangeStillAvailable(startDate, endDate, model) {
        if (!startDate || !endDate || !model) return true;

        const available = new Set((model.dayModels ?? []).map((d) => d.day));
        const endIso = toIsoDateLocal(endDate);

        const current = new Date(startDate);
        while (true) {
            const iso = toIsoDateLocal(current);
            if (iso >= endIso) break; // stop before checkout day

            if (!available.has(iso)) return false;

            current.setDate(current.getDate() + 1);
        }

        return true;
    }

    // Availability refresh logic
    // - Pauses background refresh while the browser tab is hidden
    // - Resumes when the tab becomes visible again
    // - Immediately refreshes if availability data is older than 5 minutes
    // - While visible, checks every 30 seconds whether a refresh is needed
    useEffect(() => {
        if (!beachhousename) return;
        if (step === RESERVATION_STEP.DONE) return;

        const FIVE_MIN = 5 * 60 * 1000;
        let timer = null;

        const isOutdated = () => {
            const timestamp = availabilityModel?.timestamp;
            return !timestamp || (Date.now() - timestamp.getTime()) >= FIVE_MIN;
        };

        const tick = () => {
            if (step === RESERVATION_STEP.DONE) return;
            // Do nothing when the tab is not visible
            if (document.visibilityState !== "visible") return;

            if (isOutdated()) {
                refreshOutdatedAvailability();
            }
        };

        const start = () => {
            if (timer) return;
            if (document.visibilityState !== "visible") return;
            if (step === RESERVATION_STEP.DONE) return;

            timer = setInterval(tick, 30 * 1000);
        };

        const stop = () => {
            if (!timer) return;
            clearInterval(timer);
            timer = null;
        };

        const onVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                // Tab became visible do a refresh immediately if needed
                tick();
                start();
            } else {
                // Tab hidden stop background refresh
                stop();
            }
        };

        // Initial start (only if visible)
        start();

        // Pause/resume when tab visibility changes
        document.addEventListener("visibilitychange", onVisibilityChange);

        // Refresh on window focus
        window.addEventListener("focus", tick);

        return () => {
            stop();
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("focus", tick);
        };
    }, [
        beachhousename,
        availabilityModel?.timestamp,
        leftMonth,
        step,
        reservationModel?.startDate,
        reservationModel?.endDate,
    ]);


    // When availability updates: if selection became invalid reset flow; else only recalculate price
    useEffect(() => {
        if (!availabilityModel) return;

        const start = reservationModel.startDate;
        const end = reservationModel.endDate;
        if (!start || !end) return;

        if (!isRangeStillAvailable(start, end, availabilityModel)) {
            toastError("Your selected dates are no longer available. Please choose new dates.");

            setStep(RESERVATION_STEP.DATE);
            setMaxStep(RESERVATION_STEP.DATE);

            setPriceCalculationModel(null);
            updateReservationModel({ startDate: null, endDate: null });
            return;
        }

        setPriceCalculationModel(buildPriceCalculationModel(start, end, availabilityModel));
    }, [availabilityModel, reservationModel]);

    // Make sure the page scrolls to the top (on mobile) when switching views/steps
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.querySelector(".app-layout")?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [step]);


    // RULES:
    // Don't expose more than needed (meaning only expose dates and availability on DateView)
    // DateView uses updateDateRange instead of updateReservationModel
    function renderStep() {
        switch (step) {
            case RESERVATION_STEP.DATE:
                return (
                    <ReservationDateView
                        isLoading={isLoading}
                        error={error}
                        availabilityModel={availabilityModel}
                        startDate={reservationModel.startDate}
                        endDate={reservationModel.endDate}
                        onDateRangeChange={(start, end) => updateDateRange(start, end)}
                        onMonthChange={(leftMonth) => loadForVisibleMonths(leftMonth)}
                        priceCalculationModel={priceCalculationModel}
                        onNextStep={() => goToStep(RESERVATION_STEP.GUEST)}
                    />
                )

            case RESERVATION_STEP.GUEST:
                return (
                    <ReservationGuestView
                        error={error}
                        reservationModel={reservationModel}
                        onReservationModelChange={(patch) => updateReservationModel(patch)}
                        priceCalculationModel={priceCalculationModel}
                        onPreviousStep={() => setStep(RESERVATION_STEP.DATE)}
                        onNextStep={() => goToStep(RESERVATION_STEP.CONFIRM)}
                    />
                )

            case RESERVATION_STEP.CONFIRM:
                return (
                    <ReservationConfirmationView
                        isLoading={isLoading}
                        error={error}
                        reservationModel={reservationModel}
                        beachhousename={availabilityModel?.rentalPropertyModel?.name ?? beachhousename}
                        onReservationModelChange={(patch) => updateReservationModel(patch)}
                        priceCalculationModel={priceCalculationModel}
                        onPreviousStep={() => setStep(RESERVATION_STEP.GUEST)}
                        onNextStep={confirmReservation}
                    />
                )

            case RESERVATION_STEP.DONE:
                return (
                    <ReservationDoneView
                        createdReservationResponseModel={createdReservationResponseModel}
                    />
                )

            default:
                return (
                    <main>
                        <p>Unknown step. You seem to have cracked the system. \(°-° )</p>
                    </main>
                )
        }
    }


    const showNav = step !== RESERVATION_STEP.DONE;
    // const showManageButton = step === RESERVATION_STEP.DATE;
    const stepOrder = [RESERVATION_STEP.DATE, RESERVATION_STEP.GUEST, RESERVATION_STEP.CONFIRM];

    function canSelect(targetStep) {
        return stepOrder.indexOf(targetStep) <= stepOrder.indexOf(maxStep);
    }
    function goToStep(next) {
        setStep(next);
        if (stepOrder.indexOf(next) > stepOrder.indexOf(maxStep)) {
            setMaxStep(next);
        }
    }

    return (
        <>
            <Header title={ availabilityModel?.rentalPropertyModel?.name ?? beachhousename ?? "Reservation" } />

            <div className="app-layout">
                { showNav && (
                <Nav ariaLabel="Main navigation">
                    <NavItem
                        active={step === RESERVATION_STEP.DATE}
                        onClick={() => goToStep(RESERVATION_STEP.DATE)}
                    >
                        Select date
                    </NavItem>

                    <NavItem
                        active={step === RESERVATION_STEP.GUEST}
                        disabled={!canSelect(RESERVATION_STEP.GUEST)}
                        onClick={() => goToStep(RESERVATION_STEP.GUEST)}
                    >
                        Submit information
                    </NavItem>

                    <NavItem
                        active={step === RESERVATION_STEP.CONFIRM}
                        disabled={!canSelect(RESERVATION_STEP.CONFIRM)}
                        onClick={() => goToStep(RESERVATION_STEP.CONFIRM)}
                    >
                        Confirm reservation
                    </NavItem>
                </Nav>
                )}

                {renderStep()}

                {/*{ showManageButton && (*/}
                {/*    <div className="app-manage">*/}
                {/*        <button className="btn">Manage</button>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </>
    )
}
