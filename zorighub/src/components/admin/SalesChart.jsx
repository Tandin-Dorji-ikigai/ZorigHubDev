import React from 'react';

const SalesChart = () => {
    return (
        <div className="bg-white p-6 shadow rounded-lg lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
                <select className="bg-gray-100 border border-gray-200 text-gray-700 py-1 px-3 rounded">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                </select>
            </div>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-500">Sales Chart Placeholder</p>
            </div>
        </div>
    );
};

export default SalesChart;