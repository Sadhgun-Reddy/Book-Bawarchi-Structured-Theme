import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, ShoppingCart, User, LogOut, LayoutDashboard, ListOrdered } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.pos);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setIsMenuOpen(false);
        navigate('/');
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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

                <div className="flex items-center gap-4">
                    <Link to="/checkout" className="relative p-2 text-slate-600 hover:text-[#137EED] transition-colors flex items-center">
                        <ShoppingCart className="w-5 h-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-[#137EED] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-600 hover:border-[#137EED] transition-colors"
                            >
                                <User className="w-4 h-4" />
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 overflow-hidden z-50">
                                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                                        <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                                    </div>

                                    {user?.role === 'admin' && (
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <LayoutDashboard className="w-4 h-4 text-slate-400" /> Admin Dashboard
                                        </Link>
                                    )}

                                    {user?.role === 'user' && (
                                        <Link
                                            to="/my-orders"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <ListOrdered className="w-4 h-4 text-slate-400" /> My Orders
                                        </Link>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-slate-100"
                                    >
                                        <LogOut className="w-4 h-4" /> Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                                Log In
                            </Link>
                            <Link to="/register" className="px-4 py-2 text-sm font-bold text-white bg-[#137EED] hover:bg-[#1e3a8a] rounded transition-colors shadow-sm">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
