import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Reports = () => {
    const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, activeUsers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ordersRes, usersRes] = await Promise.all([
                    api.get('/orders'),
                    api.get('/users')
                ]);

                const orders = ordersRes.data;
                const totalOrders = orders.length;
                const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
                const activeUsers = usersRes.data.length;

                setStats({ totalOrders, revenue, activeUsers });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
                <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors">
                    Export Data
                </button>
            </div>

            {loading ? (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center text-slate-500">
                    Loading reports...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-semibold text-sm">Total Orders</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-semibold text-sm">Revenue</h3>
                        <p className="text-3xl font-bold text-[#137EED] mt-2">${stats.revenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-semibold text-sm">Total Users</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-2">{stats.activeUsers}</p>
                    </div>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6">
                 <h2 className="text-lg font-bold text-slate-800 mb-4">Activity Overview</h2>
                 <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg">
                     <p className="text-slate-500">Detailed charts will be shown here.</p>
                 </div>
            </div>
        </div>
    );
};

export default Reports;
