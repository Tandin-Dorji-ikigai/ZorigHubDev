import React, { useEffect, useState } from 'react';
import AdminTopNav from '../../components/admin/AdminTopNav';
import AdminSideNav from '../../components/admin/AdminSideNav';
import * as XLSX from 'xlsx';

function AdminUsers() {
    const [artisans, setArtisans] = useState([]);

    useEffect(() => {
        loadDummyArtisans();
    }, []);

    const loadDummyArtisans = () => {
        const dummyData = [
            {
                id: 1,
                fullName: 'Pema Dema',
                dzongkhag: 'Thimphu',
                gewog: 'Chang',
                earnings: 2400,
                active: true,
                photo: '/images/people/pema.jpg',
            },
            {
                id: 2,
                fullName: 'Sonam Tshering',
                dzongkhag: 'Paro',
                gewog: 'Luni',
                earnings: 1500,
                active: false,
                photo: '/images/people/sonam.jpg',
            },
            {
                id: 3,
                fullName: 'Karma Choden',
                dzongkhag: 'Punakha',
                gewog: 'Guma',
                earnings: 3200,
                active: true,
                photo: '',
            },
            {
                id: 4,
                fullName: 'Jigme Wangchuk',
                dzongkhag: 'Bumthang',
                gewog: 'Chokhor',
                earnings: 1800,
                active: true,
                photo: '',
            },
            {
                id: 5,
                fullName: 'Thinley Dorji',
                dzongkhag: 'Trashigang',
                gewog: 'Bartsham',
                earnings: 2100,
                active: false,
                photo: '',
            },
        ];

        setArtisans(dummyData);
    };

    const toggleUserStatus = (id) => {
        setArtisans((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
    };

    const exportToExcel = () => {
        const table = document.querySelector('table');
        if (table) {
            const wb = XLSX.utils.table_to_book(table, { sheet: 'Artisans' });
            XLSX.writeFile(wb, 'Artisans_Details.xlsx');
        } else {
            console.error('Table not found!');
        }
    };

    return (
        <div className="bg-gray-50 font-sans text-gray-800">
            <AdminTopNav />
            <div className="flex">
                <AdminSideNav />
                <main className="md:ml-64 flex-1 overflow-y-auto">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-lg font-medium text-gray-900">Artisan Management</h2>
                                    <div className="flex flex-wrap gap-2">
                                        <button className="px-3 py-2 text-sm rounded-md text-white bg-[#FC2839] hover:bg-[#d92130]">
                                            <i className="fas fa-users mr-1"></i> All Users
                                        </button>
                                        <button
                                            className="px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-50"
                                            onClick={exportToExcel}
                                        >
                                            <i className="fas fa-file-export mr-1"></i> Export CSV
                                        </button>
                                    </div>
                                </div>

                                <div className="border-b border-gray-200 tab-switcher px-6 py-5">
                                    <label className="px-4 py-3 text-sm font-medium cursor-pointer border-b-2 border-[#FC2839] text-[#FC2839] font-semibold">
                                        All Artisans
                                    </label>
                                </div>

                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {artisans.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={user.photo || '/images/people/default.jpg'}
                                                                alt="Profile"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.dzongkhag || '—'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.gewog || '—'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">BTN {user.earnings || 0}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                    <button
                                                        onClick={() => toggleUserStatus(user.id)}
                                                        className={`px-3 py-1 rounded text-sm font-medium ${user.active
                                                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                            : 'bg-[#FC2839] text-white hover:bg-[#d92130]'
                                                            }`}
                                                    >
                                                        {user.active ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminUsers;
