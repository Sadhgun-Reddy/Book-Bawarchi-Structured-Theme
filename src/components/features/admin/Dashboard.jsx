import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Total Orders</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">1,248</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Revenue</h3>
                    <p className="text-3xl font-bold text-[#137EED] mt-2">$45,290</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold text-sm">Active Users</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">892</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
