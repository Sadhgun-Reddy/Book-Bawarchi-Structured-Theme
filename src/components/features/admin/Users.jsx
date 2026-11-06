import React from 'react';

const Users = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 <div className="p-8 text-center text-slate-500">User accounts will be listed here.</div>
            </div>
        </div>
    );
};

export default Users;
