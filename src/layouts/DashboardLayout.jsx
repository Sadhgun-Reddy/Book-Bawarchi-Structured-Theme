import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/uiSlice';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Menu, User, Settings, ShoppingCart, Home, ListOrdered, FileText } from 'lucide-react';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
            isActive ? 'bg-[#137EED] text-white' : 'hover:bg-slate-100 text-slate-700'
        }`;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-display">
            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col shadow-sm">
                    <div className="h-14 border-b border-slate-200 flex items-center px-4 font-bold text-lg text-slate-800">
                        Admin Dashboard
                    </div>
                    <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                        <NavLink to="/dashboard" end className={navLinkClass}>
                            <Home size={16} strokeWidth={2} /> Dashboard
                        </NavLink>
                        <NavLink to="/dashboard/inventory" className={navLinkClass}>
                            <ShoppingCart size={16} strokeWidth={2} /> Inventory
                        </NavLink>
                        <NavLink to="/dashboard/orders" className={navLinkClass}>
                            <ListOrdered size={16} strokeWidth={2} /> Orders
                        </NavLink>
                        <NavLink to="/dashboard/users" className={navLinkClass}>
                            <User size={16} strokeWidth={2} /> Users
                        </NavLink>
                        <NavLink to="/dashboard/reports" className={navLinkClass}>
                            <FileText size={16} strokeWidth={2} /> Reports
                        </NavLink>
                    </nav>
                </aside>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 flex-shrink-0 shadow-sm z-10">
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                    >
                        <Menu size={18} strokeWidth={2} />
                    </button>

                    <div className="flex items-center gap-3">
                        <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
                            <Settings size={18} strokeWidth={2} />
                        </button>

                        <div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-600">
                            <User size={16} strokeWidth={2} />
                        </div>
                        <button
                            onClick={() => {
                                dispatch(logout());
                                navigate('/');
                            }}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded transition-colors shadow-sm ml-2"
                        >
                            Logout
                        </button>

                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
