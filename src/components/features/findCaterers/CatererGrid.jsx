import React from 'react';
import CatererCard from './CatererCard';

const CatererGrid = ({ data }) => {
    if (data.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-900">No caterers found</h3>
                    <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search query.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {data.map(caterer => (
                    <CatererCard key={caterer.id} caterer={caterer} />
                ))}
            </div>
        </div>
    );
};

export default CatererGrid;
