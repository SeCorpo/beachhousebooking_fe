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