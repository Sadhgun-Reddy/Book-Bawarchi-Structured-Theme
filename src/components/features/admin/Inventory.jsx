import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Inventory = () => {
    const [caterers, setCaterers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaterers = async () => {
            try {
                const response = await api.get('/caterers');
                setCaterers(response.data);
            } catch (error) {
                console.error("Error fetching caterers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCaterers();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Caterer Management</h1>
                <button className="bg-[#137EED] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors">
                    Add Caterer
                </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading caterers...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Price Value</th>
                                    <th className="p-4 font-semibold">Rating</th>
                                    <th className="p-4 font-semibold">Distance</th>
                                    <th className="p-4 font-semibold">Top Rated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {caterers.map(caterer => (
                                    <tr key={caterer._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-sm text-slate-800">{caterer.name}</td>
                                        <td className="p-4 text-sm text-slate-800">${caterer.priceValue}</td>
                                        <td className="p-4 text-sm text-slate-800">{caterer.rating}</td>
                                        <td className="p-4 text-sm text-slate-600">{caterer.distance} mi</td>
                                        <td className="p-4 text-sm text-slate-600">{caterer.isTopRated ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;
