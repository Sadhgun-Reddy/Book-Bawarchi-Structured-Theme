import React from 'react';
import { Search } from 'lucide-react';

const SearchHeader = ({ count, searchQuery, setSearchQuery, sortBy, setSortBy }) => {
    return (
        <div className="bg-white border-b border-slate-200 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center sticky top-0 z-10">
            <div className="flex-1 w-full sm:w-auto relative max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium rounded pl-10 pr-4 py-2 focus:ring-1 focus:ring-[#137EED] focus:border-[#137EED] outline-none placeholder:text-slate-400 transition-shadow"
                    placeholder="Search by name, cuisine, or dish..."
                />
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm text-slate-500 font-bold whitespace-nowrap">
                    Showing {count} Results
                </span>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 font-bold hidden sm:inline">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs sm:text-sm rounded py-1.5 pl-3 pr-8 focus:ring-[#137EED] focus:border-[#137EED] outline-none cursor-pointer transition-shadow"
                    >
                        <option value="Recommended">Recommended</option>
                        <option value="Rating: High to Low">Rating: High to Low</option>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Distance: Near to Far">Distance: Near to Far</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;
