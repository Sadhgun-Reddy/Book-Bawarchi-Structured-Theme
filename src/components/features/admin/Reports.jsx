import React from 'react';

const Reports = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
                <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors">
                    Export Data
                </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 <div className="p-8 text-center text-slate-500">Analytics charts and data will be shown here.</div>
            </div>
        </div>
    );
};

export default Reports;
