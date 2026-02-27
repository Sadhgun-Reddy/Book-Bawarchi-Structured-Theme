import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

const Header = () => {
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
                    <Link to="/login" className="px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                        Log In
                    </Link>
                    <Link to="/signup" className="px-4 py-2 text-sm font-bold text-white bg-[#137EED] hover:bg-[#1e3a8a] rounded transition-colors shadow-sm">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
