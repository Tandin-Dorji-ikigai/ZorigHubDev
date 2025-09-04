import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ArtisanLayout from '@/components/artisans/ArtisanLayout';
import AddProductModal from "@/components/artisans/AddProductModal";

const DEV_USER_KEY = "zorighub_dev_user";
const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

function ArtisanHome() {
    const [modalOpen, setModalOpen] = useState(false);

    // ---- user ----
    const currentUser = useMemo(() => {
        try {
            const raw = localStorage.getItem(DEV_USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }, []);
    const userId = currentUser?._id || "685d32e7772899830701a9ac"; // fallback to your test user
    const displayName = currentUser?.fullName || "Artisan";

    // ---- products state ----
    const [products, setProducts] = useState([]);
    const [prodLoading, setProdLoading] = useState(false);
    const [prodError, setProdError] = useState("");

    const fetchProducts = async () => {
        if (!userId) return;
        setProdLoading(true);
        setProdError("");
        try {
            const { data } = await axios.get(`${API_BASE}/api/products/artisan/${userId}`, {
                withCredentials: true,
            });
            setProducts(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            setProdError("Failed to load your products.");
            setProducts([]);
        } finally {
            setProdLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [userId]);

    const refreshProducts = () => {
        fetchProducts();
    };

    // derived
    const totalProducts = prodLoading ? "…" : products.length;

    return (
        <ArtisanLayout>
            <div className="space-y-6">

                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Welcome back, {displayName.split(" ")[0]}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Here's what's happening with your business today
                            </p>
                            {prodError && (
                                <p className="text-sm text-red-600 mt-2">{prodError}</p>
                            )}
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <button
                                onClick={() => setModalOpen(true)}
                                className="flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-rose-100 transition"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                <span>Add New Product</span>
                            </button>

                            <a
                                href="/artisan/orders"
                                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                <i className="fas fa-shopping-bag mr-2"></i>
                                <span>View Orders</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Add Product Modal */}
                <AddProductModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={() => {
                        setModalOpen(false);
                        refreshProducts();
                    }}
                />

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard
                        title="Total Products"
                        value={totalProducts}
                        icon="fas fa-tshirt"
                        iconBg="bg-red-100"
                        iconColor="text-red-500"
                        link="/artisan/products"
                        linkText="View all"
                    />
                    <StatCard
                        title="Pending Orders"
                        value="5"
                        icon="fas fa-lock"
                        iconBg="bg-blue-100"
                        iconColor="text-blue-500"
                        link="/artisan/orders"
                        linkText="Manage orders"
                    />
                    <StatCard
                        title="Total Earnings"
                        value="Nu. 42,500"
                        icon="fas fa-rupee-sign"
                        iconBg="bg-green-100"
                        iconColor="text-green-500"
                        link="/artisan/earnings"
                        linkText="View details"
                    />
                    <StatCard
                        title="Eco Certification"
                        value={<span className="text-green-600 font-semibold">Verified</span>}
                        icon="fas fa-leaf"
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                        link="#"
                        linkText="Learn more"
                    />
                </div>

                {/* Recent Orders (static demo) */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
                    <div className="px-7 py-5 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
                            <a href="/artisan/orders" className="text-sm text-red-600 hover:underline">View all orders</a>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <OrderItem
                            img="/images/crafts/embroidery.jpg"
                            title="Traditional Kira"
                            orderId="ZH-45721"
                            date="Dec 12, 2025"
                            status="Pending"
                            amount="Nu. 3,800"
                            statusColor="bg-yellow-100 text-yellow-800"
                        />
                        <OrderItem
                            img="/images/crafts/weave.jpg"
                            title="Handwoven Bag"
                            orderId="ZH-45720"
                            date="Dec 10, 2025"
                            status="Shipped"
                            amount="Nu. 2,500"
                            statusColor="bg-green-100 text-green-800"
                        />
                        <OrderItem
                            img="/images/crafts/woodwork.jpg"
                            title="Wooden Bowl Set"
                            orderId="ZH-45718"
                            date="Dec 8, 2025"
                            status="Completed"
                            amount="Nu. 6,200"
                            statusColor="bg-blue-100 text-blue-800"
                        />
                    </div>
                </div>
            </div>
        </ArtisanLayout>
    );
}

const StatCard = ({ title, value, icon, iconBg, iconColor, link, linkText }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs font-medium text-gray-500 uppercase">{title}</p>
                <p className="text-2xl font-bold mt-2">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${iconBg}`}>
                <i className={`${icon} text-xl ${iconColor}`}></i>
            </div>
        </div>
        <div className="mt-6 border-t border-gray-100 pt-4 text-right">
            <a href={link} className="text-sm text-red-500 font-medium hover:underline">
                {linkText}
            </a>
        </div>
    </div>
);

const OrderItem = ({ img, title, orderId, date, status, amount, statusColor }) => (
    <div className="px-7 py-5 hover:bg-rose-100 transition">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={img} alt="Product" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">Order #{orderId} • {date}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-xs rounded-full ${statusColor}`}>{status}</span>
                <span className="font-medium">{amount}</span>
                <button className="p-2 text-gray-500 hover:text-red-600">
                    <i className="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    </div>
);

export default ArtisanHome;
