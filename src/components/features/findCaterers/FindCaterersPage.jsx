import React, { useState, useMemo } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import Header from '../../common/Header';
import FilterSidebar from './FilterSidebar';
import SearchHeader from './SearchHeader';
import CatererGrid from './CatererGrid';
import { mockCaterers } from './mockData';

const FindCaterersPage = () => {
    // Top Bar State
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Recommended");

    // Sidebar Filters State
    const [filters, setFilters] = useState({
        cuisines: [],
        serviceStyles: ['Buffet'],
        dietary: [],
        budget: { min: 15, max: 150 },
        availabilityDate: ""
    });

    // Derived Results State: filtering and sorting
    const searchResults = useMemo(() => {
        let results = [...mockCaterers];

        // 1. Search Query Filter
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            results = results.filter(caterer =>
                caterer.name.toLowerCase().includes(lowerQuery) ||
                caterer.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
                caterer.dietary.some(diet => diet.toLowerCase().includes(lowerQuery))
            );
        }

        // 2. Cuisine Filter
        if (filters.cuisines.length > 0) {
            results = results.filter(caterer =>
                caterer.tags.some(tag => filters.cuisines.includes(tag))
            );
        }

        // 3. Service Style Filter
        if (filters.serviceStyles.length > 0) {
            results = results.filter(caterer =>
                caterer.tags.some(tag => filters.serviceStyles.includes(tag))
            );
        }

        // 4. Dietary Filter
        if (filters.dietary.length > 0) {
            // Caterer must meet ALL selected dietary requirements for strict adherence
            results = results.filter(caterer =>
                filters.dietary.every(req => caterer.dietary.includes(req))
            );
        }

        // 5. Budget Filter
        results = results.filter(caterer =>
            caterer.priceValue >= filters.budget.min && caterer.priceValue <= filters.budget.max
        );

        // 6. Availability Date Filter
        if (filters.availabilityDate) {
            // In a real app, this would check against the caterer's calendar.
            // For mock purposes, we strictly match the mocked date string.
            results = results.filter(caterer => caterer.dateCode === filters.availabilityDate);
        }

        // 7. Sort Logic
        switch (sortBy) {
            case "Rating: High to Low":
                results.sort((a, b) => b.rating - a.rating);
                break;
            case "Price: Low to High":
                results.sort((a, b) => a.priceValue - b.priceValue);
                break;
            case "Distance: Near to Far":
                results.sort((a, b) => a.distance - b.distance);
                break;
            case "Recommended":
            default:
                // Mock recommended sorting logic (Top Rated first, then high rating)
                results.sort((a, b) => {
                    if (a.isTopRated && !b.isTopRated) return -1;
                    if (!a.isTopRated && b.isTopRated) return 1;
                    return b.rating - a.rating;
                });
        }

        return results;
    }, [filters, searchQuery, sortBy]);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-display overflow-hidden text-slate-900">
            {/* Extended Header to match the HTML layout top section layout */}
            <div className="bg-white border-b border-slate-200">
                <Header />
                <div className="bg-slate-50 border-t border-slate-200 px-6 py-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">Catering Search</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded cursor-pointer hover:border-[#137EED] transition-colors">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="font-bold text-slate-700 text-xs">New York, NY</span>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                </div>
            </div>

            {/* Main Flex Layout area */}
            <div className="flex flex-1 overflow-hidden h-[calc(100vh-105px)]">
                <FilterSidebar filters={filters} setFilters={setFilters} />

                <main className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                    <SearchHeader
                        count={searchResults.length}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <CatererGrid data={searchResults} />
                </main>
            </div>
        </div>
    );
};

export default FindCaterersPage;
