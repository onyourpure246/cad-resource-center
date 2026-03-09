// We intentionally throw an error instead of using redirect() directly here,
// because if a Server Action uses fetchApi and wraps it in a try/catch,
// the Next.js redirect block (which throws NEXT_REDIRECT) would be swallowed
// and the client would never get navigated out.

export async function fetchApi(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const res = await fetch(input, init);

    if (res.status === 401 || res.status === 403) {
        console.warn(`[fetchApi] 401/403 detected on ${input.toString()}`);
        throw new Error("SESSION_EXPIRED");
    }

    return res;
}
