import React, { useEffect, useMemo, useState } from "react";
import BuyerHeader from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import { FaSearch, FaEye } from "react-icons/fa";

/* ---------- Demo data (replace with API later) ---------- */
const DEMO = [
    {
        id: "#ZH-4208",
        product: "Kira (Handwoven)",
        artisan: { name: "Dorji Wangmo", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" },
        buyer: "Jigme Johnson (USA)",
        placedAt: "2025-08-04",
        total: 8500,
        status: "Processing",
    },
    {
        id: "#ZH-4207",
        product: "Wooden Dapa Bowl",
        artisan: { name: "Ugyen Tashi", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&auto=format&fit=crop" },
        buyer: "Karma Wangchuk (BT)",
        placedAt: "2025-08-03",
        total: 2200,
        status: "Completed",
    },
    {
        id: "#ZH-4206",
        product: "Thangka (Green Tara)",
        artisan: { name: "Pema Lhendup", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&auto=format&fit=crop" },
        buyer: "Sonam Choden (BT)",
        placedAt: "2025-08-02",
        total: 12500,
        status: "Cancelled",
    },
    {
        id: "#ZH-4205",
        product: "Bamboo Bangchung",
        artisan: { name: "Kinley Om", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop" },
        buyer: "Dechen Dorji (BT)",
        placedAt: "2025-08-01",
        total: 980,
        status: "Pending",
    },
];

/* ---------- Small UI helpers ---------- */
const StatusBadge = ({ status }) => {
    const map = {
        Pending: "bg-yellow-50 text-yellow-700 ring-yellow-200",
        Processing: "bg-blue-50 text-blue-700 ring-blue-200",
        Completed: "bg-green-50 text-green-700 ring-green-200",
        Cancelled: "bg-red-50 text-red-700 ring-red-200",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${map[status] || "bg-gray-50 text-gray-700 ring-gray-200"}`}>
            {status}
        </span>
    );
};

const currency = (nu) => `Nu. ${nu.toLocaleString()}`;

/* ---------- Page ---------- */
export default function BuyerOrders() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("all");

    useEffect(() => {
        document.title = "ZorigHub — Orders";
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return DEMO.filter((o) => {
            const matchesQ =
                !q ||
                o.id.toLowerCase().includes(q) ||
                o.product.toLowerCase().includes(q) ||
                o.artisan.name.toLowerCase().includes(q) ||
                o.buyer.toLowerCase().includes(q);
            const matchesS = status === "all" ? true : o.status.toLowerCase() === status;
            return matchesQ && matchesS;
        });
    }, [query, status]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <BuyerHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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
                            </select>
                        </div>
                    </div>
                </section>

                {/* Orders list */}
                <section className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
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
                                            <Td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={o.artisan.avatar}
                                                        alt={o.artisan.name}
                                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/10"
                                                        loading="lazy"
                                                    />
                                                    <span>{o.artisan.name}</span>
                                                </div>
                                            </Td>
                                            <Td>{o.buyer}</Td>
                                            <Td>{new Date(o.placedAt).toLocaleDateString()}</Td>
                                            <Td className="font-semibold">{currency(o.total)}</Td>
                                            <Td><StatusBadge status={o.status} /></Td>
                                            <Td className="text-right">
                                                <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition">
                                                    <FaEye className="text-sm" />
                                                    View
                                                </button>
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
                                    <StatusBadge status={o.status} />
                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-gray-500">Artisan</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <img
                                                src={o.artisan.avatar}
                                                alt={o.artisan.name}
                                                className="w-6 h-6 rounded-full object-cover ring-2 ring-primary/10"
                                                loading="lazy"
                                            />
                                            <span>{o.artisan.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Buyer</p>
                                        <p className="mt-1">{o.buyer}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Placed</p>
                                        <p className="mt-1">{new Date(o.placedAt).toLocaleDateString()}</p>
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
            </main>

            <BuyerFooter />
        </div>
    );
}

/* ---------- Tiny table cells ---------- */
const Th = ({ children, className = "" }) => (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ${className}`}>
        {children}
    </th>
);

const Td = ({ children, className = "" }) => (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>{children}</td>
);
