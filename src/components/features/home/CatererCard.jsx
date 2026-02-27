import React from 'react';
import { Star } from 'lucide-react';

const CatererCard = ({ caterer }) => {
    return (
        <div className="border border-slate-200 rounded bg-white overflow-hidden shadow-sm hover:shadow transition-shadow flex flex-col">
            <div className="aspect-[4/3] bg-slate-100 border-b border-slate-200 flex items-center justify-center text-slate-400 text-sm font-medium">
                [ {caterer.name} Image ]
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-1 mb-2">
                    {caterer.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-bold text-slate-900 leading-tight flex-1">{caterer.name}</h3>
                    <div className="flex items-center space-x-1 shrink-0 bg-[#137EED] text-white px-1.5 py-0.5 rounded text-xs font-medium">
                        <Star className="w-3 h-3 fill-current" strokeWidth={1.5} />
                        <span>{caterer.rating}</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">{caterer.specialty}</p>
                <p className="text-sm text-slate-600 line-clamp-2 mt-auto">
                    {caterer.description}
                </p>
            </div>
            <button className="w-full text-center py-2.5 bg-slate-50 text-[#137EED] text-sm font-semibold border-t border-slate-200 hover:bg-slate-100 transition-colors">
                View Menu
            </button>
        </div>
    );
};

export default CatererCard;
