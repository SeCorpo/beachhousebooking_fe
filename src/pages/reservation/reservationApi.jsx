
// All Api calls are placed in reservationApi

// fetchAvailability
// createReservation

import fetchJSON from "../../utils/fetching.jsx";

export async function fetchAvailability(beachhousename, agendaBegin = null, agendaEnd = null) {
    if (!beachhousename || !beachhousename.trim()) {
        throw new Error("Beach house name is required");
    }

    const params = new URLSearchParams();
    if (agendaBegin && agendaEnd) {
        params.append("startdate", agendaBegin)
        params.append("enddate", agendaEnd);
    }

    const queryString = params.toString();
    const url =
        `/reservation/p/${encodeURIComponent(beachhousename)}` +
        (queryString ? `?${queryString}` : "");

    const response = await fetchJSON(url, "GET")

    if (response instanceof Error) {
        throw new Error("Network error while fetching availability");
    }

    if (response?.detail) {
        throw new Error(response.detail);
    }

    if (typeof response !== "object") {
        throw new Error("Invalid availability response from server");
    }

    return response;
}


export async function createReservation(beachhousename, reservationModel) {
    if (!beachhousename || !beachhousename.trim()) {
        throw new Error("Beach house name is required");
    }

    const url = `/reservation/r/${encodeURIComponent(beachhousename)}`;

    const response = await fetchJSON(url, "POST", {...reservationModel });

    if (response instanceof Error) {
        throw new Error("Network error while fetching availability");
    }

    if (response?.detail) {
        throw new Error(response.detail);
    }

    if (typeof response !== "object") {
        throw new Error("Invalid availability response from server");
    }

    return response;
}
