import React, { useEffect, useRef, useState } from 'react';
import AdminTopNav from '../../components/admin/AdminTopNav';
import AdminSideNav from '../../components/admin/AdminSideNav';
import Chart from 'chart.js/auto';
import { FaTruck, FaEllipsisV, FaClipboardList, FaComments } from 'react-icons/fa';

const dummyOrders = [
    {
        id: '#ZH-4208',
        artisan: { name: 'Dorji Wangmo', avatar: '/images/people/dorji.jpg' },
        buyer: 'Jigme Johnson (USA)',
        item: 'Kira (Dress)',
        quantity: 1,
        category: 'Weaving',
        status: 'Processing',
        total: 8500,
        statusColor: 'bg-yellow-100 text-yellow-800',
        icon: <FaTruck className="text-red-500" />,
    },
    {
        id: '#ZH-4207',
        artisan: { name: 'Pema Dorji', avatar: '/images/people/pema.jpg' },
        buyer: 'Raj Patel (India)',
        item: 'Buddha Thangka',
        quantity: 1,
        category: 'Thangka',
        status: 'Shipped',
        total: 12000,
        statusColor: 'bg-blue-100 text-blue-700',
        icon: <FaClipboardList className="text-blue-500" />,
    },
    {
        id: '#ZH-4206',
        artisan: { name: 'Karma Tshering', avatar: '/images/people/karma.jpg' },
        buyer: 'Emily Chen (Canada)',
        item: 'Wooden Mask',
        quantity: 2,
        category: 'Woodcarving',
        status: 'Delivered',
        total: 6800,
        statusColor: 'bg-green-100 text-green-700',
        icon: <FaComments className="text-gray-600" />,
    },
];

function AdminOrders() {
    const chartRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const ctx = document.getElementById('ordersChart');
        if (!ctx) return;
        if (chartRef.current) chartRef.current.destroy();

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [11000, 18000, 14000, 16000, 20000, 23000],
                    backgroundColor: '#FC2839',
                    barThickness: 20, 
                    borderRadius: 4    
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 12 } }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `BTN ${value / 1000}k`
                        }
                    }
                }
            }
        });


        return () => chartRef.current?.destroy();
    }, []);

    return (
        <div className="bg-gray-50 font-sans text-gray-800 min-h-screen">
            <AdminTopNav />
            <div className="flex">
                <AdminSideNav />
                <main className="md:ml-64 flex-1 p-6">
                    <h1 className="text-2xl font-semibold mb-4">Order Management</h1>

                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="flex flex-wrap gap-2 justify-between items-center">
                            <h2 className="text-lg font-medium">Order Management</h2>
                            <div className="flex gap-2">
                                <button className="bg-red-500 text-white text-sm px-4 py-1 rounded">Pending</button>
                                <button className="bg-green-500 text-white text-sm px-4 py-1 rounded">Completed</button>
                                <button className="border px-4 py-1 text-sm rounded">Export CSV</button>
                                <button className="border px-4 py-1 text-sm rounded">Filter</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-red-50 text-red-700 p-4 rounded">
                                <p className="text-sm">Pending Orders</p>
                                <h3 className="text-2xl font-bold">12</h3>
                                <p className="text-xs">↗ 2 new</p>
                            </div>
                            <div className="bg-blue-50 text-blue-700 p-4 rounded">
                                <p className="text-sm">Avg. Fulfillment <span className="text-xs text-gray-500">(Last 7 days)</span></p>
                                <h3 className="text-2xl font-bold">2.3 days</h3>
                                <p className="text-xs">↘ 12%</p>
                            </div>
                            <div className="bg-green-50 text-green-700 p-4 rounded">
                                <p className="text-sm">Today's Revenue</p>
                                <h3 className="text-2xl font-bold">BTN 42,500</h3>
                                <p className="text-xs">↗ 18%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">Orders Summary</h2>
                            <div className="space-x-2">
                                <button className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">Week</button>
                                <button className="text-sm px-3 py-1 rounded bg-[#FC2839] text-white">Month</button>
                                <button className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">Year</button>
                            </div>
                        </div>
                        <canvas id="ordersChart" height="70"></canvas>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-pink-50 text-xs font-semibold text-gray-600 uppercase">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Artisan</th>
                                    <th className="px-6 py-3">Buyer</th>
                                    <th className="px-6 py-3">Items</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Total</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dummyOrders.map((order, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                                        <td className="px-6 py-4 flex items-center space-x-2">
                                            <img src={order.artisan.avatar} alt="artisan" className="h-8 w-8 rounded-full object-cover" />
                                            <span>{order.artisan.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">{order.buyer}</td>
                                        <td className="px-6 py-4 text-sm">
                                            {order.item} ×{order.quantity}<br />
                                            <span className="text-xs text-gray-500">{order.category}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs px-3 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-semibold">BTN {order.total.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-3 text-lg text-gray-500">
                                                {order.icon}
                                                <FaEllipsisV />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-between px-6 py-4 text-sm">
                            <span>Showing 1 to 3 of 56 results</span>
                            <div className="flex items-center gap-1">
                                <button className="px-2 border rounded">&lt;</button>
                                {[1, 2, 3].map(num => (
                                    <button key={num} className={`px-3 py-1 rounded border ${num === currentPage ? 'bg-red-100 text-red-500 font-bold' : ''}`}>{num}</button>
                                ))}
                                <span className="px-2">...</span>
                                <button className="px-3 py-1 rounded border">12</button>
                                <button className="px-2 border rounded">&gt;</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminOrders;
