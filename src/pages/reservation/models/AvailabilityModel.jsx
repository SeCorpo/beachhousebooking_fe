import RentalPropertyModel from "./RentalPropertyModel.jsx";
import DayModel from "./DayModel.jsx";

export default class AvailabilityModel {
    constructor(
        rentalPropertyModel,
        dayModels = [],
        timestamp = null
    ) {
        this.rentalPropertyModel = rentalPropertyModel; // RentalPropertyModel
        this.dayModels = dayModels;                     // DayModel[]
        this.timestamp = timestamp;                     // Date | null
    }

    static empty() {
        return new AvailabilityModel(null, []);
    }

    static fromApi(dto) {
        return new AvailabilityModel(
            RentalPropertyModel.fromApi(dto?.rentalProperty),
            (dto?.availability ?? []).map(DayModel.fromApi),
            dto?.timestamp ? new Date(dto.timestamp) : null
        );
    }

    static merge(oldModel, newModel) {
        if (!oldModel) return newModel;
        if (!newModel) return oldModel;

        // using a map for the sorting process
        const byDate = new Map();

        for (const d of (oldModel.dayModels ?? [])) byDate.set(d.day, d);
        for (const d of (newModel.dayModels ?? [])) byDate.set(d.day, d);

        const mergedDays = Array.from(byDate.values()).sort((a, b) =>
            String(a.day).localeCompare(String(b.day))
        );

        return new AvailabilityModel(
            oldModel.rentalPropertyModel ?? newModel.rentalPropertyModel,
            mergedDays,
            newModel.timestamp ?? oldModel.timestamp
        );
    }
}