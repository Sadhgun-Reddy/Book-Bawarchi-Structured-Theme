import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, LogOut, User, ShoppingCart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.pos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Utensils className="w-6 h-6 text-[#137EED]" />
                    <div className="font-bold text-xl text-slate-900 tracking-tight">
                        Book <span className="text-[#137EED]">Bawarchi</span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/find" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">Find a Cook</Link>
                    <Link to="/potluck" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">Community Potluck</Link>
                    <Link to="/support" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">Support</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/checkout" className="relative p-2 text-slate-600 hover:text-[#137EED] transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-[#137EED] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </Link>
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            {user?.role === 'admin' && (
                                <Link to="/dashboard" className="text-sm font-semibold text-[#137EED] hover:underline">
                                    Admin Dashboard
                                </Link>
                            )}
                            <Link to="/profile" className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-[#137EED] transition-colors">
                                <User className="w-4 h-4" />
                                <span>Profile</span>
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
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
