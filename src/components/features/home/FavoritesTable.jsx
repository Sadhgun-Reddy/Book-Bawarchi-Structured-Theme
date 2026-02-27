import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

const tableData = [
    { id: 1, name: "Hyderabadi Biryani", category: "Rice Dish", catColor: "bg-blue-50 text-blue-700 border-blue-200", time: "60 mins", rating: "4.9" },
    { id: 2, name: "Butter Chicken", category: "Curry", catColor: "bg-orange-50 text-orange-700 border-orange-200", time: "45 mins", rating: "4.8" },
    { id: 3, name: "Paneer Tikka", category: "Vegetarian", catColor: "bg-green-50 text-green-700 border-green-200", time: "30 mins", rating: "4.7" },
];

const FavoritesTable = () => {
    return (
        <div className="px-4 py-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                <h2 className="text-[22px] font-bold text-slate-900 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#137EED] rounded" />
                    Community Favorites
                </h2>
                <a href="#" className="hidden sm:flex items-center gap-1 text-[13px] font-bold text-slate-500 hover:text-[#137EED] transition-colors">
                    Browse All Recipes <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
            </div>

            <div className="border border-slate-200 rounded overflow-x-auto bg-white">
                <table className="w-full text-left text-[14px] whitespace-nowrap">
                    <thead className="text-slate-500 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-5" scope="col">Dish Name</th>
                            <th className="px-6 py-5" scope="col">Category</th>
                            <th className="px-6 py-5" scope="col">Prep Time</th>
                            <th className="px-6 py-5" scope="col">Rating</th>
                            <th className="px-6 py-5" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tableData.map(row => (
                            <tr key={row.id} className="hover:bg-slate-50 transition-colors bg-white">
                                <td className="px-6 py-5 font-extrabold text-slate-800">{row.name}</td>
                                <td className="px-6 py-5">
                                    <span className={`inline-flex px-2 py-1 rounded border text-[10px] uppercase font-extrabold tracking-wider ${row.catColor}`}>
                                        {row.category}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-slate-500 text-[13px]">{row.time}</td>
                                <td className="px-6 py-5 flex items-center gap-1.5 font-bold text-slate-800 text-[13px]">
                                    <Star className="w-[14px] h-[14px] text-[#137EED] fill-current" /> {row.rating}
                                </td>
                                <td className="px-6 py-5">
                                    <button className="text-[#137EED] font-bold text-[14px] hover:underline">Order Now</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FavoritesTable;
