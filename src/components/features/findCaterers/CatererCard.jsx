import React from 'react';
import { Star, Navigation, Clock, Verified } from 'lucide-react';

const CatererCard = ({ caterer }) => {
    return (
        <div className="bg-white border border-slate-200 rounded overflow-hidden hover:border-[#137EED]/40 hover:shadow-sm transition-all group flex flex-col">
            <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                    alt={caterer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={caterer.image}
                />
                <div className="absolute top-2 right-2 bg-white/95 text-slate-800 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                    {caterer.priceTier}
                </div>

                {caterer.isTopRated ? (
                    <div className="absolute bottom-2 left-2 bg-[#137EED] text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1">
                        <Verified className="w-3 h-3" />
                        <span>Top Rated</span>
                    </div>
                ) : (
                    <div className="absolute bottom-2 left-2 bg-white/90 text-slate-800 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#137EED]" />
                        <span>{caterer.availability}</span>
                    </div>
                )}
            </div>

            <div className="p-3 flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-slate-900 text-base font-bold leading-tight truncate pr-2">{caterer.name}</h3>
                    <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                        <Star className="w-3 h-3 text-[#137EED] fill-current" />
                        <span className="text-[#137EED] text-xs font-bold">{caterer.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs mb-2 font-medium">
                    <span className="flex items-center gap-0.5">
                        <Navigation className="w-3 h-3" /> {caterer.distance} mi
                    </span>
                    <span>•</span>
                    <span>Min. {caterer.minPlates} plates</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                    {caterer.tags.map((tag, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                            {tag}
                        </span>
                    ))}
                    {caterer.dietary.slice(0, 1).map((diet, idx) => (
                        <span key={`diet-${idx}`} className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                            {diet}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex gap-2 pt-2 border-t border-slate-200">
                    <button className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded transition-colors text-center">
                        View Profile
                    </button>
                    <button className="flex-1 bg-[#137EED] hover:bg-[#1e3a8a] text-white text-xs font-bold py-2 rounded transition-colors text-center shadow-sm">
                        Enquire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatererCard;
