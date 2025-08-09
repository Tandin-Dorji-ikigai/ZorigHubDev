import React, { useEffect } from 'react';
import AdminTopNav from '../../components/admin/AdminTopNav';
import AdminSideNav from '../../components/admin/AdminSideNav';
import profilePic from "../../assets/images/people/karma.jpg";

function AdminSetting() {
    useEffect(() => {
        document.title = 'ZorigHub Admin Dashboard';
    }, []);

    return (
        <div className="bg-gray-50 font-sans text-gray-800">
            <AdminTopNav />
            <div className="flex">
                <AdminSideNav />
                <main className="md:ml-64 flex-1 overflow-y-auto">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-semibold text-gray-900">Admin Profile & Settings</h1>
                                <div className="flex space-x-2">
                                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FC2839] hover:bg-[#d92130] focus:outline-none">
                                        <i className="fas fa-save mr-1"></i> Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Settings Tabs */}
                            <div className="mt-6 border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8">
                                    <a href="#" className="border-[#FC2839] text-[#FC2839] whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                        Profile
                                    </a>
                                    <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                        Security
                                    </a>
                                    <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                        Preferences
                                    </a>
                                    <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                        System Settings <span className="ml-1 text-xs text-[#D9A05B]">(Admin Only)</span>
                                    </a>
                                </nav>
                            </div>

                            {/* Profile Settings */}
                            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                                </div>
                                <div className="px-6 py-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-1">
                                        <div className="flex items-center flex-col">
                                            <img className="h-24 w-24 rounded-full object-cover" src={profilePic} alt="Profile" />
                                            <button type="button" className="mt-2 text-sm text-[#FC2839] hover:text-[#d92130] font-medium">
                                                Change Photo
                                            </button>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-5">
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">First name</label>
                                                <input type="text" className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#FC2839] focus:ring-[#FC2839] sm:text-sm" />
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Last name</label>
                                                <input type="text" className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#FC2839] focus:ring-[#FC2839] sm:text-sm" />
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                                <input type="email" className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#FC2839] focus:ring-[#FC2839] sm:text-sm" />
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                                                <input type="text" className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#FC2839] focus:ring-[#FC2839] sm:text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                                </div>
                                <div className="px-6 py-4 space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Password</h3>
                                            <p className="text-xs text-gray-500">Last changed 12 days ago</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                                <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FC2839] focus:ring-[#FC2839] sm:text-sm" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                                <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FC2839] focus:ring-[#FC2839] sm:text-sm" />
                                                <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
                                                    <div className="h-1 w-1/3 bg-red-500 rounded-full"></div>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">Password strength: Weak</p>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                                <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FC2839] focus:ring-[#FC2839] sm:text-sm" />
                                            </div>
                                        </div>
                                        <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FC2839] hover:bg-[#d92130] focus:outline-none">
                                            Change Password
                                        </button>
                                    </div>

                                    <div className="space-y-4 border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">Active Sessions</h3>
                                                <p className="text-xs text-gray-500">Currently logged in from 2 devices</p>
                                            </div>
                                            <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FC2839] hover:bg-[#d92130] focus:outline-none">
                                                Log Out Other Devices
                                            </button>
                                        </div>
                                        <div className="rounded-md bg-blue-50 p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <i className="fas fa-laptop text-blue-400"></i>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-blue-800">Chrome on Windows</h3>
                                                        <div className="mt-1 text-sm text-blue-700">
                                                            <p>Thimphu, Bhutan (This device)</p>
                                                            <p className="text-xs">Last active: Just now</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-blue-700 text-sm font-medium">
                                                    Current
                                                </div>
                                            </div>
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
}

export default AdminSetting;
