import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerHeader from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

/* --- Replace with your cart/store later --- */
const CART_ITEMS = [
    { id: "1", title: "Kira (Handwoven, Bumthang)", qty: 1, price: 8500 },
    { id: "2", title: "Wooden Dapa Bowl", qty: 2, price: 2200 },
];

const currency = (nu) => `Nu. ${nu.toLocaleString()}`;

/* ---------- Reusable Formik Inputs ---------- */
function TextInput({ label, required, ...props }) {
    const [field, meta] = useField(props);
    const invalid = meta.touched && meta.error;
    return (
        <label className={`block ${props.className || ""}`}>
            <span className="block text-sm text-gray-700 mb-1">
                {label}{required && <span className="text-red-600"> *</span>}
            </span>
            <input
                {...field}
                {...props}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${invalid ? "border-red-600 focus:ring-red-200" : "border-gray-300 focus:ring-gray-900/20"
                    }`}
                aria-invalid={invalid ? "true" : "false"}
            />
            {invalid && <p className="mt-1 text-xs text-red-600">{meta.error}</p>}
        </label>
    );
}

function Checkbox({ children, ...props }) {
    const [field] = useField({ ...props, type: "checkbox" });
    return (
        <label className="inline-flex items-center gap-2">
            <input
                type="checkbox"
                {...field}
                {...props}
                className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-600"
            />
            <span className="text-sm text-gray-700">{children}</span>
        </label>
    );
}

function RadioCard({ title, desc, price, ...props }) {
    const [field] = useField({ ...props, type: "radio" });
    return (
        <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer">
            <input
                type="radio"
                {...field}
                {...props}
                className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300"
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{title}</span>
                    {typeof price === "number" && (
                        <span className="text-sm font-semibold">{currency(price)}</span>
                    )}
                </div>
                {desc && <p className="text-sm text-gray-600 mt-0.5">{desc}</p>}
            </div>
        </label>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

/* ---------- Yup Validation ---------- */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[0-9+\-\s()]{6,}$/;
const cardNoRe = /^[0-9\s]{12,19}$/;
const expRe = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvcRe = /^[0-9]{3,4}$/;

const CheckoutSchema = Yup.object({
    // billing
    firstName: Yup.string().trim().required("First name is required"),
    lastName: Yup.string().trim().required("Last name is required"),
    email: Yup.string().trim().matches(emailRe, "Enter a valid email").required("Email is required"),
    phone: Yup.string().trim().matches(phoneRe, "Enter a valid phone number").required("Phone is required"),
    address: Yup.string().trim().required("Address is required"),
    city: Yup.string().trim().required("City is required"),
    region: Yup.string().trim().required("Region/State is required"),
    postal: Yup.string().trim().required("Postal code is required"),
    country: Yup.string().trim().required("Country is required"),

    // toggles
    shipDiff: Yup.boolean().default(false),
    shippingMethod: Yup.string().oneOf(["standard", "express"]).required(),
    paymentMethod: Yup.string().oneOf(["card", "paypal", "bank"]).required(),
    agree: Yup.boolean().oneOf([true], "You must accept the terms"),

    // shipping (conditional)
    shippingFirstName: Yup.string().when("shipDiff", {
        is: true, then: (s) => s.trim().required("First name is required"), otherwise: (s) => s.optional()
    }),
    shippingLastName: Yup.string().when("shipDiff", {
        is: true, then: (s) => s.trim().required("Last name is required"), otherwise: (s) => s.optional()
    }),
    shippingAddress: Yup.string().when("shipDiff", {
        is: true, then: (s) => s.trim().required("Address is required"), otherwise: (s) => s.optional()
    }),
    shippingCity: Yup.string().when("shipDiff", {
        is: true, then: (s) => s.trim().required("City is required"), otherwise: (s) => s.optional()
    }),
    shippingRegion: Yup.string().when("shipDiff", {
        is: true, then: (s) => s.trim().required("Region/State is required"), otherwise: (s) => s.optional()
    }),
    shippingPostal: Yup.string().when("shipDiff", {
        is: true, then: (s) => s.trim().required("Postal code is required"), otherwise: (s) => s.optional()
    }),
    shippingCountry: Yup.string().when("shipDiff", {
        is: true, then: (s) => s.trim().required("Country is required"), otherwise: (s) => s.optional()
    }),

    // card (conditional)
    cardName: Yup.string().when("paymentMethod", {
        is: "card", then: (s) => s.trim().required("Name on card is required"), otherwise: (s) => s.optional()
    }),
    cardNumber: Yup.string().when("paymentMethod", {
        is: "card", then: (s) => s.trim().matches(cardNoRe, "Enter a valid card number").required("Card number is required"), otherwise: (s) => s.optional()
    }),
    cardExp: Yup.string().when("paymentMethod", {
        is: "card", then: (s) => s.trim().matches(expRe, "Use MM/YY").required("Expiry is required"), otherwise: (s) => s.optional()
    }),
    cardCvc: Yup.string().when("paymentMethod", {
        is: "card", then: (s) => s.trim().matches(cvcRe, "Enter a valid CVC").required("CVC is required"), otherwise: (s) => s.optional()
    }),
});

/* ---------- Component ---------- */
export default function BuyerCheckout() {
    const [placed, setPlaced] = useState(false);
    const [orderId, setOrderId] = useState("");

    const subtotal = useMemo(
        () => CART_ITEMS.reduce((sum, it) => sum + it.price * it.qty, 0),
        []
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <BuyerHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {placed ? (
                    <Success orderId={orderId} subtotal={subtotal} />
                ) : (
                    <Formik
                        initialValues={{
                            // billing
                            firstName: "", lastName: "", email: "", phone: "",
                            address: "", city: "", region: "", postal: "", country: "Bhutan",
                            // toggles
                            shipDiff: false,
                            shippingMethod: "standard",
                            paymentMethod: "card",
                            agree: false,
                            // shipping (optional)
                            shippingFirstName: "", shippingLastName: "", shippingAddress: "",
                            shippingCity: "", shippingRegion: "", shippingPostal: "", shippingCountry: "Bhutan",
                            // card
                            cardName: "", cardNumber: "", cardExp: "", cardCvc: "",
                        }}
                        validationSchema={CheckoutSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true);
                            // simulate API
                            setTimeout(() => {
                                setOrderId("ZH-" + Date.now().toString().slice(-6));
                                setPlaced(true);
                                setSubmitting(false);
                            }, 800);
                        }}
                    >
                        {({ values, isSubmitting, isValid }) => {
                            const shippingCost = values.shippingMethod === "express" ? 1200 : 500;
                            const tax = Math.round(subtotal * 0.1);
                            const total = subtotal + shippingCost + tax;
                            const canPlace = isValid && !isSubmitting && CART_ITEMS.length > 0;

                            return (
                                <Form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* LEFT: Forms */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Billing */}
                                        <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                                            <h2 className="text-xl font-bold text-gray-900">Billing details</h2>
                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <TextInput label="First name" name="firstName" required />
                                                <TextInput label="Last name" name="lastName" required />
                                                <TextInput label="Email" name="email" type="email" required />
                                                <TextInput label="Phone" name="phone" required />
                                                <TextInput label="Address" name="address" className="sm:col-span-2" required />
                                                <TextInput label="City" name="city" required />
                                                <TextInput label="Region/State" name="region" required />
                                                <TextInput label="Postal code" name="postal" required />
                                                <TextInput label="Country" name="country" />
                                            </div>

                                            <div className="mt-6">
                                                <Checkbox name="shipDiff">
                                                    Ship to a different address
                                                </Checkbox>
                                            </div>
                                        </section>

                                        {/* Shipping address (optional) */}
                                        {values.shipDiff && (
                                            <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                                                <h2 className="text-xl font-bold text-gray-900">Shipping address</h2>
                                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <TextInput label="First name" name="shippingFirstName" required />
                                                    <TextInput label="Last name" name="shippingLastName" required />
                                                    <TextInput label="Address" name="shippingAddress" className="sm:col-span-2" required />
                                                    <TextInput label="City" name="shippingCity" required />
                                                    <TextInput label="Region/State" name="shippingRegion" required />
                                                    <TextInput label="Postal code" name="shippingPostal" required />
                                                    <TextInput label="Country" name="shippingCountry" />
                                                </div>
                                            </section>
                                        )}

                                        {/* Shipping method */}
                                        <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                                            <h2 className="text-xl font-bold text-gray-900">Shipping method</h2>
                                            <div className="mt-4 grid gap-3">
                                                <RadioCard
                                                    name="shippingMethod" value="standard"
                                                    title="Standard (3–6 business days)"
                                                    price={500}
                                                    desc="Reliable delivery with tracking."
                                                />
                                                <RadioCard
                                                    name="shippingMethod" value="express"
                                                    title="Express (1–2 business days)"
                                                    price={1200}
                                                    desc="Fastest delivery with priority handling."
                                                />
                                            </div>
                                        </section>

                                        {/* Payment method */}
                                        <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                                            <h2 className="text-xl font-bold text-gray-900">Payment</h2>
                                            <div className="mt-4 grid gap-3">
                                                <RadioCard
                                                    name="paymentMethod" value="card"
                                                    title="Credit / Debit Card"
                                                    desc="Visa, MasterCard"
                                                />
                                                {values.paymentMethod === "card" && (
                                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4">
                                                        <TextInput label="Card holder name" name="cardName" placeholder="Name on card" required />
                                                        <TextInput label="Card number" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                                                        <TextInput label="Expiry (MM/YY)" name="cardExp" placeholder="08/27" required />
                                                        <TextInput label="CVC" name="cardCvc" placeholder="123" required />
                                                    </div>
                                                )}

                                                <RadioCard
                                                    name="paymentMethod" value="paypal"
                                                    title="PayPal"
                                                    desc="You’ll be redirected to PayPal."
                                                />
                                                <RadioCard
                                                    name="paymentMethod" value="bank"
                                                    title="Bank Transfer"
                                                    desc="Instructions will be emailed after placing order."
                                                />
                                            </div>

                                            <div className="mt-6">
                                                <Checkbox name="agree">
                                                    I agree to the <Link to="/terms" className="underline">Terms & Conditions</Link>
                                                </Checkbox>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={!canPlace}
                                                className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md font-semibold ${canPlace ? "bg-gray-900 text-white hover:bg-black" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                    }`}
                                            >
                                                <FaLock />
                                                {isSubmitting ? "Placing..." : "Place Order"}
                                            </button>
                                        </section>
                                    </div>

                                    {/* RIGHT: Summary */}
                                    <aside className="lg:col-span-1">
                                        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 sticky top-8">
                                            <h3 className="text-lg font-bold text-gray-900">Order summary</h3>

                                            <div className="mt-4 space-y-4">
                                                {CART_ITEMS.map((it) => (
                                                    <div key={it.id} className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{it.title}</p>
                                                            <p className="text-xs text-gray-500">Qty: {it.qty}</p>
                                                        </div>
                                                        <div className="text-sm font-semibold">{currency(it.price * it.qty)}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-6 space-y-2 text-sm">
                                                <Row label="Subtotal" value={currency(subtotal)} />
                                                <Row label="Shipping" value={currency(values.shippingMethod === "express" ? 1200 : 500)} />
                                                <Row label="Tax" value={currency(Math.round(subtotal * 0.1))} />
                                            </div>

                                            <div className="mt-4 border-t pt-4 flex items-center justify-between text-base font-bold">
                                                <span>Total</span>
                                                <span>
                                                    {currency(
                                                        subtotal +
                                                        (values.shippingMethod === "express" ? 1200 : 500) +
                                                        Math.round(subtotal * 0.1)
                                                    )}
                                                </span>
                                            </div>

                                            <p className="mt-6 text-xs text-gray-500">
                                                Need to edit your cart?{" "}
                                                <Link to="/buyer/BuyerCart" className="underline">Go back to cart</Link>.
                                            </p>
                                        </div>
                                    </aside>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </main>

            <BuyerFooter />
        </div>
    );
}

/* ---------- Success screen ---------- */
function Success({ orderId, subtotal }) {
    const shippingCost = 500; // default standard shown post-checkout
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shippingCost + tax;

    return (
        <>
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
                            <Row label="Subtotal" value={currency(subtotal)} />
                            <Row label="Shipping" value={currency(shippingCost)} />
                            <Row label="Tax" value={currency(tax)} />
                        </div>
                        <div className="mt-3 border-t pt-3 flex items-center justify-between text-base font-bold">
                            <span>Total</span><span>{currency(total)}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/buyer/orders" className="inline-flex justify-center px-5 py-2.5 rounded-md bg-gray-900 text-white hover:bg-black">
                            View Orders
                        </Link>
                        <Link to="/buyer/BuyerMarketPlace" className="inline-flex justify-center px-5 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
