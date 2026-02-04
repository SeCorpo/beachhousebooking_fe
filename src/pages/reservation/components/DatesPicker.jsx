import {useMemo} from "react";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import {toIsoDateLocal} from "../../../utils/dateUtils.jsx";
import "../datesPicker.css";

export default function DatesPicker({
                                        availabilityModel,
                                        startDate,
                                        endDate,
                                        onDateRangeChange,
                                        showPrices = true,
                                        onMonthChange,
                                    }) {
    const isLoaded = !!availabilityModel?.rentalPropertyModel;

    const dayByIso = useMemo(() => {
        const map = new Map();
        for (const dm of availabilityModel?.dayModels ?? []) {
            map.set(dm.day, dm);
        }
        return map;
    }, [availabilityModel]);

    // Disable everything until the availabilityModel is loaded/fetched
    function isDisabled(date) {
        if (!(date instanceof Date)) return false;
        if (!isLoaded) return true;

        const dm = dayByIso.get(toIsoDateLocal(date));
        return !dm;
    }

    const min = availabilityModel?.rentalPropertyModel?.minimalBookingLength;
    const max = availabilityModel?.rentalPropertyModel?.maximalBookingLength;


    return (
        <DayPicker
            className="dates-picker"
            animate
            mode="range"
            navLayout="after"
            captionLayout="dropdown-months"
            numberOfMonths={2}
            selected={{from: startDate, to: endDate}}
            disabled={isDisabled}
            excludeDisabled
            min={typeof min === "number" && min > 0 ? min : undefined}
            max={typeof max === "number" && max > 0 ? max : undefined}
            onSelect={(range) => onDateRangeChange(range?.from, range?.to)}
            onMonthChange={(month) => onMonthChange?.(month)}
            components={
                showPrices
                    ? {
                        DayButton: ({ day, ...buttonProps }) => {
                            const date = day?.date;

                            if (!(date instanceof Date)) {
                                return <button type="button" {...buttonProps} />;
                            }

                            // If not loaded (or the day isn't in the map), show no price
                            const dm = isLoaded ? dayByIso.get(toIsoDateLocal(date)) : null;
                            const price = dm?.price ?? null;

                            return (
                                <button type="button" {...buttonProps}>
                                    <div className="dates-picker__day">
                                        <div className="dates-picker__day-number">{date.getDate()}</div>
                                        <div className="dates-picker__day-price">
                                            {price != null ? `€${Number(price).toFixed(0)}` : ""}
                                        </div>
                                    </div>
                                </button>
                            );
                        },
                    }
                    : undefined
            }
        />
    );
}
