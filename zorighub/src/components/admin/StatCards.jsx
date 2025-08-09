import React from 'react';

const StatCards = ({ stats }) => {
    const cards = [
        {
            label: 'Total Artisans',
            icon: 'fas fa-hands-helping',
            value: stats.totalArtisans,
            change: '12.5%'
        },
        {
            label: 'Active Buyers',
            icon: 'fas fa-users',
            value: stats.activeBuyers,
            change: '18.3%'
        },
        {
            label: 'Monthly Revenue',
            icon: 'fas fa-wallet',
            value: `BTN ${stats.monthlyRevenue.toLocaleString()}`,
            change: '22.7%'
        },
        {
            label: 'Fulfillment Rate',
            icon: 'fas fa-truck',
            value: `${stats.fulfillmentRate}%`,
            change: '5.2%'
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white overflow-hidden shadow rounded-lg transition hover:shadow-lg hover:-translate-y-1"
                >
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                            <div className="bg-red-600/10 p-3 rounded-lg">
                                <i className={`${card.icon} text-xl text-red-600`}></i>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dt className="text-sm font-medium text-gray-500 truncate">{card.label}</dt>
                                <dd className="text-lg font-medium text-gray-900">{card.value}</dd>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-gray-200 pt-3 flex justify-between text-sm">
                            <span className="text-green-600 font-medium flex items-center">
                                <i className="fas fa-arrow-up text-xs mr-1"></i>
                                {card.change}
                            </span>
                            <span className="text-gray-500">Last 30 days</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;