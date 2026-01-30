
export default async function fetchJSON(url, method = "GET", body = null) {

    const requestOptions = { method, headers: {} };
    const hasBody = method !== "GET" && method !== "HEAD" && body !== null;

    if (hasBody) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(
        `http://localhost:5000/api/v1${url}`,
        requestOptions
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const msg = data?.detail ?? data?.message ?? `HTTP ${response.status}`;
        throw new Error(msg);
    }

    return data;
}
