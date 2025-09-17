// src/pages/buyer/PaymentSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const currency = (nu) => `Nu. ${Number(nu || 0).toLocaleString()}`;

function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

export default function PaymentSuccess({ orderId, subtotal = 0 }) {
    const s = Number(subtotal) || 0;
    const shippingCost = 500;
    const tax = Math.round(s * 0.1);
    const total = s + shippingCost + tax;

    return (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white border border-gray-100 rounded-2xl shadow p-8 text-center">
                <FaCheckCircle className="mx-auto text-green-600 text-5xl" />
                <h1 className="mt-4 text-2xl font-bold text-gray-900">Order placed successfully</h1>
                <p className="mt-2 text-gray-600">
                    Thank you! Your order <span className="font-semibold">{orderId}</span> has been received.
                </p>

                <div className="mt-8 text-left">
                    <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
                    <div className="mt-3 space-y-2 text-sm">
                        <Row label="Subtotal" value={currency(s)} />
                        <Row label="Shipping" value={currency(shippingCost)} />
                        <Row label="Tax" value={currency(tax)} />
                    </div>
                    <div className="mt-3 border-t pt-3 flex items-center justify-between text-base font-bold">
                        <span>Total</span>
                        <span>{currency(total)}</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/buyer/orders"
                        className="inline-flex justify-center px-5 py-2.5 rounded-md bg-gray-900 text-white hover:bg-black"
                    >
                        View Orders
                    </Link>
                    <Link
                        to="/buyer/BuyerMarketPlace"
                        className="inline-flex justify-center px-5 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </section>
    );
}
