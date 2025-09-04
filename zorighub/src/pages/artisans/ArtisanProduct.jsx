// src/pages/ArtisanProduct.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ArtisanLayout from "@/components/artisans/ArtisanLayout";
import AddProductModal from "@/components/artisans/AddProductModal";

const DEV_USER_KEY = "zorighub_dev_user";
const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

function ArtisanProduct() {
    // modal
    const [modalOpen, setModalOpen] = useState(false);

    // user
    const currentUser = useMemo(() => {
        try {
            const raw = localStorage.getItem(DEV_USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }, []);
    const userId = currentUser?._id || "685d32e7772899830701a9ac"; // fallback to your test user

    // data
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    // UI state: search/filter/sort
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("all"); // all | active | soldout
    const [craft, setCraft] = useState("all");   // "all" or category name
    const [sortBy, setSortBy] = useState("none"); // none | priceAsc | priceDesc

    const fetchProducts = async () => {
        if (!userId) return;
        setLoading(true);
        setErr("");
        try {
            const { data } = await axios.get(`${API_BASE}/api/products/artisan/${userId}`, {
                withCredentials: true,
            });
            setProducts(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            setErr("Failed to load products.");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [userId]);

    // derive craft options from data (category?.name or categoryName field)
    const craftOptions = useMemo(() => {
        const set = new Set();
        products.forEach((p) => {
            const name = p?.category?.name || p?.categoryName;
            if (name) set.add(name);
        });
        return Array.from(set).sort();
    }, [products]);

    // client-side filter+search+sort
    const filtered = useMemo(() => {
        let list = [...products];

        // search by name/description
        const term = q.trim().toLowerCase();
        if (term) {
            list = list.filter((p) => {
                const name = (p.name || "").toLowerCase();
                const desc = (p.description || "").toLowerCase();
                const cat = (p?.category?.name || p?.categoryName || "").toLowerCase();
                return name.includes(term) || desc.includes(term) || cat.includes(term);
            });
        }

        // status
        if (status !== "all") {
            list = list.filter((p) => {
                const inStock = Number(p.stockQuantity || 0) > 0;
                if (status === "active") return inStock;
                if (status === "soldout") return !inStock;
                return true;
            });
        }

        // craft/category
        if (craft !== "all") {
            list = list.filter((p) => {
                const catName = p?.category?.name || p?.categoryName;
                return (catName || "").toLowerCase() === craft.toLowerCase();
            });
        }

        // sort
        if (sortBy === "priceAsc") {
            list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        } else if (sortBy === "priceDesc") {
            list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        }

        return list;
    }, [products, q, status, craft, sortBy]);

    const onAddSuccess = () => {
        setModalOpen(false);
        fetchProducts();
    };

    return (
        <ArtisanLayout>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Toolbar */}
                <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#FC2839] focus:border-transparent"
                                placeholder="Search products..."
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FC2839]"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="soldout">Sold Out</option>
                            </select>

                            <select
                                value={craft}
                                onChange={(e) => setCraft(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FC2839]"
                            >
                                <option value="all">All Crafts</option>
                                {craftOptions.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FC2839]"
                            >
                                <option value="none">Sort By</option>
                                <option value="priceAsc">Price: Low to High</option>
                                <option value="priceDesc">Price: High to Low</option>
                            </select>

                            {/* Add Product button (optional duplicate) */}
                            <button
                                onClick={() => setModalOpen(true)}
                                className="px-4 py-2 bg-[#FC2839] hover:bg-[#e01e2e] text-white font-medium rounded-lg transition-all"
                            >
                                + Add Product
                            </button>
                        </div>
                    </div>

                    {err && <p className="text-sm text-red-600 mt-3">{err}</p>}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="productCardContainer">
                    {loading ? (
                        // simple skeletons
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse min-h-[320px]">
                                <div className="h-40 bg-gray-200 rounded-lg mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                            </div>
                        ))
                    ) : filtered.length === 0 ? (
                        <div className="col-span-full">
                            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                                <p className="text-gray-600">No products found.</p>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="mt-4 bg-[#FC2839] hover:bg-[#e01e2e] text-white font-medium py-2 px-4 rounded-lg transition-all"
                                >
                                    Add your first product
                                </button>
                            </div>
                        </div>
                    ) : (
                        filtered.map((p) => <ProductCard key={p._id} product={p} />)
                    )}

                    {/* Add Product tile */}
                    <div
                        onClick={() => setModalOpen(true)}
                        className="bg-white bg-opacity-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-[#FC2839] hover:bg-opacity-30 cursor-pointer min-h-[400px]"
                    >
                        <div className="text-center p-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#FC2839] bg-opacity-10 text-[#FC2839] mb-4">
                                <i className="fas fa-plus"></i>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Add Product</h3>
                            <p className="text-sm text-gray-500">Showcase your craft to the world</p>
                            <button className="mt-4 bg-[#FC2839] hover:bg-[#e01e2e] text-white font-medium py-2 px-4 rounded-lg transition-all">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <AddProductModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={onAddSuccess}
                />
            </main>
        </ArtisanLayout>
    );
}

function ProductCard({ product }) {
    const {
        image,
        name,
        description,
        price,
        stockQuantity,
        category,
        categoryName,
        isActive,
    } = product;

    const inStock = Number(stockQuantity || 0) > 0;
    const statusColor = inStock
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-800";

    const craft = category?.name || categoryName || "Craft";

    // optional cloudinary-like fit if you ever switch providers:
    // const imgSrc = image?.replace("/upload/", "/upload/f_auto,q_auto,w_600,h_400,c_fill/") || "/images/placeholder.png";
    const imgSrc = image || "/images/placeholder.png";

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-50">
                <img
                    src={imgSrc}
                    alt={name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate mr-3">{name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>
                        {inStock ? "Active" : "Sold Out"}
                    </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-[#FC2839] font-semibold">Nu. {Number(price || 0).toLocaleString()}</span>
                    <span className="text-xs text-gray-500">
                        {craft} • Stock: {Number(stockQuantity || 0)}
                    </span>
                </div>
            </div>

            <div className="px-5 pb-5 flex items-center justify-between">
                <button className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">
                    Edit
                </button>
                <button className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">
                    View
                </button>
            </div>
        </div>
    );
}

export default ArtisanProduct;
