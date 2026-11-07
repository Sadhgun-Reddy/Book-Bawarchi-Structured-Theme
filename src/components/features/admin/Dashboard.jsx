import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ orders: 0, revenue: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [ordersRes, usersRes] = await Promise.all([
                    api.get('/orders'),
                    api.get('/users')
                ]);

                const orders = ordersRes.data;
                const users = usersRes.data;

                const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

                setStats({
                    orders: orders.length,
                    revenue: revenue,
                    users: users.length
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Loading overview...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Total Orders</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stats.orders}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Revenue</h3>
                    <p className="text-3xl font-bold text-[#137EED] mt-2">${stats.revenue.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Total Users</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stats.users}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
