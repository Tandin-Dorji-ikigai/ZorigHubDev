import React, { useEffect, useState } from 'react';
import AdminTopNav from '../../components/admin/AdminTopNav';
import AdminSideNav from '../../components/admin/AdminSideNav';

function AdminLoan() {
    useEffect(() => {
        const userMenuButton = document.getElementById('user-menu-button');
        const userMenu = document.getElementById('user-menu');

        if (userMenuButton && userMenu) {
            userMenuButton.addEventListener('click', () => {
                userMenu.classList.toggle('hidden');
            });
        }
    }, []);

    const calculateLoan = () => {
        const principal = parseFloat(document.getElementById('principalAmount').value);
        const duration = parseInt(document.getElementById('loanDuration').value);
        const interestRate = 0.03;

        if (!principal || !duration) return;

        const totalInterest = principal * interestRate;
        const totalRepayable = principal + totalInterest;
        const monthlyPayment = totalRepayable / duration;

        document.getElementById('interestAmount').textContent = `BTN ${totalInterest.toFixed(2)}`;
        document.getElementById('monthlyPayment').textContent = `BTN ${monthlyPayment.toFixed(2)}`;
    };

    return (
        <div className="bg-gray-50 font-sans text-gray-800">
            <AdminTopNav />
            <div className="flex">
                <AdminSideNav />
                <main className="md:ml-64 flex-1 overflow-y-auto">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Loan Management</h1>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
                            <div className="bg-white overflow-hidden shadow rounded-lg transition duration-150 ease-in-out p-4">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Loan Calculator</h3>
                                <div className="mb-3">
                                    <label className="block text-xs text-gray-500">Principal Amount (BTN)</label>
                                    <input type="number" className="w-full p-2 border rounded text-sm" placeholder="e.g. 10000" id="principalAmount" />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-xs text-gray-500">Duration</label>
                                    <select className="w-full p-2 border rounded text-sm" id="loanDuration">
                                        <option value="3">3 months</option>
                                        <option value="6">6 months</option>
                                        <option value="12" selected>12 months</option>
                                    </select>
                                </div>
                                <button onClick={calculateLoan} className="w-full py-2 bg-[#FC2839] text-white rounded text-sm mb-3">
                                    Calculate Repayment
                                </button>
                                <div className="mt-3 p-3 bg-blue-50 rounded">
                                    <p className="text-xs text-gray-600">Total Interest (3%):</p>
                                    <p className="text-sm font-semibold text-blue-800" id="interestAmount">BTN 0</p>
                                    <p className="text-xs text-gray-600 mt-2">Monthly Payment:</p>
                                    <p className="text-lg font-semibold text-blue-800" id="monthlyPayment">BTN 0</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-6 mb-6">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-sm font-medium text-gray-500">Total Active Loans</h3>
                                    <p className="text-2xl font-semibold text-gray-900">BTN 1,200,000</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-sm font-medium text-gray-500">Total Interest Due</h3>
                                    <p className="text-2xl font-semibold text-gray-900">BTN 36,000 <span className="text-sm text-green-600">(3%)</span></p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-sm font-medium text-gray-500">Overdue Loans</h3>
                                    <p className="text-2xl font-semibold text-red-600">2</p>
                                </div>
                            </div>

                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-lg font-medium text-gray-900">Active Loans</h2>
                                    <div className="relative w-48">
                                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FC2839] focus:border-[#FC2839] sm:text-sm rounded-md">
                                            <option>Sort by: Newest</option>
                                            <option>Sort by: Amount</option>
                                            <option>Sort by: Due Date</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artisan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disbursed</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Repayable</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Due</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img className="h-8 w-8 rounded-full object-cover" src="/images/people/pema.jpg" alt="" />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Dorji Wangmo</div>
                                                            <div className="text-xs text-gray-500">Weaving</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">BTN 50,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 Jun 2025</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">BTN 51,500</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                                    </div>
                                                    <span className="text-xs text-gray-600 mt-1">65% repaid</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15 Dec 2025</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">Pending Loan Applications</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artisan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eligibility</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img className="h-8 w-8 rounded-full object-cover" src="/images/people/pema.jpg" alt="" />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Dorji Wangmo</div>
                                                            <div className="text-xs text-gray-500">Weaving, 8 months</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">BTN 30,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Thagzo (Loom)</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">🟢</span>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600 ml-2">82/100</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="px-3 py-1 bg-green-600 text-white text-xs rounded mr-2">Approve</button>
                                                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded">Reject</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLoan;
