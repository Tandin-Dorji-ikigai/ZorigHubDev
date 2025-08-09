// src/pages/ArtisanOrders.jsx
import React, { useEffect } from 'react';
import ArtisanLayout from '@/components/artisans/ArtisanLayout';

function ArtisanOrders() {
    useEffect(() => {
        // Simulate renderOrders() initialization here later if needed
    }, []);

    return (
        <ArtisanLayout>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Page Title and Stats */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#FC2839] mb-2">Your Orders</h2>
                    <div className="flex flex-wrap gap-4">
                        <OrderStat title="Pending" count="12" icon="fas fa-clock" bg="bg-[#fff6e5]" color="text-[#FFC107]" />
                        <OrderStat title="Completed" count="8" icon="fas fa-truck" bg="bg-[#e5f6ff]" color="text-[#2196F3]" />
                        <OrderStat title="Completed" count="24" icon="fas fa-check-circle" bg="bg-[#e7f7e7]" color="text-[#4CAF50]" />
                    </div>
                </div>

                {/* Filter and Search */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-1">
                            <input type="text" placeholder="Search orders..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC2839] focus:border-transparent" />
                            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC2839] focus:border-transparent">
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders List Table Placeholder */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="hidden md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200" id="orders-table-body">
                                {/* Orders will be dynamically injected here */}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-4 p-4" id="orders-cards-container">
                        {/* Mobile card orders will be injected here */}
                    </div>

                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between items-center sm:hidden">
                            <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50">Previous</a>
                            <span className="text-sm text-gray-700">Page <span id="current-page">1</span> of 5</span>
                            <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</a>
                        </div>
                    </div>
                </div>
            </main>
        </ArtisanLayout>
    );
}

const OrderStat = ({ title, count, icon, bg, color }) => (
    <div className="bg-white rounded-lg shadow p-4 flex-1 min-w-[250px]">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold">{count}</h3>
            </div>
            <div className={`${bg} p-3 rounded-full`}>
                <i className={`${icon} ${color} text-xl`}></i>
            </div>
        </div>
    </div>
);

export default ArtisanOrders;
