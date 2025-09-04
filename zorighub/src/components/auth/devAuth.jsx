// src/auth/devAuth.ts
export const DEV_USER_KEY = "zorighub_dev_user";
export const DEV_TOKEN_KEY = "zorighub_dev_token";

export function getCurrentUser() {
    // 1) Dev user from localStorage
    const cached = localStorage.getItem(DEV_USER_KEY);
    if (cached) {
        try {
            return JSON.parse(cached);
        } catch {
            // ignore parse errors
        }
    }
    // 2) (Optional) add your real auth/user getter here
    return null;
}

export function devLogout() {
    localStorage.removeItem(DEV_USER_KEY);
    localStorage.removeItem(DEV_TOKEN_KEY);
}
