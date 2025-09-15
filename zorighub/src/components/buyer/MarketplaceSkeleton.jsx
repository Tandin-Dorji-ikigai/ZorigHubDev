// /components/buyer/MarketplaceSkeleton.jsx
import React from "react";
import { Placeholder } from "rsuite";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function MarketplaceSkeleton({ cards = 12 }) {
    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar skeleton */}
            <aside className="w-full md:w-72 flex-shrink-0 mr-0 md:mr-8 mb-8 md:mb-0">
                <div className="bg-white rounded-2xl shadow-sm sticky top-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-50 to-white px-6 py-5 border-b">
                        <Placeholder.Paragraph rows={1} style={{ width: 120 }} active />
                        <div className="mt-4 flex gap-2">
                            <Placeholder.Paragraph rows={1} style={{ width: "70%" }} active />
                            <Placeholder.Paragraph rows={1} style={{ width: 90 }} active />
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {[0, 1, 2, 3].map((section) => (
                            <div key={section} className="bg-gray-50 border rounded-xl p-4">
                                <Placeholder.Paragraph rows={1} style={{ width: 160 }} active />
                                <div className="mt-3 space-y-2">
                                    <Placeholder.Paragraph rows={1} style={{ width: "90%" }} active />
                                    <Placeholder.Paragraph rows={1} style={{ width: "80%" }} active />
                                    <Placeholder.Paragraph rows={1} style={{ width: "70%" }} active />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main column skeleton */}
            <main className="flex-1">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <Placeholder.Paragraph rows={1} style={{ width: 240 }} active />
                    <Placeholder.Paragraph rows={1} style={{ width: 180 }} active />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: cards }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>

                <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                        <Placeholder.Paragraph rows={1} style={{ width: 160 }} active />
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Placeholder.Graph key={i} active style={{ width: 40, height: 40, borderRadius: 8 }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
