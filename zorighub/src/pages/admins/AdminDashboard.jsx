import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../services/api';
import AdminSideNav from '../../components/admin/AdminSideNav';
import AdminTopNav from '../../components/admin/AdminTopNav';
import StatCards from '../../components/admin/StatCards';
import SalesChart from '../../components/admin/SalesChart';
import RecentActivity from '../../components/admin/RecentActivity';
import QuickActions from '../../components/admin/QuickActions';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalArtisans: 1248,
    activeBuyers: 3746,
    monthlyRevenue: 482500,
    fulfillmentRate: 85
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const statsData = await ApiService.getAdminStats();
        // setStats(statsData);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 font-sans text-gray-800">
      <AdminTopNav user={user} logout={logout} />
      <div className="flex">
        <AdminSideNav />
        <main className="md:ml-64 flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
              <StatCards stats={stats} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SalesChart />
                <RecentActivity />
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
