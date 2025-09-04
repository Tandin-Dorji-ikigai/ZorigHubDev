// src/pages/buyer/BuyerProductDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import BuyerNav from "../../components/buyer/BuyerNav";
import BuyerFooter from "../../components/buyer/BuyerFooter";
import ImageF from "../../assets/images/crafts/scarf.jpg";
import { getMe } from "@/lib/apiMe";

const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

function BuyerProductDetails() {
    const { state } = useLocation();
    const { id } = useParams();
    const [me, setMe] = useState(null);

    // product state
    const [product, setProduct] = useState(state?.product || null);
    const [loading, setLoading] = useState(!state?.product);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancel = false;
        (async () => {
            const user = await getMe();
            if (!cancel) setMe(user.user);
        })();
        return () => {
            cancel = true;
        };
    }, []);

    const handleAddToCart = async (product) => {
        try {
            if (!me?._id && !me?.id && !me?.userId) {
                alert("Please log in first.");
                return;
            }
            const userId = me?._id || me?.id || me?.userId;

            const ok = window.confirm(
                `Add "${product.title}" (Nu. ${product.price}) to your cart?`
            );
            if (!ok) return;

            await axios.post(
                `${API_BASE}/api/carts/add-item`,
                {
                    userId,
                    productId: product.id,
                    quantity: 1, // fixed at one
                    price: product.price,
                },
                { withCredentials: true }
            );

            alert("Added to cart ✅");
            window.dispatchEvent(new Event("cart:updated"));
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart. Please try again.");
        }
    };

    // tabs state
    const [activeTab, setActiveTab] = useState("description");

    // Fallback fetch if product not in state (e.g., hard refresh or direct open)
    useEffect(() => {
        if (product || !id) return;
        let cancel = false;

        (async () => {
            try {
                setLoading(true);
                setError("");
                const { data } = await axios.get(`${API_BASE}/api/products/${id}`, {
                    withCredentials: true,
                });
                if (cancel) return;

                const firstImage = Array.isArray(data.images) ? data.images[0] : data.image;
                const seller = data.seller || data.userId || {};
                const category = data.category || data.categoryId || {};
                const mapped = {
                    id: data._id,
                    title: data.name || "Untitled",
                    artisan: seller?.fullName || seller?.name || "Artisan",
                    category:
                        category?.name ||
                        (typeof category === "string" ? category : "Uncategorized"),
                    region: seller?.dzongkhag || seller?.region || "Bhutan",
                    price: Number(data.price) || 0,
                    rating: Number(data.rating) || 0,
                    eco: !!data.eco,
                    createdAt: data.createdAt || data.updatedAt || new Date().toISOString(),
                    popularity: Number(data.popularity) || 0,
                    img: firstImage || ImageF,
                    images: Array.isArray(data.images)
                        ? data.images
                        : firstImage
                            ? [firstImage]
                            : [ImageF],
                    desc: data.description || "",
                };
                setProduct(mapped);
            } catch (e) {
                console.error(e);
                setError("Unable to load this product.");
            } finally {
                if (!cancel) setLoading(false);
            }
        })();

        return () => {
            cancel = true;
        };
    }, [id, product]);

    // Images helper: normalize shapes + de-dupe
    const images = useMemo(() => {
        if (!product) return [ImageF];

        const raw =
            Array.isArray(product.images) && product.images.length
                ? product.images
                : product?.img
                    ? [product.img]
                    : [ImageF];

        const urls = raw
            .map((it) => {
                if (typeof it === "string") return it;
                if (it && typeof it === "object") {
                    return it.url || it.secure_url || it.src || it.path || it.image || it.href || "";
                }
                return "";
            })
            .filter(Boolean);

        const seen = new Set();
        const unique = [];
        for (const u of urls) {
            if (!seen.has(u)) {
                seen.add(u);
                unique.push(u);
            }
        }
        return unique.length ? unique : [ImageF];
    }, [product]);

    const [mainImage, setMainImage] = useState(images[0]);
    useEffect(() => {
        setMainImage(images[0]);
    }, [images]);

    // Lightbox
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // dummy reviews (used in Reviews tab)
    const dummyReviews = [
        {
            name: "Tashi Dorji",
            date: "2 weeks ago",
            rating: 5,
            comment:
                "The craftsmanship on this item is exceptional. You can feel the tradition in every thread.",
            image: ImageF,
        },
        {
            name: "Jigme Johnson",
            date: "1 month ago",
            rating: 5,
            comment:
                "Bought as a gift—quality is outstanding and the artisan’s story makes it even more special.",
        },
    ];

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <BuyerNav />
                <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">Loading…</main>
                <BuyerFooter />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <BuyerNav />
                <main className="max-w-7xl mx-auto px-4 py-8 flex-grow text-red-600">
                    {error || "Product not found."}
                </main>
                <BuyerFooter />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <BuyerNav />
            <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-bhutan-red">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <Link to="/buyer/marketplace" className="hover:text-bhutan-red">
                        Marketplace
                    </Link>
                    <span className="mx-2">/</span>
                    <span>{product.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Images */}
                    <div className="lg:w-1/2">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full rounded-lg border cursor-zoom-in"
                            onClick={() => setLightboxOpen(true)}
                        />
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                            {images.map((src, i) => (
                                <button
                                    type="button"
                                    key={`${src}-${i}`}
                                    onClick={() => setMainImage(src)}
                                    className={`flex-shrink-0 rounded border ${src === mainImage
                                        ? "ring-2 ring-red-500 border-red-500"
                                        : "border-gray-200 hover:border-red-400"
                                        }`}
                                    title={`Image ${i + 1}`}
                                >
                                    <img
                                        src={src}
                                        alt={`Thumb ${i + 1}`}
                                        className="w-20 h-20 object-cover rounded"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-md border">
                        <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h1>

                        <div className="flex items-center text-yellow-400 mb-3">
                            {[...Array(Math.floor(product.rating || 4))].map((_, i) => (
                                <i key={i} className="fas fa-star" />
                            ))}
                            {(product.rating || 4) % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                            <span className="text-sm text-gray-600 ml-2">
                                ({Math.max(1, Math.round(product.popularity || 24))} reviews)
                            </span>
                        </div>

                        <p className="text-3xl font-extrabold tracking-wide text-gray-900 mb-2">
                            Nu. {Number(product.price).toLocaleString()}{" "}
                            <span className="text-gray-400 text-base font-medium">
                                (~${Math.round(product.price / 84)})
                            </span>
                        </p>

                        <p className="text-green-600 font-semibold mb-3">In Stock</p>

                        <p className="text-gray-700 mb-6">
                            {product.desc || "Beautiful artisan craft from Bhutan."}
                        </p>

                        {/* Quantity (fixed at 1, Tailwind reds) */}
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-800">Quantity</label>

                            <div className="flex items-center justify-between gap-3 rounded-2xl border
                  bg-white shadow-sm px-4 py-3
                  border-red-200 bg-red-50">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                   bg-red-100 text-red-600"
                                        aria-hidden
                                    >
                                        <i className="fas fa-box-open" />
                                    </span>
                                    <div className="leading-tight">
                                        <div className="text-sm font-semibold text-gray-900">This item</div>
                                        <div className="text-[12px] text-gray-500">
                                            Fixed purchase quantity
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="inline-flex items-center rounded-xl border border-red-300
                 bg-white px-4 py-2 text-red-600 font-semibold shadow-sm
                 select-none"
                                    title="Quantity is fixed to one"
                                >
                                    Qty&nbsp;:&nbsp;<span className="ml-1 tabular-nums">1</span>
                                </div>
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                Quantity is set by the seller for this craft.
                            </p>
                        </div>


                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2 text-sm font-semibold"
                            >
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button className="flex-1 border-2 border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 text-sm font-semibold">
                                Buy Now
                            </button>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <i className="fas fa-location-dot text-red-600 mt-1"></i>
                                <span>
                                    {product.artisan} — {product.region}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-leaf text-red-600 mt-1"></i>
                                <span>{product.eco ? "Eco-friendly materials" : "Traditional craft"}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-12 border-b flex space-x-8">
                    {["description", "details", "reviews"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab ? "border-bhutan-red text-bhutan-red" : "border-transparent text-gray-500"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="bg-white p-6 border rounded-b">
                    {activeTab === "description" && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">About This Product</h3>
                            <p className="text-gray-700 mb-4">
                                {product.desc ||
                                    "Handcrafted by Bhutanese artisans using time-honored techniques and locally sourced materials."}
                            </p>
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Materials</h4>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Locally sourced materials</li>
                                    <li>Traditional workmanship</li>
                                    <li>Eco-conscious process</li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Care Instructions</h4>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Hand wash in cold water with mild detergent</li>
                                    <li>Lay flat to dry</li>
                                    <li>Iron on low heat if needed</li>
                                    <li>Store folded in a dry place</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === "details" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Dimensions</h4>
                                <p>See product description</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Weight</h4>
                                <p>See product description</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Technique</h4>
                                <p>Traditional handcrafting</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["Handmade", "Eco-Friendly", "Traditional", "Bhutanese"].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-full shadow-sm border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div>
                            {dummyReviews.map((review, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <i key={i} className="fas fa-star" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{review.name}</span>
                                        <span className="text-sm text-gray-500 ml-2">• {review.date}</span>
                                    </div>
                                    <p className="text-gray-700 mb-2">{review.comment}</p>
                                    {review.image && (
                                        <img
                                            src={review.image}
                                            alt="Review"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Optional full gallery grid */}
                <section className="mt-10">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {images.map((src, i) => (
                            <button
                                type="button"
                                key={`grid-${src}-${i}`}
                                onClick={() => setMainImage(src)}
                                className="rounded overflow-hidden border hover:shadow"
                            >
                                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-40 object-cover" loading="lazy" />
                            </button>
                        ))}
                    </div>
                </section>
            </main>

            <BuyerFooter />

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <img
                        src={mainImage}
                        alt="Full size"
                        className="max-h-[90vh] max-w-[90vw] rounded shadow-lg cursor-zoom-out"
                    />
                </div>
            )}
        </div>
    );
}

export default BuyerProductDetails;
