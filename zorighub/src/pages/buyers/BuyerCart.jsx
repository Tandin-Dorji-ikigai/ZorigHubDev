import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BuyerNav from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import { FaMinus, FaPlus, FaTrashAlt, FaArrowLeft, FaLock } from "react-icons/fa";
import { getMe } from "@/lib/apiMe";
import { getCart, addItem as apiAddItem, removeItem as apiRemoveItem, emptyCart as apiEmptyCart } from "@/lib/cartApi";

const currency = (nu) => `Nu. ${Number(nu || 0).toLocaleString()}`;
const PLACEHOLDER_IMG = "https://via.placeholder.com/300x300?text=Product";

const confirmAction = async (message) => {
    return window.confirm(message);
};

function mapCartItem(it) {
    // The product might be in different places/shapes
    const rawProd = it?.product ?? it?.productId ?? null;

    // Determine if we have a populated product object
    const prodObj = rawProd && typeof rawProd === "object" ? rawProd : null;

    console.log("Mapping cart item:", it, "->", prodObj);
    // Resolve a stable product id string
    let id = "";
    if (prodObj) {
        id = String(prodObj._id ?? prodObj.id ?? "");
    } else if (typeof rawProd === "string") {
        id = rawProd;
    }
    // Last-chance fallbacks (avoid crashing if backend sends weird shapes)
    if (!id) {
        id = String(it?.productId ?? it?.id ?? it?._id ?? "");
    }
    if (!id) {
        // If we STILL can't get an id, skip this cart line
        return null;
    }

    // Title / pricing / qty
    const title = prodObj?.name ?? prodObj?.title ?? "Product";
    const price = Number(it?.price ?? prodObj?.price ?? 0);
    const qty = Number(it?.quantity ?? 1);

    // Image normalization (pick the first available)
    const images = Array.isArray(prodObj?.images)
        ? prodObj.images
        : prodObj?.image
            ? [prodObj.image]
            : [];
    const img = images[0] || PLACEHOLDER_IMG;

    // Optional meta
    const artisan =
        prodObj?.seller?.fullName ||
        prodObj?.seller?.name ||
        prodObj?.artisan ||
        "Artisan";
    const variant = prodObj?.variant || "";

    return { id, title, variant, price, qty, img, artisan };
}

/** Maps a whole cart safely */
function mapCart(cart) {
    const list = (cart?.items || []).map(mapCartItem).filter(Boolean);
    return list;
}



export default function BuyerCart() {
    const [me, setMe] = useState(null);
    const [items, setItems] = useState([]);
    const [promo, setPromo] = useState("");
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    // load me + cart
    useEffect(() => {
        let cancel = false;
        (async () => {
            try {
                setLoading(true);
                setErr("");
                const user = await getMe();
                if (!user) {
                    if (!cancel) {
                        setMe(null);
                        setItems([]);
                        setErr("Please log in to view your cart.");
                    }
                    return;
                }
                if (!cancel) setMe(user.user);

                const userId = user.user?._id || user.user?.id || user.user?.userId;
                const cart = await getCart(userId).catch(() => null);

                if (!cancel) {
                    const mapped = mapCart(cart);
                    setItems(mapped);
                }
            } catch (e) {
                if (!cancel) {
                    console.error(e);
                    setErr("Failed to load cart.");
                    setItems([]);
                }
            } finally {
                if (!cancel) setLoading(false);
            }
        })();
        return () => { cancel = true; };
    }, []);

    const subtotal = useMemo(() => items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0), [items]);
    const shipping = items.length ? 500 : 0;
    const tax = Math.round(subtotal * 0.1);
    const discount = useMemo(() => (appliedPromo ? Math.round((subtotal * appliedPromo.discountPct) / 100) : 0), [appliedPromo, subtotal]);
    const total = Math.max(subtotal + shipping + tax - discount, 0);

    // --- server-backed actions ---
    const refreshFromServer = async () => {
        if (!me) return;
        const userId = me?._id || me?.id || me?.userId;
        const cart = await getCart(userId).catch(() => null);
        setItems(mapCart(cart));
    };

    const updateQty = async (productId, delta) => {
        if (!me) return alert("Please log in.");
        const item = items.find((x) => x.id === productId);
        if (!item) return;

        const actionText =
            delta > 0
                ? `increase quantity of "${item.title}" to ${item.qty + 1}`
                : item.qty + delta <= 0
                    ? `remove "${item.title}" from your cart`
                    : `decrease quantity of "${item.title}" to ${item.qty - 1}`;

        const ok = await confirmAction(`Are you sure you want to ${actionText}?`);
        if (!ok) return;

        try {
            const userId = me?._id || me?.id || me?.userId;
            if (item.qty + delta <= 0) {
                await apiRemoveItem(userId, productId);
            } else {
                // delta is +1 or -1 to increment/decrement quantity
                await apiAddItem(userId, productId, delta, item.price);
            }
            await refreshFromServer();
        } catch (e) {
            console.error(e);
            alert("Failed to update quantity.");
        }
    };

    const removeItem = async (productId) => {
        if (!me) return alert("Please log in.");
        const item = items.find((x) => x.id === productId);
        const title = item?.title || "this item";

        const ok = await confirmAction(`Remove "${title}" from your cart?`);
        if (!ok) return;

        try {
            await apiRemoveItem(me?._id || me?.id || me?.userId, productId);
            await refreshFromServer();
        } catch (e) {
            console.error(e);
            alert("Failed to remove item.");
        }
    };

    const emptyCartNow = async () => {
        if (!me) return alert("Please log in.");
        if (!items.length) return;

        const ok = await confirmAction(
            `Empty your cart? This will remove ${items.length} ${items.length === 1 ? "item" : "items"
            }.`
        );
        if (!ok) return;

        try {
            await apiEmptyCart(me?._id || me?.id || me?.userId);
            await refreshFromServer();
        } catch (e) {
            console.error(e);
            alert("Failed to empty cart.");
        }
    };

    const applyPromo = async () => {
        const code = promo.trim().toUpperCase();
        if (!code) return;

        if (appliedPromo && appliedPromo.code !== code) {
            const ok = await confirmAction(
                `Replace promo "${appliedPromo.code}" with "${code}"?`
            );
            if (!ok) return;
        }

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
                {loading ? (
                    <div className="text-gray-600">Loading your cart…</div>
                ) : err ? (
                    <div className="text-red-600">{err}</div>
                ) : (
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
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <Link to="/buyer/BuyerMarketPlace" className="text-red-600 hover:underline inline-flex items-center gap-2">
                                                <FaArrowLeft />
                                                Continue Shopping
                                            </Link>
                                            <button onClick={emptyCartNow} className="text-gray-600 hover:underline">
                                                Refresh
                                            </button>
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
                                                                {it.variant || "—"} {it.artisan ? `• Artisan: ${it.artisan}` : ""}
                                                            </p>
                                                            <div className="mt-3 flex items-center gap-3">
                                                                <div className="inline-flex items-center rounded-lg border border-gray-300">
                                                                    <button aria-label="decrease" onClick={() => updateQty(it.id, -1)} className="px-2 py-1 hover:bg-gray-50">
                                                                        <FaMinus />
                                                                    </button>
                                                                    <span className="px-3">{it.qty}</span>
                                                                    <button aria-label="increase" onClick={() => updateQty(it.id, 1)} className="px-2 py-1 hover:bg-gray-50">
                                                                        <FaPlus />
                                                                    </button>
                                                                </div>
                                                                <button onClick={() => removeItem(it.id)} className="inline-flex items-center gap-2 text-red-600 hover:underline">
                                                                    <FaTrashAlt />
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm text-gray-500">Price</div>
                                                            <div className="font-semibold">{currency(it.price)}</div>
                                                            <div className="mt-1 text-sm text-gray-500">Subtotal</div>
                                                            <div className="font-semibold">{currency(it.price * it.qty)}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Mobile cards */}
                                        <div className="md:hidden space-y-4">
                                            {items.map((it) => (
                                                <div key={it.id} className="rounded-xl border border-gray-200 p-4 shadow-sm">
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
                                                                {it.variant || "—"} {it.artisan ? `• ${it.artisan}` : ""}
                                                            </p>
                                                            <div className="mt-3 flex items-center gap-3">
                                                                <div className="inline-flex items-center rounded-lg border border-gray-300">
                                                                    <button aria-label="decrease" onClick={() => updateQty(it.id, -1)} className="px-2 py-1 hover:bg-gray-50">
                                                                        <FaMinus />
                                                                    </button>
                                                                    <span className="px-3">{it.qty}</span>
                                                                    <button aria-label="increase" onClick={() => updateQty(it.id, 1)} className="px-2 py-1 hover:bg-gray-50">
                                                                        <FaPlus />
                                                                    </button>
                                                                </div>
                                                                <button onClick={() => removeItem(it.id)} className="inline-flex items-center gap-2 text-red-600 hover:underline">
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
                                                        <span className="font-semibold">{currency(it.price * it.qty)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer actions */}
                                        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                                            <Link to="/buyer/BuyerMarketPlace" className="text-red-600 hover:underline flex items-center">
                                                <FaArrowLeft className="mr-2" />
                                                Continue Shopping
                                            </Link>
                                            <button onClick={emptyCartNow} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
                                                Empty Cart
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Promo Code */}
                            {items.length > 0 && (
                                <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Have a Promo Code?</h3>
                                    <div className="flex">
                                        <input
                                            value={promo}
                                            onChange={(e) => setPromo(e.target.value)}
                                            type="text"
                                            placeholder="Enter promo code (try ZORIG10)"
                                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                        />
                                        <button onClick={() => {
                                            if (!me) return alert("Please log in.");
                                            applyPromo();
                                        }} className="bg-red-600 text-white px-6 py-2 rounded-r-md hover:bg-red-700">
                                            Apply
                                        </button>
                                    </div>
                                    {appliedPromo && (
                                        <p className="mt-2 text-sm text-green-700">
                                            Applied <strong>{appliedPromo.code}</strong> — {appliedPromo.discountPct}% off
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
                                    className={`w-full block text-center py-3 rounded-md font-bold mb-4 ${items.length ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        }`}
                                    aria-disabled={!items.length}
                                    onClick={(e) => { if (!items.length) e.preventDefault(); }}
                                >
                                    Buy Product
                                </Link>
                                <p className="text-sm text-gray-500 text-center">
                                    <FaLock className="inline mr-1" /> Secure checkout
                                </p>
                            </div>
                        </aside>
                    </div>
                )}
            </main>

            <BuyerFooter />
        </div>
    );
}
