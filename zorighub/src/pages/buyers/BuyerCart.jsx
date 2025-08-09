import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerNav from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import { FaMinus, FaPlus, FaTrashAlt, FaArrowLeft, FaLock } from "react-icons/fa";
import image from "../../assets/images/people/tshering.jpg";

/* --- Demo cart items (replace with API/store later) --- */
const INITIAL_ITEMS = [
    {
        id: "p-001",
        title: "Kira (Handwoven, Bumthang)",
        variant: "Crimson / M",
        price: 8500,
        qty: 1,
        img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop",
        artisan: "Dorji Wangmo",
    },
    {
        id: "p-002",
        title: "Wooden Dapa Bowl",
        variant: "Walnut finish",
        price: 2200,
        qty: 2,
        img: image,
        artisan: "Ugyen Tashi",
    },
];

const currency = (nu) => `Nu. ${nu.toLocaleString()}`;

export default function BuyerCart() {
    const [items, setItems] = useState(INITIAL_ITEMS);
    const [promo, setPromo] = useState("");
    const [appliedPromo, setAppliedPromo] = useState(null); // {code, discountPct}

    const subtotal = useMemo(
        () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
        [items]
    );

    // Demo shipping/tax logic (tweak as needed)
    const shipping = items.length ? 500 : 0;
    const tax = Math.round(subtotal * 0.1); // 10% demo tax

    const discount = useMemo(() => {
        if (!appliedPromo) return 0;
        return Math.round((subtotal * appliedPromo.discountPct) / 100);
    }, [appliedPromo, subtotal]);

    const total = Math.max(subtotal + shipping + tax - discount, 0);

    const updateQty = (id, delta) => {
        setItems((prev) =>
            prev
                .map((it) =>
                    it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
                )
                .filter((it) => it.qty > 0)
        );
    };

    const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

    const applyPromo = () => {
        const code = promo.trim().toUpperCase();
        if (!code) return;
        if (code === "ZORIG10") {
            setAppliedPromo({ code, discountPct: 10 });
        } else {
            setAppliedPromo(null);
            alert("Invalid promo code");
        }
        setPromo("");
    };

    return (
        <div className="min-h-screen bg-white">
            <BuyerNav />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <section className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                                <span className="text-gray-600 text-sm">
                                    {items.length} {items.length === 1 ? "item" : "items"}
                                </span>
                            </div>

                            {items.length === 0 ? (
                                <div className="py-16 text-center text-gray-500">
                                    Your cart is empty.
                                    <div className="mt-4">
                                        <Link
                                            to="/buyer/BuyerMarketPlace"
                                            className="text-red-600 hover:underline inline-flex items-center gap-2"
                                        >
                                            <FaArrowLeft />
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop table */}
                                    <div className="hidden md:block">
                                        <div className="divide-y divide-gray-200">
                                            {items.map((it) => (
                                                <div key={it.id} className="py-4 flex items-center gap-4">
                                                    <img
                                                        src={it.img}
                                                        alt={it.title}
                                                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                                        loading="lazy"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-[#1C2733]">{it.title}</h3>
                                                        <p className="text-sm text-gray-600">
                                                            {it.variant} • Artisan: {it.artisan}
                                                        </p>
                                                        <div className="mt-3 flex items-center gap-3">
                                                            <div className="inline-flex items-center rounded-lg border border-gray-300">
                                                                <button
                                                                    aria-label="decrease"
                                                                    onClick={() => updateQty(it.id, -1)}
                                                                    className="px-2 py-1 hover:bg-gray-50"
                                                                >
                                                                    <FaMinus />
                                                                </button>
                                                                <span className="px-3">{it.qty}</span>
                                                                <button
                                                                    aria-label="increase"
                                                                    onClick={() => updateQty(it.id, 1)}
                                                                    className="px-2 py-1 hover:bg-gray-50"
                                                                >
                                                                    <FaPlus />
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => removeItem(it.id)}
                                                                className="inline-flex items-center gap-2 text-red-600 hover:underline"
                                                            >
                                                                <FaTrashAlt />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm text-gray-500">Price</div>
                                                        <div className="font-semibold">{currency(it.price)}</div>
                                                        <div className="mt-1 text-sm text-gray-500">Subtotal</div>
                                                        <div className="font-semibold">
                                                            {currency(it.price * it.qty)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mobile cards */}
                                    <div className="md:hidden space-y-4">
                                        {items.map((it) => (
                                            <div
                                                key={it.id}
                                                className="rounded-xl border border-gray-200 p-4 shadow-sm"
                                            >
                                                <div className="flex gap-4">
                                                    <img
                                                        src={it.img}
                                                        alt={it.title}
                                                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                                        loading="lazy"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-[#1C2733]">{it.title}</h3>
                                                        <p className="text-sm text-gray-600">
                                                            {it.variant} • {it.artisan}
                                                        </p>
                                                        <div className="mt-3 flex items-center gap-3">
                                                            <div className="inline-flex items-center rounded-lg border border-gray-300">
                                                                <button
                                                                    aria-label="decrease"
                                                                    onClick={() => updateQty(it.id, -1)}
                                                                    className="px-2 py-1 hover:bg-gray-50"
                                                                >
                                                                    <FaMinus />
                                                                </button>
                                                                <span className="px-3">{it.qty}</span>
                                                                <button
                                                                    aria-label="increase"
                                                                    onClick={() => updateQty(it.id, 1)}
                                                                    className="px-2 py-1 hover:bg-gray-50"
                                                                >
                                                                    <FaPlus />
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => removeItem(it.id)}
                                                                className="inline-flex items-center gap-2 text-red-600 hover:underline"
                                                            >
                                                                <FaTrashAlt />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex justify-between text-sm">
                                                    <span className="text-gray-500">Price</span>
                                                    <span className="font-semibold">{currency(it.price)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Subtotal</span>
                                                    <span className="font-semibold">
                                                        {currency(it.price * it.qty)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer actions */}
                                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                                        <Link
                                            to="/buyer/BuyerMarketPlace"
                                            className="text-red-600 hover:underline flex items-center"
                                        >
                                            <FaArrowLeft className="mr-2" />
                                            Continue Shopping
                                        </Link>
                                        <button
                                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                        >
                                            Update Cart
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Promo Code */}
                        {items.length > 0 && (
                            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Have a Promo Code?
                                </h3>
                                <div className="flex">
                                    <input
                                        value={promo}
                                        onChange={(e) => setPromo(e.target.value)}
                                        type="text"
                                        placeholder="Enter promo code (try ZORIG10)"
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <button
                                        onClick={applyPromo}
                                        className="bg-red-600 text-white px-6 py-2 rounded-r-md hover:bg-red-700"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {appliedPromo && (
                                    <p className="mt-2 text-sm text-green-700">
                                        Applied <strong>{appliedPromo.code}</strong> —{" "}
                                        {appliedPromo.discountPct}% off
                                    </p>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Order Summary */}
                    <aside className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{currency(subtotal)}</span>
                                </div>
                                {appliedPromo && (
                                    <div className="flex justify-between text-green-700">
                                        <span>Promo ({appliedPromo.code})</span>
                                        <span>-{currency(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">{currency(shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="font-medium">{currency(tax)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{currency(total)}</span>
                                </div>
                            </div>

                            <Link
                                to="/buyer/checkout"
                                className={`w-full block text-center py-3 rounded-md font-bold mb-4 ${items.length
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                                aria-disabled={!items.length}
                                onClick={(e) => {
                                    if (!items.length) e.preventDefault();
                                }}
                            >
                                Buy Product
                            </Link>

                            <p className="text-sm text-gray-500 text-center">
                                <FaLock className="inline mr-1" /> Secure checkout
                            </p>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-medium text-gray-800 mb-3">
                                    Accepted Payment Methods
                                </h4>
                                <div className="flex gap-3">
                                    <div className="w-10 h-6 bg-gray-200 rounded grid place-items-center text-gray-700 text-xs">
                                        VISA
                                    </div>
                                    <div className="w-10 h-6 bg-gray-200 rounded grid place-items-center text-gray-700 text-xs">
                                        MC
                                    </div>
                                    <div className="w-10 h-6 bg-gray-200 rounded grid place-items-center text-gray-700 text-xs">
                                        PayPal
                                    </div>
                                    <div className="w-10 h-6 bg-gray-200 rounded grid place-items-center text-gray-700 text-xs">
                                        Card
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <BuyerFooter />
        </div>
    );
}
