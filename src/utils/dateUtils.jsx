/**
 * Format Date -> "YYYY-MM-DD" (local date)
 */
export function toIsoDateLocal(date) {
    if (!(date instanceof Date)) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

/**
 * Parse "YYYY-MM-DD" -> Date (local)
 */
export function fromIsoDateLocal(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
}

export function endOfMonth(date) {
    // last day of the month, local time
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function addMonths(date, months) {
    // keep "day" sane by jumping to the 1st first
    return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}