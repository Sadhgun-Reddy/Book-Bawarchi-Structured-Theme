import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, User, LogOut, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
        navigate('/');
    };

    return (
        <header className="border-b border-slate-200 bg-white relative z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <Utensils className="w-6 h-6 text-[#137EED]" />
                    <div className="font-bold text-xl text-slate-900 tracking-tight">
                        Book <span className="text-[#137EED]">Bawarchi</span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/find" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">Find a Cook</Link>
                    <Link to="/potluck" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">Community Potluck</Link>
                    <Link to="/support" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">Support</Link>
                </nav>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#137EED]">
                                    <User size={16} />
                                </div>
                                <span className="hidden md:block truncate max-w-[120px]">{user?.email}</span>
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setDropdownOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                        <div className="px-4 py-2 border-b border-slate-100 mb-1">
                                            <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                                            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                                        </div>

                                        {user?.role === 'admin' ? (
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <LayoutDashboard size={16} /> Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/my-orders"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <ShoppingBag size={16} /> My Orders
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                        >
                                            <LogOut size={16} /> Log Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                                Log In
                            </Link>
                            <Link to="/register" className="px-4 py-2 text-sm font-bold text-white bg-[#137EED] hover:bg-[#1e3a8a] rounded transition-colors shadow-sm">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
