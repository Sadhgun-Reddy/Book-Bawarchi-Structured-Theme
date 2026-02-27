import React from 'react';

const steps = [
    { num: 1, title: "Search Local", desc: "Filter by cuisine, budget, and guest count to find the perfect match." },
    { num: 2, title: "Customize", desc: "Collaborate with chefs to tailor the menu to your dietary needs." },
    { num: 3, title: "Book Securely", desc: "Secure your date with transparent pricing and payment protection." },
    { num: 4, title: "Enjoy", desc: "Relax and enjoy the event while professionals handle the food." },
];

const HowItWorks = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row bg-slate-900 rounded overflow-hidden border border-slate-800">
                <div className="p-8 lg:p-10 lg:w-1/3 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950">
                    <h2 className="text-3xl font-extrabold text-white mb-4">How it works</h2>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">From discovery to dining, we've streamlined the process to ensure quality and reliability at every step.</p>
                    <button className="w-fit px-6 py-2.5 rounded bg-[#137EED] hover:bg-[#1e3a8a] text-white font-bold text-sm transition-colors border-none">
                        Get Started Now
                    </button>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-800">
                    {steps.map(step => (
                        <div key={step.num} className="p-6 lg:p-8 flex flex-col gap-4 group hover:bg-slate-800/50 transition-colors">
                            <div className="h-10 w-10 rounded border border-slate-700 bg-slate-800 group-hover:bg-[#137EED] group-hover:border-[#137EED] text-white flex items-center justify-center font-bold text-sm transition-colors">
                                {step.num}
                            </div>
                            <h3 className="font-bold text-lg text-white">{step.title}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
