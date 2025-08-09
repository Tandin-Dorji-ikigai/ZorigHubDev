// src/pages/ArtisanProduct.jsx
import React, { useEffect } from 'react';
import ArtisanLayout from '@/components/artisans/ArtisanLayout';

function ArtisanProduct() {
    useEffect(() => {
        // Optional: you can fetch product list or mount logic here
    }, []);

    return (
        <ArtisanLayout>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#FC2839] focus:border-transparent"
                                placeholder="Search products..."
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FC2839]">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Sold Out</option>
                            </select>

                            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FC2839]">
                                <option>All Crafts</option>
                                <option>Thag-zo</option>
                                <option>Lha-zo</option>
                                <option>Tshem-zo</option>
                                <option>Shag-zo</option>
                            </select>

                            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FC2839]">
                                <option>Sort By</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="productCardContainer">
                    {/* Product cards will be dynamically rendered here */}

                    <div
                        id="openAddProductForm"
                        className="bg-white bg-opacity-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-[#FC2839] hover:bg-opacity-30 cursor-pointer min-h-[400px]"
                    >
                        <div className="text-center p-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#FC2839] bg-opacity-10 text-[#FC2839] mb-4">
                                <i className="fas fa-plus"></i>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Add Product</h3>
                            <p className="text-sm text-gray-500">Showcase your craft to the world</p>
                            <button
                                className="mt-4 bg-[#FC2839] hover:bg-[#e01e2e] text-white font-medium py-2 px-4 rounded-lg transition-all"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </ArtisanLayout>
    );
}

export default ArtisanProduct;
