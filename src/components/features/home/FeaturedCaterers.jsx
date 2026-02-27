import React from 'react';
import { ChevronRight, Star, Leaf, Droplets, Flame, Utensils } from 'lucide-react';

const catererData = [
    {
        id: 1,
        name: "Green Leaf Veg",
        price: "$$",
        rating: "4.6",
        reviews: "80+",
        desc: "Specializing in organic, farm-to-table vegan dishes for large gatherings.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjWXb6xsuG2V4LXCjnCBZAT1y3q4AysjTJBjIM6GLcGdv95r5ZEVcj5pc69b5m8ShUX370xvNL4Y8u5mJcwcYSq0VBg7mPvGj9xQ_jRNFxflxAq8RMd8tAStjwIgu4iIwKMFl3xYLYu-3KmeAGMEvSScpytVTb1mcikdgDLN8AQtz-cEK2yT5gPqZ6rXm0WW8jaUkcCqhSsCGluST51Eeb0ffBn0aenzWeAvVugoAc3FjRs4siNxmgMosd6wElxCFgzaX8eQu1Pas",
        tag: "Vegan",
        TagIcon: Leaf,
        tagColor: "text-green-600"
    },
    {
        id: 2,
        name: "Urban Tadka",
        price: "$$$",
        rating: "4.7",
        reviews: "35+",
        desc: "Authentic Mughlai cuisine with rich gravies and tandoori specials.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgr83Rp4VuEKG83IL4GafxFs9Ds7NPu2s19B4UzZlCF8sUQPa1oNJ0VX7hDuxZ8vRqQYBjMXBpC1nsMFtY3kf7UQsUag91jyH_J7HwbbiOS4TVmifnSZa9j_vQs1UMB5cT5b6kDKh5VRHRr-nfC3KHgorBet0RlH7ohCgUXxFrr7uKJ6qq561b5uoECfpVvAclhJrFnRBDlymRq7OVWSh1AxpFV04sh-CAj9rHP9LkQ8ooJa-1Sio6xxYkRJYzparSIrWbJjZscQ8",
        tag: "Mughlai",
        TagIcon: Flame,
        tagColor: "text-yellow-600"
    },
    {
        id: 3,
        name: "Mama's Kitchen",
        price: "$",
        rating: "4.9",
        reviews: "120+",
        desc: "Hearty, homemade meals prepared with love and traditional recipes.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMlyhrWXdv4u3F_iovJa_3MzFf8Kk1hzLUwcQP4bDUcYXWhQb4lWlcGnXjIG4e3GDoHxiFEKHf36KrYz2Nq-AXe0f_f1ymPQa00aGxkjYhKhF74iWNJCzjV2Stb4rfY4MGY4WFgWC8pDU7B_A5vnDBFDKQIOVYWcYWU2b-S582XVrpSkaXRB_ngPBzBeMCTEJSVXyE4iN3TjRat0sy5Zn75L9Ftzsh-dIR5eMlvhE07uefv7N_MkfPLCmP7m_G19ixSCSgcwLoNGM",
        tag: "Home Style",
        TagIcon: Droplets,
        tagColor: "text-slate-600"
    },
    {
        id: 4,
        name: "Tokyo Bites",
        price: "$$$",
        rating: "4.8",
        reviews: "52",
        desc: "Premium sushi platters and bento boxes for corporate events.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUtKNLs2bIff3bJjfby94o6OvEaPmBhu3wtNu8XAwnPhx-RphZZSWhl6N6O3z7jgsYeb-lPiKFqGunfhWlgOIBn5fwArIFRl4Zvaa4BSbNa1p4dtrgNbIHeQhnCD2hWNqffyyqyRFJeibDxbQkRJ_QvZhCQZEQNu9qWuuV4nduNi4CgvUNLZNKj0d-Nvia84a0RcDiAMf3ZMi0974fC1qCOUFJQTUbq6Q2MFoZDs5Dj7H4OfpkKQl_IMAQEcSSJGXXIJJhxOHSz6w",
        tag: "Asian",
        TagIcon: Utensils,
        tagColor: "text-red-600"
    }
];

const FeaturedCaterers = () => {
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
                    <article key={caterer.id} className="flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow transition-shadow group">
                        <div className="relative h-40 bg-slate-100 overflow-hidden">
                            <img alt={caterer.name} src={caterer.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className={`absolute top-2 left-2 bg-white/95 backdrop-blur-sm border border-slate-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${caterer.tagColor}`}>
                                <caterer.TagIcon className="w-3 h-3" /> {caterer.tag}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-2 flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-slate-900 text-lg leading-tight">{caterer.name}</h3>
                                <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-600">{caterer.price}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-[#137EED]">
                                <Star className="w-4 h-4 fill-current" /> {caterer.rating} <span className="text-slate-500 font-medium text-xs ml-1">({caterer.reviews})</span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2 mt-1 mb-3">{caterer.desc}</p>

                            <div className="mt-auto pt-3 border-t border-slate-200">
                                <button className="w-full py-2.5 text-sm font-bold text-[#137EED] bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 hover:border-blue-200 rounded transition-colors text-center">
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
