import React from 'react';

// Reusable accordion component mapping exactly to Light Mode
const FilterAccordion = ({ title, defaultOpen = false, children }) => {
    return (
        <div className="border-b border-slate-200">
            <details className="group" open={defaultOpen}>
                <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-bold text-slate-900">{title}</span>
                    <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform text-[20px]">expand_more</span>
                </summary>
                <div className="px-4 pb-4 space-y-2">
                    {children}
                </div>
            </details>
        </div>
    );
};

// Custom checkbox for dense Light Mode design
const CheckboxItem = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer group/item">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded border-slate-300 text-[#137EED] focus:ring-[#137EED] transition-colors"
            />
            <span className="text-sm font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors">
                {label}
            </span>
        </label>
    );
};

const FilterSidebar = ({ filters, setFilters }) => {

    const handleCuisineToggle = (cuisine) => {
        setFilters(prev => ({
            ...prev,
            cuisines: prev.cuisines.includes(cuisine)
                ? prev.cuisines.filter(c => c !== cuisine)
                : [...prev.cuisines, cuisine]
        }));
    };

    const handleServiceToggle = (style) => {
        setFilters(prev => ({
            ...prev,
            serviceStyles: prev.serviceStyles.includes(style)
                ? prev.serviceStyles.filter(s => s !== style)
                : [...prev.serviceStyles, style]
        }));
    };

    const handleDietaryToggle = (diet) => {
        setFilters(prev => ({
            ...prev,
            dietary: prev.dietary.includes(diet)
                ? prev.dietary.filter(d => d !== diet)
                : [...prev.dietary, diet]
        }));
    };

    const handleBudgetChange = (key, value) => {
        const val = parseInt(value) || 0;
        setFilters(prev => ({
            ...prev,
            budget: { ...prev.budget, [key]: val }
        }));
    };

    const resetFilters = () => {
        setFilters({
            cuisines: [],
            serviceStyles: ['Buffet'],
            dietary: [],
            budget: { min: 15, max: 150 },
            availabilityDate: ""
        });
    };

    return (
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 hidden md:flex">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white/90 sticky top-0 z-10 backdrop-blur-sm">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Filters</h2>
                <button onClick={resetFilters} className="text-xs text-[#137EED] hover:text-[#1e3a8a] font-bold transition-colors">
                    Reset All
                </button>
            </div>

            <FilterAccordion title="Cuisine Type" defaultOpen={true}>
                {['North Indian', 'South Indian', 'Chinese', 'Italian', 'Mexican', 'Continental'].map(cuisine => (
                    <CheckboxItem
                        key={cuisine}
                        label={cuisine}
                        checked={filters.cuisines.includes(cuisine)}
                        onChange={() => handleCuisineToggle(cuisine)}
                    />
                ))}
            </FilterAccordion>

            <FilterAccordion title="Service Style" defaultOpen={true}>
                {['Buffet', 'Plated Sit-down', 'Drop-off / Boxed'].map(style => (
                    <CheckboxItem
                        key={style}
                        label={style}
                        checked={filters.serviceStyles.includes(style)}
                        onChange={() => handleServiceToggle(style)}
                    />
                ))}
            </FilterAccordion>

            {/* Budget Per Plate */}
            <div className="border-b border-slate-200">
                <details className="group" open={true}>
                    <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <span className="text-sm font-bold text-slate-900">Budget Per Plate</span>
                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform text-[20px]">expand_more</span>
                    </summary>
                    <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1 flex-1 flex items-center">
                                <span className="text-xs text-slate-400 font-bold">$</span>
                                <input
                                    className="bg-transparent border-none p-0 w-full text-sm font-bold text-slate-900 focus:ring-0 ml-1"
                                    type="number"
                                    value={filters.budget.min}
                                    onChange={(e) => handleBudgetChange('min', e.target.value)}
                                />
                            </div>
                            <span className="text-slate-400 text-sm font-bold">-</span>
                            <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1 flex-1 flex items-center">
                                <span className="text-xs text-slate-400 font-bold">$</span>
                                <input
                                    className="bg-transparent border-none p-0 w-full text-sm font-bold text-slate-900 focus:ring-0 ml-1"
                                    type="number"
                                    value={filters.budget.max}
                                    onChange={(e) => handleBudgetChange('max', e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Visual dual slider */}
                        <div className="relative h-1 bg-slate-200 rounded-full mb-2">
                            <div className="absolute left-[10%] right-[20%] top-0 bottom-0 bg-[#137EED] rounded-full"></div>
                            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border border-slate-300 shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                            <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border border-slate-300 shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                        </div>
                    </div>
                </details>
            </div>

            <FilterAccordion title="Dietary Requirements" defaultOpen={false}>
                {['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free'].map(diet => (
                    <CheckboxItem
                        key={diet}
                        label={diet}
                        checked={filters.dietary.includes(diet)}
                        onChange={() => handleDietaryToggle(diet)}
                    />
                ))}
            </FilterAccordion>

            {/* Availability */}
            <div className="border-b border-slate-200">
                <details className="group" open={true}>
                    <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <span className="text-sm font-bold text-slate-900">Availability</span>
                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform text-[20px]">expand_more</span>
                    </summary>
                    <div className="px-4 pb-4">
                        <input
                            type="date"
                            value={filters.availabilityDate}
                            onChange={(e) => setFilters(prev => ({ ...prev, availabilityDate: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium rounded p-2 focus:ring-[#137EED] focus:border-[#137EED] transition-colors cursor-pointer"
                        />
                    </div>
                </details>
            </div>

        </aside>
    );
};

export default FilterSidebar;
