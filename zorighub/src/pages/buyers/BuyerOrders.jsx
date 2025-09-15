import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BuyerHeader from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import { FaSearch, FaEye } from "react-icons/fa";
import { getMe } from "@/lib/apiMe";
import { Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";
const currency = (nu) => `Nu. ${Number(nu || 0).toLocaleString()}`;

/* ---------- Status helpers ---------- */
const statusKeyOf = (raw = "") => {
    const s = String(raw).toLowerCase();
    if (s === "paid") return "processing";
    if (s === "delivered") return "completed";
    if (["pending", "processing", "completed", "cancelled", "failed"].includes(s)) return s;
    return "pending";
};

const StatusBadge = ({ status }) => {
    const key = statusKeyOf(status);
    const labelMap = {
        pending: "Pending",
        processing: "Processing",
        completed: "Completed",
        cancelled: "Cancelled",
        failed: "Failed",
    };
    const classMap = {
        pending: "bg-yellow-50 text-yellow-700 ring-yellow-200",
        processing: "bg-blue-50 text-blue-700 ring-blue-200",
        completed: "bg-green-50 text-green-700 ring-green-200",
        cancelled: "bg-red-50 text-red-700 ring-red-200",
        failed: "bg-red-50 text-red-700 ring-red-200",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${classMap[key] || classMap.pending}`}>
            {labelMap[key] || "Pending"}
        </span>
    );
};

/* ---------- Tiny table cells ---------- */
const Th = ({ children, className = "" }) => (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ${className}`}>
        {children}
    </th>
);

const Td = ({ children, className = "" }) => (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>
);

/* ---------- Page ---------- */
export default function BuyerOrders() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("all");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        document.title = "ZorigHub — Orders";
    }, []);

    useEffect(() => {
        let cancel = false;
        (async () => {
            try {
                setLoading(true);
                setErr("");
                const me = await getMe().catch(() => null);
                const userId = me?.user?._id || me?.user?.id || me?.user?.userId;
                if (!userId) {
                    if (!cancel) setErr("Please log in to view your orders.");
                    return;
                }
                const { data } = await axios.get(`${API_BASE}/api/orders/user/${userId}`, {
                    withCredentials: true,
                });

                // Normalize what we need for the UI, but keep original in case you add “View details” later.
                const mapped = (Array.isArray(data) ? data : []).map((o) => {
                    const items = Array.isArray(o.items) ? o.items : [];
                    const first = items[0] || {};
                    const productName =
                        first?.product?.name ||
                        first?.product?.title ||
                        (items.length > 1 ? `${items.length} items` : "Item");
                    const sellerName = first?.seller?.fullName || first?.seller?.name || "Artisan";
                    const buyerName = o?.userId?.fullName || "You";

                    return {
                        _raw: o,
                        id: o._id,
                        product: productName,
                        artisan: { name: sellerName },
                        buyer: buyerName,
                        placedAt: o.createdAt || o.updatedAt,
                        total: Number(o.totalAmount || 0),
                        // backend -> UI status key
                        statusKey: statusKeyOf(o.status),
                    };
                });

                if (!cancel) setOrders(mapped);
            } catch (e) {
                console.error(e);
                if (!cancel) setErr("Failed to load orders.");
            } finally {
                if (!cancel) setLoading(false);
            }
        })();
        return () => { cancel = true; };
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return orders.filter((o) => {
            const matchesQ =
                !q ||
                o.id.toLowerCase().includes(q) ||
                o.product.toLowerCase().includes(q) ||
                o.artisan.name.toLowerCase().includes(q) ||
                o.buyer.toLowerCase().includes(q);
            const matchesS = status === "all" ? true : o.statusKey === status;
            return matchesQ && matchesS;
        });
    }, [orders, query, status]);

    return (

        <div className="bg-gray-50 min-h-screen">
            <BuyerHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 mb-[110px]">
                {/* Filters */}
                <section className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        <div className="relative flex-1">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                placeholder="Search orders by ID, product, artisan, or buyer…"
                                className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        {/* Status */}
                        <div className="flex gap-3">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Content */}
                {loading ? (
                    <section className="bg-white rounded-2xl shadow border border-gray-100 p-8 text-gray-500">
                        Loading orders…
                    </section>
                ) : err ? (
                    <section className="bg-white rounded-2xl shadow border border-gray-100 p-8 text-red-600">
                        {err}
                    </section>
                ) : (
                    <section className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden ">
                        {/* Desktop table */}
                        <div className="hidden md:block">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <Th>Order ID</Th>
                                            <Th>Product</Th>
                                            <Th>Artisan</Th>
                                            <Th>Buyer</Th>
                                            <Th>Placed On</Th>
                                            <Th>Total</Th>
                                            <Th>Status</Th>
                                            <Th className="text-right">Actions</Th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {filtered.map((o) => (
                                            <tr key={o.id} className="hover:bg-gray-50/60">
                                                <Td>{o.id}</Td>
                                                <Td className="font-medium text-[#1C2733]">{o.product}</Td>
                                                <Td>{o.artisan.name}</Td>
                                                <Td>{o.buyer}</Td>
                                                <Td>{o.placedAt ? new Date(o.placedAt).toLocaleDateString() : "—"}</Td>
                                                <Td className="font-semibold">{currency(o.total)}</Td>
                                                <Td><StatusBadge status={o.statusKey} /></Td>
                                                <Td className="text-right">
                                                    <Link
                                                        to={`/buyer/orders/${o.id}`}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition"
                                                    >
                                                        <FaEye className="text-sm" />
                                                        View
                                                    </Link>
                                                </Td>
                                            </tr>
                                        ))}
                                        {filtered.length === 0 && (
                                            <tr>
                                                <td colSpan={8} className="py-10 text-center text-gray-500">
                                                    No orders match your filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile cards */}
                        <div className="md:hidden p-4 space-y-4">
                            {filtered.map((o) => (
                                <div key={o.id} className="rounded-xl border border-gray-200 p-4 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">{o.id}</p>
                                            <h3 className="text-base font-semibold text-[#1C2733]">{o.product}</h3>
                                        </div>
                                        <StatusBadge status={o.statusKey} />
                                    </div>

                                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Artisan</p>
                                            <p className="mt-1">{o.artisan.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Buyer</p>
                                            <p className="mt-1">{o.buyer}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Placed</p>
                                            <p className="mt-1">{o.placedAt ? new Date(o.placedAt).toLocaleDateString() : "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Total</p>
                                            <p className="mt-1 font-semibold">{currency(o.total)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition">
                                            <FaEye className="text-sm" />
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filtered.length === 0 && (
                                <p className="text-center text-gray-500 py-6">No orders match your filters.</p>
                            )}
                        </div>
                    </section>
                )}
            </main>

            <BuyerFooter />
        </div>

    );
}
