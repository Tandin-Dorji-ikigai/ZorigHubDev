// src/pages/buyer/Payment.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import BuyerHeader from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaymentSuccess from "@/components/buyer/PaymentSuccess";

const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";
const currency = (nu, sym = "Nu.") => `${sym} ${Number(nu || 0).toLocaleString()}`;

export default function Payment() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [paypalClientId, setPaypalClientId] = useState("");
  const [paid, setPaid] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const orderId =
    location.state?.orderId ||
    params.get("orderId") ||
    localStorage.getItem("zorig:lastOrderId") ||
    "";

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        if (!orderId) {
          setError("Missing order id. Please start checkout again.");
          return;
        }
        setLoading(true);

        // 1) Load order
        const { data: orderRes } = await axios.get(`${API_BASE}/api/orders/${orderId}`, { withCredentials: true });
        if (!cancel) {
          setOrder(orderRes);
          localStorage.setItem("zorig:lastOrderId", orderId);
        }

        // 2) Load PayPal client id (backend preferred)
        try {
          const { data: cid } = await axios.get(`${API_BASE}/api/config/paypal`, { withCredentials: true });
          console.log(cid)
          if (!cancel) setPaypalClientId((cid || import.meta.env.VITE_PAYPAL_CLIENT_ID || "").trim());
        } catch {
          if (!cancel) setPaypalClientId((import.meta.env.VITE_PAYPAL_CLIENT_ID || "").trim());
        }
      } catch (e) {
        if (!cancel) setError(e?.response?.data?.error || "Failed to load order.");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [orderId]);

  const items = useMemo(() => {
    const raw = order?.items || [];
    return raw.map((it, idx) => {
      const p = it.product || it.productId || {};
      const name = it.name || p?.name || `Item ${idx + 1}`;
      const qty = Number(it.quantity || it.qty || 1);
      const price = Number(it.price ?? p?.price ?? 0);
      return { name, qty, price };
    });
  }, [order]);

  const subtotal = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items]);
  const shipping = 500;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const isPending = order?.status?.toLowerCase() === "pending";

  const paypalOptions = useMemo(
    () => ({
      clientId: (paypalClientId || "").trim(),
      components: "buttons",
      currency: "USD",
      intent: "capture", // must be lowercase
      "data-sdk-integration-source": "react-paypal-js",
    }),
    [paypalClientId]
  );

  if (paid) {
    // Show success screen after capture
    return (
      <>
        <BuyerHeader />
        <PaymentSuccess orderId={orderId} subtotal={subtotal} />
        <BuyerFooter />
      </>
    );
  }

  return (
    <>
      <BuyerHeader />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6">
          <section className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Payment</h2>
                <span className="text-sm text-gray-500">Order ID: {orderId || "-"}</span>
              </div>

              {loading ? (
                <p className="mt-6 text-sm text-gray-500">Loading order…</p>
              ) : error ? (
                <p className="mt-6 text-sm text-red-600">{error}</p>
              ) : !order ? (
                <p className="mt-6 text-sm text-red-600">Order not found.</p>
              ) : !isPending ? (
                <div className="mt-6">
                  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                    <p className="text-sm text-amber-800">
                      This order is <b>{order.status}</b>. Payment is disabled.
                    </p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-950" to="/buyer/orders">
                      View Orders
                    </Link>
                    <Link className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50" to="/buyer/BuyerMarketPlace">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ) : !paypalOptions.clientId ? (
                <p className="mt-6 text-sm text-red-600">
                  PayPal client ID not configured. Set it in your backend <code>/api/config/paypal</code> or <code>VITE_PAYPAL_CLIENT_ID</code>.
                </p>
              ) : (
                <>
                  <p className="mt-4 text-sm text-gray-600">Click below to pay the total via PayPal.</p>

                  <div className="mt-4">
                    <PayPalScriptProvider key={paypalOptions.clientId} options={paypalOptions}>
                      <PayPalButtons
                        style={{ layout: "vertical", label: "pay", shape: "rect" }}
                        // 1) Ask your backend to create the PayPal order for THIS orderId
                        createOrder={async () => {
                          try {
                            const { data } = await axios.post(
                              `${API_BASE}/api/payments/paypal/create-order`,
                              { orderId },
                              { withCredentials: true }
                            );
                            if (!data?.id) throw new Error("No PayPal order id returned");
                            return data.id;
                          } catch (e) {
                            console.error("[PayPal] createOrder failed", e);
                            throw e;
                          }
                        }}
                        // 2) Capture on the server, then show success
                        onApprove={async (data) => {
                          try {
                            const { data: cap } = await axios.post(
                              `${API_BASE}/api/payments/paypal/capture/${data.orderID}`,
                              {},
                              { withCredentials: true }
                            );
                            console.log("[PayPal] capture result", cap);
                            setPaid(true);
                          } catch (e) {
                            console.error("[PayPal] capture failed", e);
                            alert("Capture failed. Please contact support.");
                          }
                        }}
                        onError={(err) => {
                          console.error("[PayPal] error", err);
                          alert("PayPal error. Please try again.");
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Right: Summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-slate-900">Order summary</h3>

              {loading ? (
                <p className="mt-4 text-sm text-gray-500">Loading items…</p>
              ) : (
                <>
                  <div className="mt-4 space-y-4">
                    {items.map((it, i) => (
                      <div key={i} className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{it.name}</p>
                          <p className="text-xs text-gray-500">Qty: {it.qty}</p>
                        </div>
                        <div className="text-sm font-semibold">{currency(it.price * it.qty)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2 text-sm">
                    <Row label="Subtotal" value={currency(subtotal)} />
                    <Row label="Shipping" value={currency(shipping)} />
                    <Row label="Tax" value={currency(tax)} />
                  </div>

                  <div className="mt-4 border-t pt-4 flex items-center justify-between text-base font-bold">
                    <span>Total</span>
                    <span>{currency(total)}</span>
                  </div>
                </>
              )}

              <p className="mt-6 text-xs text-gray-500">
                Need help? <Link to="/buyer/orders" className="underline">View your orders</Link>.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <BuyerFooter />
    </>
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
