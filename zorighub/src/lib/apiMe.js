import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

export async function getMe() {
    try {
        const { data } = await axios.get(`${API_BASE}/api/logged/me`, {
            withCredentials: true,
        });
        return data;
    } catch (err) {
        console.warn("getMe failed:", err?.response?.data || err.message);
        return null;
    }
}
