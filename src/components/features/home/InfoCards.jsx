import React from 'react';
import { Grid, UsersRound, Heart, ChevronRight } from 'lucide-react';

const InfoCards = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Find Event Host Box */}
                <div className="border border-slate-200 rounded p-12 bg-white shrink relative overflow-hidden group hover:border-[#137EED]/50 transition-colors">
                    <Grid className="absolute -right-4 -top-4 w-40 h-40 text-slate-50 opacity-100 group-hover:text-[#137EED]/5 transition-colors" strokeWidth={0.5} />
                    <div className="relative z-10 flex flex-col items-start h-full gap-5">
                        <div className="w-12 h-12 rounded bg-blue-50 flex items-center justify-center">
                            <UsersRound className="w-5 h-5 text-[#137EED]" />
                        </div>
                        <div>
                            <h3 className="text-[20px] font-bold text-slate-900 mb-3 tracking-tight">For Event Hosts</h3>
                            <p className="text-[14px] text-slate-500 leading-relaxed max-w-[340px]">
                                Access verified cooks with transparent pricing and real user reviews. No hidden fees, just great food and reliable service.
                            </p>
                        </div>
                        <a href="#" className="inline-flex items-center text-[14px] font-bold text-[#137EED] hover:text-[#1e3a8a] transition-colors mt-2">
                            Browse Verification Standards <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                    </div>
                </div>

                {/* For Communities box */}
                <div className="border border-slate-200 rounded p-12 bg-white shrink relative overflow-hidden group hover:border-[#137EED]/50 transition-colors">
                    <Heart className="absolute -right-6 -top-6 w-[160px] h-[160px] text-slate-50 opacity-100 group-hover:text-[#137EED]/5 transition-colors" strokeWidth={0.5} />
                    <div className="relative z-10 flex flex-col items-start h-full gap-5">
                        <div className="w-12 h-12 rounded bg-blue-50 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-[#137EED]" />
                        </div>
                        <div>
                            <h3 className="text-[20px] font-bold text-slate-900 mb-3 tracking-tight">For Communities</h3>
                            <p className="text-[14px] text-slate-500 leading-relaxed max-w-[340px]">
                                Easily coordinate meal trains and food support for those in need. Organize potlucks and track contributions in real-time.
                            </p>
                        </div>
                        <a href="#" className="inline-flex items-center text-[14px] font-bold text-[#137EED] hover:text-[#1e3a8a] transition-colors mt-2">
                            Start a Meal Train <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCards;
