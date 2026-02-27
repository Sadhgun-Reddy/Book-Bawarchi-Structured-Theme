import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/uiSlice';
import { Menu, User, Settings, ShoppingCart } from 'lucide-react';

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="w-64 flex-shrink-0 border-r border-border bg-white flex flex-col">
                    <div className="h-14 border-b border-border flex items-center px-4 font-bold text-sm">
                        Admin Dashboard
                    </div>
                    <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                        <a href="/dashboard" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-slate-100">
                            <ShoppingCart size={16} strokeWidth={1.5} /> POS
                        </a>
                        <a href="/dashboard/inventory" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-slate-100">
                            <Menu size={16} strokeWidth={1.5} /> Inventory
                        </a>
                        <a href="/dashboard/users" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-slate-100">
                            <User size={16} strokeWidth={1.5} /> Users
                        </a>
                    </nav>
                </aside>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-14 border-b border-border bg-white flex items-center justify-between px-4 flex-shrink-0">
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="p-1.5 rounded border border-border hover:bg-slate-50"
                    >
                        <Menu size={16} strokeWidth={1.5} />
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded border border-border hover:bg-slate-50">
                            <Settings size={16} strokeWidth={1.5} />
                        </button>
                        <div className="h-8 w-8 rounded border border-border bg-slate-100 flex items-center justify-center">
                            <User size={16} strokeWidth={1.5} />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
