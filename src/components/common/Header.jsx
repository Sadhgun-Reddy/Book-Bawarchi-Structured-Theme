import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, User as UserIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
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
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors">
                                <UserIcon className="w-4 h-4 text-slate-600" />
                            </Link>
                            {user?.role === 'admin' ? (
                                <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">Dashboard</Link>
                            ) : (
                                <Link to="/my-orders" className="text-sm font-semibold text-slate-600 hover:text-[#137EED] transition-colors">My Orders</Link>
                            )}
                            <button onClick={handleLogout} className="text-sm font-semibold text-slate-600 hover:text-red-500 transition-colors">Logout</button>
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
