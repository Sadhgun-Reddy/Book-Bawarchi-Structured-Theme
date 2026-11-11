import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Inventory = () => {
    const [caterers, setCaterers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCaterer, setNewCaterer] = useState({
        name: '',
        priceValue: '',
        rating: 0,
        distance: '',
        isTopRated: false
    });

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

    useEffect(() => {
        fetchCaterers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this caterer?")) return;
        try {
            await api.delete(`/caterers/${id}`);
            setCaterers(caterers.filter(c => c._id !== id));
        } catch (error) {
            console.error("Error deleting caterer:", error);
            alert("Failed to delete caterer.");
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/caterers', {
                ...newCaterer,
                priceValue: Number(newCaterer.priceValue),
                distance: Number(newCaterer.distance),
                rating: Number(newCaterer.rating)
            });
            setIsModalOpen(false);
            setNewCaterer({ name: '', priceValue: '', rating: 0, distance: '', isTopRated: false });
            fetchCaterers();
        } catch (error) {
            console.error("Error adding caterer:", error);
            alert("Failed to add caterer.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Caterer Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#137EED] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors"
                >
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
                                    <th className="p-4 font-semibold text-right">Actions</th>
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
                                        <td className="p-4 text-sm text-right">
                                            <button
                                                onClick={() => handleDelete(caterer._id)}
                                                className="text-red-600 hover:text-red-800 font-medium text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Caterer Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">Add New Caterer</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                                <input required type="text" value={newCaterer.name} onChange={e => setNewCaterer({...newCaterer, name: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Price Value ($)</label>
                                    <input required type="number" value={newCaterer.priceValue} onChange={e => setNewCaterer({...newCaterer, priceValue: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                                    <input required type="number" step="0.1" min="0" max="5" value={newCaterer.rating} onChange={e => setNewCaterer({...newCaterer, rating: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Distance (miles)</label>
                                <input required type="number" step="0.1" value={newCaterer.distance} onChange={e => setNewCaterer({...newCaterer, distance: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm" />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="checkbox" id="topRated" checked={newCaterer.isTopRated} onChange={e => setNewCaterer({...newCaterer, isTopRated: e.target.checked})} className="rounded border-slate-300 text-[#137EED] focus:ring-[#137EED]" />
                                <label htmlFor="topRated" className="text-sm font-medium text-slate-700">Top Rated</label>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-[#137EED] hover:bg-[#1e3a8a] rounded shadow-sm">Save Caterer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
