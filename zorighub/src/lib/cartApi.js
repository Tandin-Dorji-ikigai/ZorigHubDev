import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

export async function getCart(userId) {
    const { data } = await axios.get(`${API_BASE}/api/carts/${userId}`, { withCredentials: true });
    return data;
}

export async function addItem(userId, productId, quantity, price) {
    const { data } = await axios.post(
        `${API_BASE}/api/carts/add-item`,
        { userId, productId, quantity, price },
        { withCredentials: true }
    );
    window.dispatchEvent(new Event("cart:updated"));

    return data;
}

export async function removeItem(userId, productId) {
    const { data } = await axios.post(
        `${API_BASE}/api/carts/remove-item`,
        { userId, productId },
        { withCredentials: true }
    );
      window.dispatchEvent(new Event("cart:updated"));
    return data; 
}

export async function emptyCart(userId) {
    const { data } = await axios.post(`${API_BASE}/api/carts/empty/${userId}`, {}, { withCredentials: true });
      window.dispatchEvent(new Event("cart:updated"));
    return data;
}
