// src/components/buyer/CheckoutSkeleton.jsx
import React from 'react';
import { Placeholder } from 'rsuite';

export default function CheckoutSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: forms skeleton */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Billing */}
                    <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                        <Placeholder.Paragraph rows={1} style={{ width: 220 }} active />
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className={i === 4 ? 'sm:col-span-2' : ''}>
                                    <Placeholder.Paragraph rows={2} active />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Shipping address */}
                    <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                        <Placeholder.Paragraph rows={1} style={{ width: 200 }} active />
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className={i === 2 ? 'sm:col-span-2' : ''}>
                                    <Placeholder.Paragraph rows={2} active />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Shipping & Payment */}
                    <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                        <Placeholder.Paragraph rows={1} style={{ width: 200 }} active />
                        <div className="mt-4 space-y-3">
                            <Placeholder.Paragraph rows={2} active />
                            <Placeholder.Paragraph rows={2} active />
                        </div>
                        <div className="mt-6">
                            <Placeholder.Paragraph rows={1} style={{ width: 180 }} active />
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Placeholder.Paragraph key={i} rows={2} active />
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            {/* button-shaped skeleton */}
                            <div className="h-11 rounded-md overflow-hidden">
                                <Placeholder.Paragraph rows={1} active />
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT: summary skeleton */}
                <aside className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 sticky top-8">
                        <Placeholder.Paragraph rows={1} style={{ width: 160 }} active />
                        <div className="mt-4 space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-start justify-between gap-3">
                                    <div style={{ flex: 1 }}>
                                        <Placeholder.Paragraph rows={2} active />
                                    </div>
                                    <div style={{ width: 80 }}>
                                        <Placeholder.Paragraph rows={1} active />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 space-y-2">
                            <Placeholder.Paragraph rows={1} active />
                            <Placeholder.Paragraph rows={1} active />
                            <Placeholder.Paragraph rows={1} active />
                        </div>
                        <div className="mt-4 border-t pt-4">
                            <Placeholder.Paragraph rows={1} active />
                        </div>
                        {/* button-shaped skeleton */}
                        <div className="mt-6 h-10 rounded-md overflow-hidden">
                            <Placeholder.Paragraph rows={1} active />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
