// src/pages/ArtisanEarning.jsx
import React from 'react';
import ArtisanLayout from '@/components/artisans/ArtisanLayout';


function ArtisanEarning() {
    return (
        <ArtisanLayout>
            <div className="space-y-6">
                {/* Title */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-bhutan-charcoal">My Earnings</h2>
                        <p className="text-gray-600">Track your transactions and request payouts</p>
                    </div>
                    <span className="bg-yellow-50 text-yellow-800 text-xs px-3 py-1 rounded-full">
                        Last updated: 5 mins ago
                    </span>
                </div>

                {/* Earnings Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <EarningCard
                        title="Total Earnings"
                        amount="Nu. 28,750"
                        change="12.5%"
                        icon="fas fa-wallet"
                        iconColor="text-bhutan-red"
                        footer={<span className="text-green-500"><i className="fas fa-check-circle"></i> Verified account</span>}
                    />
                    <EarningCard
                        title="Month-to-Date"
                        amount="Nu. 5,350"
                        icon="fas fa-calendar-check"
                        iconColor="text-bhutan-orange"
                        footer={<span className="text-yellow-600"><i className="far fa-clock"></i> 3 transactions pending</span>}
                        badgeText="Estimated payout: Jun 5"
                    />
                </div>

                {/* Available Balance */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Available for payout</p>
                                <p className="text-3xl font-bold mt-1 text-bhutan-charcoal">Nu. 11,200</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <button className="w-full md:w-auto px-6 py-3 bg-bhutan-red hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition">
                                    <i className="fas fa-rupee-sign mr-2"></i> Request Payout
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500 flex items-center">
                                <i className="fas fa-university mr-2"></i> Payout method:
                                <span className="ml-1 text-bhutan-charcoal font-medium">BDBL Bank (•••• 2345)</span>
                                <a href="#" className="ml-3 text-bhutan-red hover:underline">Change</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-bhutan-charcoal">Transaction History</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <TransactionItem
                            title="Buddha Statue - Medium"
                            order="#ZH-4821"
                            date="May 28, 2025"
                            status1="Paid"
                            status2="Delivered"
                            amount="Nu. 4,500"
                            breakdown={{
                                itemValue: 'Nu. 4,500',
                                platformFee: 'Nu. 540',
                                packaging: 'Nu. 150',
                                deposited: 'Nu. 3,810'
                            }}
                        />
                        <TransactionItem
                            title="Handwoven Kira"
                            order="#ZH-4765"
                            date="May 22, 2025"
                            status1="Processing"
                            status2="Shipped"
                            amount="Nu. 8,750"
                        />
                        <TransactionItem
                            title="Wooden Tashi Tagye"
                            order="#ZH-4692"
                            date="May 14, 2025"
                            status1="Pending"
                            status2="In progress"
                            amount="Nu. 3,200"
                        />
                    </div>
                </div>

                {/* Previous Payouts */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-medium text-bhutan-charcoal">Previous Payouts</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <PayoutItem date="May 5, 2025" tx="ZHP-39210" amount="Nu. 7,420" />
                        <PayoutItem date="April 5, 2025" tx="ZHP-38124" amount="Nu. 5,180" />
                    </div>
                </div>
            </div>
        </ArtisanLayout>
    );
}

const EarningCard = ({ title, amount, change, icon, iconColor, footer, badgeText }) => (
    <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold mt-2 text-bhutan-charcoal">{amount}</p>
                {change && (
                    <div className="flex items-center mt-2">
                        <span className="text-green-500 text-sm font-medium">
                            <i className="fas fa-arrow-up"></i> {change}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">vs last month</span>
                    </div>
                )}
                {badgeText && (
                    <div className="mt-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                            {badgeText}
                        </span>
                    </div>
                )}
            </div>
            <div className={`p-3 rounded-full bg-opacity-10 ${iconColor}`}>
                <i className={`${icon} text-xl`}></i>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-sm">{footer}</div>
    </div>
);

const TransactionItem = ({ title, order, date, status1, status2, amount, breakdown }) => (
    <div className="p-4 md:p-6 hover:bg-gray-50 transition">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h4 className="font-medium">{title}</h4>
                <p className="text-gray-500 text-sm mt-1">Order {order} • {date}</p>
                <div className="mt-2 space-x-2">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{status1}</span>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{status2}</span>
                </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
                <p className="text-lg font-medium text-gray-900">{amount}</p>
                {breakdown && (
                    <div className="mt-1 text-xs text-bhutan-red">Fee breakdown available</div>
                )}
            </div>
        </div>
        {breakdown && (
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Breakdown label="Item value" value={breakdown.itemValue} />
                    <Breakdown label="Platform fee (12%)" value={`- ${breakdown.platformFee}`} />
                    <Breakdown label="Eco-packaging" value={`- ${breakdown.packaging}`} />
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-500">Amount deposited</p>
                    <p className="font-medium text-green-700">{breakdown.deposited}</p>
                </div>
            </div>
        )}
    </div>
);

const Breakdown = ({ label, value }) => (
    <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

const PayoutItem = ({ date, tx, amount }) => (
    <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <p className="font-medium">{date}</p>
                <p className="text-gray-500 text-sm mt-1">Transaction: {tx}</p>
            </div>
            <div className="mt-4 md:mt-0">
                <p className="text-lg font-medium text-green-600">+ {amount}</p>
                <p className="text-sm text-gray-500 mt-1">
                    <i className="fas fa-check-circle text-green-500"></i> Completed
                </p>
            </div>
        </div>
    </div>
);

export default ArtisanEarning;
