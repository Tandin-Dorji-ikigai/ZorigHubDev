// src/pages/buyer/BuyerOrderDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BuyerHeader from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import { Placeholder } from "rsuite";
import { FaArrowLeft } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";
const currency = (nu) => `Nu. ${Number(nu || 0).toLocaleString()}`;
const fmt = (d) => (d ? new Date(d).toLocaleString() : "—");

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

const Row = ({ label, value }) => (
    <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

/* ---------- Skeleton while loading ---------- */
const OrderDetailSkeleton = () => (
    <>
        <section className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
            <Placeholder.Paragraph rows={1} active />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Placeholder.Paragraph rows={2} active />
                <Placeholder.Paragraph rows={2} active />
                <Placeholder.Paragraph rows={2} active />
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 bg-white rounded-2xl shadow border border-gray-100 p-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="py-4 border-b last:border-0 flex gap-4">
                        <Placeholder.Graph active style={{ width: 88, height: 88, borderRadius: 12 }} />
                        <div className="flex-1">
                            <Placeholder.Paragraph rows={2} active />
                            <div className="mt-2">
                                <Placeholder.Paragraph rows={1} style={{ width: 160 }} active />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <aside className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                <Placeholder.Paragraph rows={5} active />
            </aside>
        </div>
    </>
);

export default function BuyerOrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [txns, setTxns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        document.title = `Order ${orderId} — ZorigHub`;
    }, [orderId]);

    useEffect(() => {
        let cancel = false;
        (async () => {
            try {
                setLoading(true);
                setErr("");

                const [orderRes, txnRes] = await Promise.all([
                    axios.get(`${API_BASE}/api/orders/${orderId}`, { withCredentials: true }).catch((e) => ({ error: e })),
                    axios.get(`${API_BASE}/api/transactions/order/${orderId}`, { withCredentials: true }).catch((e) => ({ error: e })),
                ]);

                if (orderRes?.error) throw orderRes.error;
                if (!cancel) setOrder(orderRes.data);

                if (!txnRes?.error) {
                    if (!cancel) setTxns(Array.isArray(txnRes.data) ? txnRes.data : []);
                }
            } catch (e) {
                console.error(e);
                if (!cancel) setErr("Failed to load order detail.");
            } finally {
                if (!cancel) setLoading(false);
            }
        })();
        return () => { cancel = true; };
    }, [orderId]);

    /* ---------- Items normalize (supports both shapes) ---------- */
    const items = useMemo(() => {
        if (!order) return [];

        // Case A: orders with items[]
        const rawItems = Array.isArray(order.items) ? order.items : [];
        if (rawItems.length) {
            return rawItems.map((it, idx) => {
                const p = it?.product || {};
                const images = Array.isArray(p?.images) && p.images.length ? p.images : p?.image ? [p.image] : [];
                const img = images[0] || "https://via.placeholder.com/300x300?text=Product";
                return {
                    id: String(p?._id || `i-${idx}`),
                    title: p?.name || "Product",
                    artisan: it?.seller?.fullName || it?.seller?.name || "Artisan",
                    location: [it?.seller?.dzongkhag, it?.seller?.gewog].filter(Boolean).join(", "),
                    qty: Number(it?.quantity || 1),
                    price: Number(it?.price || p?.price || 0),
                    subtotal: Number(it?.subtotal || 0),
                    img,
                };
            });
        }

        // Case B: minimal orders with productId only
        if (order.productId) {
            return [
                {
                    id: String(order.productId),
                    title: "Product",
                    artisan: "—",
                    location: "",
                    qty: 1,
                    price: Number(order.totalAmount || 0),
                    subtotal: Number(order.totalAmount || 0),
                    img: "https://via.placeholder.com/300x300?text=Product",
                },
            ];
        }

        // No items found
        return [];
    }, [order]);

    /* ---------- Product ID listing for "Details" ---------- */
    const productIdList = useMemo(() => {
        if (!order) return "—";
        if (Array.isArray(order.items) && order.items.length) {
            return order.items.map((it) => String(it?.product?._id || it?.product)).filter(Boolean).join(", ") || "—";
        }
        return order.productId ? String(order.productId) : "—";
    }, [order]);

    /* ---------- Transactions: prefer API; fallback to order.transactionId ---------- */
    const fallbackTxn = useMemo(() => {
        if (!order?.transactionId) return [];
        const t = order.transactionId;
        return [
            {
                _id: t._id || "txn-fallback",
                amount: Number(t.amount || 0),
                method: order?.paymentMethod || "other",
                provider: t.provider || undefined,
                status: order?.status === "paid" ? "captured" : order?.status || "pending",
                createdAt: t.createdAt,
                authorizedAt: undefined,
                capturedAt: order?.status === "paid" ? (t.createdAt || order?.updatedAt) : undefined,
                breakdown: undefined,
            },
        ];
    }, [order]);

    const allTxns = txns.length ? txns : fallbackTxn;

    /* ---------- Totals from transactions if present ---------- */
    const breakdown = useMemo(() => {
        if (!allTxns.length) return null;
        const agg = { subtotal: 0, shipping: 0, tax: 0, discount: 0, fees: 0, total: 0 };
        for (const t of allTxns) {
            const b = t?.breakdown || {};
            agg.subtotal += Number(b.subtotal || 0);
            agg.shipping += Number(b.shipping || 0);
            agg.tax += Number(b.tax || 0);
            agg.discount += Number(b.discount || 0);
            agg.fees += Number(b.fees || 0);
            agg.total += Number(t.amount || 0);
        }
        return agg;
    }, [allTxns]);

    const headerMeta = useMemo(() => {
        const status = order?.status || "pending";
        const created = order?.createdAt ? new Date(order.createdAt) : null;
        const buyer = order?.userId?.fullName || "Unknown buyer";
        return { status, created, buyer };
    }, [order]);

    const totalAmount = Number(order?.totalAmount || 0);
    const buyerEmail = order?.userId?.email || "—";

    return (
        <div className="bg-gray-50 min-h-[80vh] flex flex-col">
            <BuyerHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
                <div className="mb-6">
                    <Link to="/buyer/orders" className="inline-flex items-center gap-2 text-red-600 hover:underline">
                        <FaArrowLeft /> Back to Orders
                    </Link>
                </div>

                {loading ? (
                    <OrderDetailSkeleton />
                ) : err ? (
                    <section className="bg-white rounded-2xl shadow border border-gray-100 p-8 text-red-600">
                        {err}
                    </section>
                ) : !order ? (
                    <section className="bg-white rounded-2xl shadow border border-gray-100 p-8 text-gray-600">
                        Order not found.
                    </section>
                ) : (
                    <>
                        {/* Top meta */}
                        <section className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div>
                                    <h1 className="text-xl font-bold text-[#1C2733]">Order #{order._id}</h1>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Placed {fmt(headerMeta.created)} • Buyer: {headerMeta.buyer}
                                    </p>
                                </div>
                                <StatusBadge status={headerMeta.status} />
                            </div>

                            {/* Details grid */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <Row label="Order ID" value={order._id} />
                                <Row label="Status (raw)" value={String(order.status || "pending")} />
                                <Row label="Total Amount" value={currency(totalAmount)} />
                                <Row label="Buyer Email" value={buyerEmail} />
                                <Row label="Created At" value={fmt(order.createdAt)} />
                                <Row label="Updated At" value={fmt(order.updatedAt)} />
                                <Row label="Product ID(s)" value={productIdList} />
                                {order.transactionId?._id && (
                                    <Row label="Transaction ID" value={order.transactionId._id} />
                                )}
                            </div>
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Items */}
                            <section className="lg:col-span-2 bg-white rounded-2xl shadow border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-[#1C2733]">Items</h2>
                                <div className="mt-4 divide-y divide-gray-100">
                                    {items.map((it) => (
                                        <div key={it.id} className="py-4 flex items-start gap-4">
                                            <img
                                                src={it.img}
                                                alt={it.title}
                                                className="w-22 h-22 md:w-24 md:h-24 rounded-xl border border-gray-200 object-cover"
                                                loading="lazy"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-[#1C2733]">{it.title}</p>
                                                <p className="text-sm text-gray-600 mt-0.5">
                                                    Artisan: {it.artisan} {it.location ? `• ${it.location}` : ""}
                                                </p>
                                                <div className="mt-2 flex flex-wrap gap-6 text-sm">
                                                    <span className="text-gray-600">
                                                        Qty: <strong className="text-gray-800">{it.qty}</strong>
                                                    </span>
                                                    <span className="text-gray-600">
                                                        Unit: <strong className="text-gray-800">{currency(it.price)}</strong>
                                                    </span>
                                                    <span className="text-gray-600">
                                                        Subtotal:{" "}
                                                        <strong className="text-gray-800">
                                                            {currency(it.subtotal || it.price * it.qty)}
                                                        </strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {items.length === 0 && (
                                        <div className="py-10 text-center text-gray-500">No items in this order.</div>
                                    )}
                                </div>
                            </section>

                            {/* Summary / Payments */}
                            <aside className="bg-white rounded-2xl shadow border border-gray-100 p-6 h-fit sticky top-8">
                                <h3 className="text-lg font-bold text-[#1C2733]">Summary</h3>

                                {/* Prefer transaction breakdown; else show order total */}
                                <div className="mt-4 space-y-2">
                                    {breakdown ? (
                                        <>
                                            <Row label="Items subtotal" value={currency(breakdown.subtotal)} />
                                            <Row label="Shipping" value={currency(breakdown.shipping)} />
                                            <Row label="Tax" value={currency(breakdown.tax)} />
                                            {breakdown.discount > 0 && (
                                                <Row label="Discount" value={`- ${currency(breakdown.discount)}`} />
                                            )}
                                            {breakdown.fees > 0 && <Row label="Fees" value={currency(breakdown.fees)} />}
                                            <div className="border-t pt-3 mt-3 flex items-center justify-between text-base font-bold">
                                                <span>Total charged</span>
                                                <span>{currency(breakdown.total)}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Row label="Order total" value={currency(totalAmount)} />
                                        </>
                                    )}
                                </div>

                                {/* Payments */}
                                <div className="mt-8">
                                    <h4 className="text-sm font-semibold text-gray-900">Payments ({allTxns.length})</h4>
                                    <div className="mt-3 space-y-3">
                                        {allTxns.length === 0 && (
                                            <p className="text-sm text-gray-500">No payment records yet.</p>
                                        )}
                                        {allTxns.map((t) => (
                                            <div key={t._id} className="rounded-lg border border-gray-200 p-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium">
                                                        {String(t.method || "other").toUpperCase()}{" "}
                                                        {t.provider ? `• ${t.provider}` : ""}
                                                    </span>
                                                    <StatusBadge status={t.status || "pending"} />
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {t.capturedAt
                                                        ? `Captured ${fmt(t.capturedAt)}`
                                                        : t.authorizedAt
                                                            ? `Authorized ${fmt(t.authorizedAt)}`
                                                            : t.createdAt
                                                                ? `Created ${fmt(t.createdAt)}`
                                                                : "—"}
                                                </div>
                                                <div className="mt-2 text-right text-sm font-semibold">
                                                    {currency(t.amount || 0)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </main>

            <BuyerFooter />
        </div>
    );
}
