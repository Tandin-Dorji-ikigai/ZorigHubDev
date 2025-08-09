import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import AdminTopNav from '../../components/admin/AdminTopNav';
import AdminSideNav from '../../components/admin/AdminSideNav';

const AdminAnalytics = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [timeRange, setTimeRange] = useState("30d");

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current?.getContext("2d");
        if (!ctx) return;

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        label: "Weaving",
                        data: [12, 19, 15, 17, 23, 25],
                        backgroundColor: "#FC2839",
                        borderRadius: 4,
                        barThickness: 12,
                    },
                    {
                        label: "Wood Carving",
                        data: [8, 9, 10, 12, 15, 18],
                        backgroundColor: "#10B981",
                        borderRadius: 4,
                        barThickness: 12,
                    },
                    {
                        label: "Thangka Painting",
                        data: [6, 8, 10, 12, 14, 16],
                        backgroundColor: "#3B82F6",
                        borderRadius: 4,
                        barThickness: 12,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: { grid: { display: false }, stacked: true },
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [5], drawBorder: false },
                        ticks: {
                            callback: (value) => `BTN ${value}k`,
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [timeRange]);

    return (
        <div className="bg-gray-50 font-sans text-gray-800">
            <AdminTopNav />
            <div className="flex">
                <AdminSideNav />
                <main className="md:ml-64 flex-1 overflow-y-auto">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-white p-6 shadow rounded-lg lg:col-span-2">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
                                        <select
                                            value={timeRange}
                                            onChange={(e) => setTimeRange(e.target.value)}
                                            className="bg-gray-100 border border-gray-200 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                                        >
                                            <option value="7d">Last 7 Days</option>
                                            <option value="30d">Last 30 Days</option>
                                            <option value="90d">Last 90 Days</option>
                                        </select>
                                    </div>
                                    <div className="h-64">
                                        <canvas ref={chartRef} className="w-full h-full"></canvas>
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-[#FC2839] mr-2"></div>
                                            <span className="text-sm text-gray-600">Weaving</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
                                            <span className="text-sm text-gray-600">Wood Carving</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
                                            <span className="text-sm text-gray-600">Thangka Painting</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 shadow rounded-lg">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Tourist Engagement Heatmap</h2>
                                    <div
                                        id="map"
                                        className="h-64 w-full rounded-lg bg-gradient-to-r from-[#7C6A5A] via-[#D9A05B] to-[#FC2839] flex items-center justify-center text-white font-semibold"
                                    >
                                        Heatmap Placeholder
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-[#FC2839] mr-2"></div>
                                            <span className="text-sm text-gray-600">High Engagement</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-[#D9A05B] mr-2"></div>
                                            <span className="text-sm text-gray-600">Medium</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-[#7C6A5A] mr-2"></div>
                                            <span className="text-sm text-gray-600">Low</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminAnalytics;
