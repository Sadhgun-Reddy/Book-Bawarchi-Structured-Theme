import React, { useEffect, useState } from 'react';
import { ChevronRight, Star, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const FeaturedCaterers = () => {
    const navigate = useNavigate();
    const [catererData, setCatererData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaterers = async () => {
            try {
                const response = await api.get('/caterers');
                // Slice to only show top 4 featured
                setCatererData(response.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching caterers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCaterers();
    }, []);

    if (loading) {
        return <div className="max-w-7xl mx-auto px-4 py-8">Loading featured caterers...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#137EED] rounded" />
                    Featured Caterers
                </h2>
                <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-[#137EED] transition-colors">
                    View All <ChevronRight className="w-4 h-4" />
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {catererData.map((caterer) => (
                    <article key={caterer._id} className="flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow transition-shadow group">
                        <div className="relative h-40 bg-slate-100 overflow-hidden flex items-center justify-center">
                             {/* Fallback image as there's no img stored in db yet */}
                             <div className="text-slate-400">
                                <Utensils className="w-12 h-12 mb-2 mx-auto" />
                             </div>
                            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm border border-slate-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-slate-600">
                                {caterer.tags?.[0] || "Caterer"}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-2 flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-slate-900 text-lg leading-tight">{caterer.name}</h3>
                                <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-600">${caterer.priceValue}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-[#137EED]">
                                <Star className="w-4 h-4 fill-current" /> {caterer.rating}
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2 mt-1 mb-3">{caterer.tags?.join(', ')}</p>

                            <div className="mt-auto pt-3 border-t border-slate-200">
                                <button onClick={() => navigate(`/caterer/${caterer._id || caterer.id}`)} className="w-full py-2.5 text-sm font-bold text-[#137EED] bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 hover:border-blue-200 rounded transition-colors text-center">
                                    View Menu
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCaterers;
