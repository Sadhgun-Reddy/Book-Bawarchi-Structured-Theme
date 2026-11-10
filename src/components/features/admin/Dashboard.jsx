import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, activeUsers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Total Orders</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Revenue</h3>
                    <p className="text-3xl font-bold text-[#137EED] mt-2">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Active Users</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stats.activeUsers}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
