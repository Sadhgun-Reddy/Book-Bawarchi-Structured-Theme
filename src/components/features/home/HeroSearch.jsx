import React from 'react';
import { Search, MapPin, Utensils, Calendar, Users, Verified, Star } from 'lucide-react';

const HeroSearch = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[400px]">
                {/* Left Side */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded w-fit text-[#137EED]">
                        <Verified className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">Trusted by 500+ Communities</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                        Professional Catering <br />
                        <span className="text-slate-500">for Every Occasion.</span>
                    </h1>

                    <p className="text-slate-600 text-base max-w-md leading-relaxed">
                        Discover local culinary talent, coordinate community food support, and manage event catering with complete transparency.
                    </p>

                    <div className="bg-white border border-slate-200 rounded p-1 shadow-sm mt-8">
                        <form className="flex flex-col gap-1" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-1 bg-slate-100 p-[1px] rounded overflow-hidden">
                                <label className="flex items-center px-3 py-3 bg-white focus-within:ring-1 focus-within:ring-[#137EED] focus-within:z-10 relative cursor-text group rounded-tl md:rounded-bl-none sm:rounded-bl">
                                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 group-focus-within:text-[#137EED]" />
                                    <input type="text" placeholder="Zip Code or City" className="w-full ml-2 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                                </label>
                                <label className="flex items-center px-3 py-3 bg-white focus-within:ring-1 focus-within:ring-[#137EED] focus-within:z-10 relative cursor-text group rounded-tr">
                                    <Utensils className="w-4 h-4 text-slate-400 shrink-0 group-focus-within:text-[#137EED]" />
                                    <input type="text" placeholder="Cuisine Type" className="w-full ml-2 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                                </label>
                                <label className="flex items-center px-3 py-3 bg-white focus-within:ring-1 focus-within:ring-[#137EED] focus-within:z-10 relative cursor-text group sm:rounded-bl rounded-none">
                                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 group-focus-within:text-[#137EED]" />
                                    <input type="text" placeholder="Date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="w-full ml-2 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                                </label>
                                <label className="flex items-center px-3 py-3 bg-white focus-within:ring-1 focus-within:ring-[#137EED] focus-within:z-10 relative cursor-text group rounded-br">
                                    <Users className="w-4 h-4 text-slate-400 shrink-0 group-focus-within:text-[#137EED]" />
                                    <input type="number" placeholder="Guests" min="1" className="w-full ml-2 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                                </label>
                            </div>
                            <button className="h-12 w-full mt-1 bg-[#137EED] text-white font-bold rounded flex items-center justify-center gap-2 hover:bg-[#1e3a8a] transition-colors" type="submit">
                                <Search className="w-5 h-5" /> Find Cooks
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-7 relative h-[300px] lg:h-full rounded overflow-hidden border border-slate-200 bg-slate-100 group">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmIlyCz0uCnNcyqaWcnz5YAXP-NUbF3xRTmZVYYcstKIO3rCPNJJnexVxo9k_s9oCjTvKkazUMAokFeXDjvVp83Z6rSWdjn9_EhypHGy9pybXHN-dpjw6069FH65YBrtyVawDha4CDNqFmiI5jU-CQEWic1rtbsZW6pD8gCEt4JdUZdLbx9HsOFCsifwU9Gt9YKMUcnajW-KGbLbJtqwkGTB02vjmJG-fbpQNh8Qb_1iqBnIyOqd7XpbQ_ZkZzDuHvda_YtnCLKq4"
                        alt="Catering Setup"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 pt-20">
                        <span className="inline-block px-2.5 py-1 mb-2 bg-black/40 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded">
                            Featured Caterer
                        </span>
                        <h3 className="text-white text-3xl font-bold tracking-tight mb-2">Spice Route Catering</h3>
                        <div className="flex items-center gap-4 text-white font-semibold text-sm">
                            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> 4.9 (120 reviews)</span>
                            <span className="flex items-center">$$ &bull; Indian Fusion</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSearch;
