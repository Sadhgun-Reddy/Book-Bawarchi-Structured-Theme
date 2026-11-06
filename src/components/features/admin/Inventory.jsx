import React from 'react';

const Inventory = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
                <button className="bg-[#137EED] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors">
                    Add Item
                </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-8 text-center text-slate-500">Inventory items will be listed here.</div>
            </div>
        </div>
    );
};

export default Inventory;
