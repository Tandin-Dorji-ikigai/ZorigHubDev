// src/pages/buyer/BuyerMarketPlace.jsx
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import BuyerHeader from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import ImageF from "@/assets/images/crafts/scarf.jpg";
import { useNavigate } from "react-router-dom";
import { getMe } from "@/lib/apiMe";
import MarketplaceSkeleton from "@/components/buyer/MarketplaceSkeleton";

const PAGE_SIZE = 12;
const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

/* ---------- Card ---------- */
const ProductCard = ({ p, onAddToCart, onQuickView }) => (
    <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
        <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <div className="flex items-start justify-between">
                <h3 className="text-[18px] font-semibold text-[#1C2733] leading-snug">{p.title}</h3>
                <span className="text-red-600 font-extrabold whitespace-nowrap">
                    Nu. {Number(p.price || 0).toLocaleString()}
                </span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{p.desc || "This is a handmade item"}</p>
            <p className="text-sm text-gray-700 mt-2 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-red-500" />
                <span className="font-medium">{p.artisan}</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-600">{p.region}</span>
            </p>
            <div className="mt-3 flex items-center justify-between">
                <button
                    onClick={() => onAddToCart?.(p)}
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition text-sm font-semibold"
                >
                    <i className="fa-solid fa-cart-shopping" />
                    Add to Cart
                </button>
                <button
                    onClick={() => onQuickView?.(p)}
                    className="text-sm text-gray-600 hover:text-gray-800 inline-flex items-center gap-2"
                >
                    <i className="fa-solid fa-eye" />
                    Quick View
                </button>
            </div>
        </div>
    </article>
);

function BuyerMarketPlace() {
    const navigate = useNavigate();

    // logged user data
    const [me, setMe] = useState(null);

    useEffect(() => {
        let cancel = false;
        (async () => {
            const user = await getMe().catch(() => null);
            if (!cancel) setMe(user?.user || null);
        })();
        return () => { cancel = true; };
    }, []);

    const handleAddToCart = async (product, qty = 1) => {
        try {
            if (!me?._id && !me?.id && !me?.userId) {
                alert("Please log in first.");
                return;
            }
            const userId = me?._id || me?.id || me?.userId;

            const ok = window.confirm(`Add "${product.title}" (Nu. ${product.price}) to your cart?`);
            if (!ok) return;

            await axios.post(
                `${API_BASE}/api/carts/add-item`,
                { userId, productId: product.id, quantity: qty, price: product.price },
                { withCredentials: true }
            );

            alert("Added to cart ✅");
            window.dispatchEvent(new Event("cart:updated"));
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart. Please try again.");
        }
    };

    const handleQuickView = (product) => {
        navigate(`/buyer/productDetails/${product.id}`, { state: { product } });
    };

    /* ---------- Load products ---------- */
    const [rawProducts, setRawProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    /* ---------- Load categories ---------- */
    const [categories, setCategories] = useState([]); // names only
    const [catLoading, setCatLoading] = useState(true);
    const [catError, setCatError] = useState("");

    useEffect(() => {
        let cancel = false;
        (async () => {
            setLoading(true);
            setLoadError("");
            try {
                const { data } = await axios.get(`${API_BASE}/api/products`, { withCredentials: true });
                if (cancel) return;

                const mapped = (Array.isArray(data) ? data : []).map((doc) => {
                    const images = Array.isArray(doc.images) && doc.images.length
                        ? doc.images
                        : (doc.image ? [doc.image] : []);
                    const firstImage = images[0] || ImageF;

                    const seller = doc.seller || doc.userId || {};
                    const category = doc.category || doc.categoryId || {};

                    return {
                        id: doc._id,
                        title: doc.name || "Untitled",
                        desc: doc.description || "",
                        artisan: seller?.fullName || seller?.name || "Artisan",
                        region: seller?.dzongkhag || seller?.region || "Bhutan",
                        category: category?.name || (typeof category === "string" ? category : "Uncategorized"),
                        price: Number(doc.price) || 0,
                        rating: Number(doc.rating) || 0,
                        eco: !!doc.eco,
                        createdAt: doc.createdAt || doc.updatedAt || new Date().toISOString(),
                        popularity: Number(doc.popularity) || 0,
                        img: firstImage || ImageF,
                        images: images.length ? images : [ImageF],
                    };
                });

                setRawProducts(mapped);
            } catch (e) {
                console.error(e);
                setLoadError("Failed to load products.");
                setRawProducts([]);
            } finally {
                if (!cancel) setLoading(false);
            }
        })();
        return () => { cancel = true; };
    }, []);

    useEffect(() => {
        let cancel = false;
        (async () => {
            setCatLoading(true);
            setCatError("");
            try {
                const { data } = await axios.get(`${API_BASE}/api/categories`, { withCredentials: true });
                if (cancel) return;

                const names = (Array.isArray(data) ? data : [])
                    .map((c) => c?.name)
                    .filter(Boolean)
                    .sort((a, b) => a.localeCompare(b));

                setCategories(names);
            } catch (e) {
                console.error(e);
                setCatError("Failed to load categories.");
                setCategories([]);
            } finally {
                if (!cancel) setCatLoading(false);
            }
        })();
        return () => { cancel = true; };
    }, []);

    /* ---------- Derived ---------- */
    const derivedCategories = useMemo(
        () => Array.from(new Set(rawProducts.map((p) => p.category))).sort((a, b) => a.localeCompare(b)),
        [rawProducts]
    );
    const categoriesForUI = categories.length ? categories : derivedCategories;

    const regions = useMemo(
        () => Array.from(new Set(rawProducts.map((p) => p.region))).sort((a, b) => a.localeCompare(b)),
        [rawProducts]
    );
    const artisans = useMemo(
        () => Array.from(new Set(rawProducts.map((p) => p.artisan))).sort((a, b) => a.localeCompare(b)),
        [rawProducts]
    );

    /* ---------- UI state ---------- */
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCommit, setSearchCommit] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedArtisan, setSelectedArtisan] = useState("all");
    const [maxPrice, setMaxPrice] = useState(10000);
    const [ecoOnly, setEcoOnly] = useState(false);
    const [sortBy, setSortBy] = useState("popular");
    const [visible, setVisible] = useState(PAGE_SIZE);

    /* ---------- Filtering + sorting ---------- */
    const filteredSorted = useMemo(() => {
        const term = searchCommit.trim().toLowerCase();
        let list = rawProducts.filter((p) => {
            const matchesTerm =
                term.length === 0 ||
                p.title.toLowerCase().includes(term) ||
                p.artisan.toLowerCase().includes(term);
            const catOK = selectedCategory === "all" || p.category === selectedCategory;
            const regOK = selectedRegion === "all" || p.region === selectedRegion;
            const artOK = selectedArtisan === "all" || p.artisan === selectedArtisan;
            const priceOK = Number(p.price) <= maxPrice;
            const ecoOK = !ecoOnly || p.eco;
            return matchesTerm && catOK && regOK && artOK && priceOK && ecoOK;
        });

        switch (sortBy) {
            case "newest":
                list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
                break;
            case "price-low":
                list.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                list.sort((a, b) => b.price - a.price);
                break;
            default:
                list.sort((a, b) => b.popularity - a.popularity);
        }
        return list;
    }, [rawProducts, selectedCategory, selectedRegion, selectedArtisan, maxPrice, ecoOnly, sortBy, searchCommit]);

    useEffect(
        () => setVisible(PAGE_SIZE),
        [selectedCategory, selectedRegion, selectedArtisan, maxPrice, ecoOnly, sortBy, searchCommit]
    );

    const shown = filteredSorted.slice(0, visible);
    const canLoadMore = visible < filteredSorted.length;

    const resetAll = () => {
        setSearchTerm("");
        setSearchCommit("");
        setSelectedCategory("all");
        setSelectedRegion("all");
        setSelectedArtisan("all");
        setMaxPrice(10000);
        setEcoOnly(false);
        setSortBy("popular");
    };

    const runSearch = () => setSearchCommit(searchTerm);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <BuyerHeader />

            <div className="container mx-auto px-4 py-8 flex-1">
                {loading ? (
                    <MarketplaceSkeleton cards={12} />
                ) : (
                    <div className="flex flex-col md:flex-row">
                        {/* -------- Sidebar -------- */}
                        <aside className="w-full md:w-72 flex-shrink-0 mr-0 md:mr-8 mb-8 md:mb-0">
                            <div className="bg-white rounded-2xl shadow-sm sticky top-4 overflow-hidden">
                                {/* Pretty header */}
                                <div className="bg-gradient-to-r from-red-50 to-white px-6 py-5 border-b">
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-extrabold text-lg text-[#1C2733] flex items-center gap-2">
                                            <span className="inline-flex w-2 h-2 rounded-full bg-red-600" />
                                            Filters
                                        </h2>
                                        <button onClick={resetAll} className="text-sm text-red-600 hover:underline">
                                            Reset all
                                        </button>
                                    </div>

                                    {/* Search bar */}
                                    <div className="mt-4 flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                                                type="text"
                                                placeholder="Search title or artisan"
                                                className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                            />
                                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
                                        </div>
                                        <button
                                            onClick={runSearch}
                                            className="whitespace-nowrap px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>

                                {/* Sections */}
                                <div className="p-6 space-y-6">
                                    {/* Category chips */}
                                    <div className="bg-gray-50 border rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <i className="fa-solid fa-shapes text-red-600" /> Craft Category
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => setSelectedCategory("all")}
                                                className={`px-3 py-1.5 rounded-full text-sm border transition ${selectedCategory === "all"
                                                        ? "bg-red-600 text-white border-red-600"
                                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                                    }`}
                                            >
                                                All
                                            </button>

                                            {(categoriesForUI.length ? categoriesForUI : []).map((c) => (
                                                <button
                                                    key={c}
                                                    onClick={() => setSelectedCategory(c)}
                                                    className={`px-3 py-1.5 rounded-full text-sm border transition ${selectedCategory === c
                                                            ? "bg-red-600 text-white border-red-600"
                                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {c}
                                                </button>
                                            ))}

                                            {/* Tiny status text */}
                                            <div className="w-full text-xs text-gray-400 mt-2">
                                                {catLoading
                                                    ? "Loading categories…"
                                                    : catError
                                                        ? catError
                                                        : categories.length === 0
                                                            ? "Showing categories from products"
                                                            : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Region */}
                                    <div className="bg-gray-50 border rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <i className="fa-solid fa-map-location-dot text-red-600" /> Region
                                        </h3>
                                        <select
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        >
                                            <option value="all">All Regions</option>
                                            {regions.map((r) => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price */}
                                    <div className="bg-gray-50 border rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <i className="fa-solid fa-tags text-red-600" /> Price Range
                                        </h3>
                                        <div className="flex justify-between mb-2 text-sm">
                                            <span>Nu. 100</span>
                                            <span>Nu. {maxPrice.toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="100"
                                            max="10000"
                                            value={maxPrice}
                                            step="100"
                                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Min</span><span>Max</span>
                                        </div>
                                    </div>

                                    {/* Artisan */}
                                    <div className="bg-gray-50 border rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <i className="fa-solid fa-user-pen text-red-600" /> Artisan
                                        </h3>
                                        <select
                                            value={selectedArtisan}
                                            onChange={(e) => setSelectedArtisan(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                        >
                                            <option value="all">All Artisans</option>
                                            {artisans.map((a) => (
                                                <option key={a} value={a}>{a}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Eco toggle + Apply */}
                                    <div className="bg-gray-50 border rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Eco-friendly Only</h3>
                                                <p className="text-xs text-gray-500">Sustainable materials & processes</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={ecoOnly}
                                                    onChange={(e) => setEcoOnly(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
                                            </label>
                                        </div>

                                        <button
                                            onClick={() => setVisible(PAGE_SIZE)}
                                            className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* -------- Main column -------- */}
                        <main className="flex-1">
                            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <p className="text-gray-600 mb-2 sm:mb-0">
                                    {loadError
                                        ? loadError
                                        : `Showing ${shown.length} of ${filteredSorted.length} products`}
                                </p>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="newest">Newest</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {shown.map((p) => (
                                    <ProductCard
                                        key={p.id}
                                        p={p}
                                        onAddToCart={(item) => handleAddToCart(item, 1)}
                                        onQuickView={(item) => handleQuickView(item)}
                                    />
                                ))}

                                {shown.length === 0 && (
                                    <div className="col-span-full text-center text-gray-500 py-10">
                                        No products match your filters.
                                    </div>
                                )}
                            </div>

                            {/* Load more */}
                            <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center">
                                    <div>
                                        {canLoadMore ? (
                                            <button
                                                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                                            >
                                                Load More Products
                                            </button>
                                        ) : (
                                            <span className="text-gray-500">No more products</span>
                                        )}
                                    </div>
                                    <div className="hidden md:block">
                                        <nav className="flex items-center space-x-1">
                                            <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-800 hover:bg-red-600 hover:text-white">
                                                <i className="fas fa-chevron-left" />
                                            </button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-md bg-red-600 text-white">1</button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">2</button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">3</button>
                                            <span className="px-2">...</span>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">8</button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-800 hover:bg-red-600 hover:text-white">
                                                <i className="fas fa-chevron-right" />
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}
            </div>

            {/* Newsletter */}
            <section className="bg-white py-12 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Community</h2>
                        <p className="text-gray-600 mb-6">
                            Subscribe to receive updates on new artisan products, special offers, and cultural stories from Bhutan.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                            />
                            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <BuyerFooter />
        </div>
    );
}

export default BuyerMarketPlace;
