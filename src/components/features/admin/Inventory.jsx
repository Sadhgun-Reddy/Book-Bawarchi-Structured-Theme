import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import CatererModal from './CatererModal';

const Inventory = () => {
    const [caterers, setCaterers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCaterer, setEditingCaterer] = useState(null);
    const navigate = useNavigate();

    const fetchCaterers = async () => {
        try {
            setLoading(true);
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

    const handleSave = async (data) => {
        try {
            if (editingCaterer) {
                await api.put(`/caterers/${editingCaterer._id}`, data);
            } else {
                await api.post('/caterers', data);
            }
            setIsModalOpen(false);
            fetchCaterers();
        } catch (error) {
            console.error("Error saving caterer:", error);
            alert("Failed to save caterer.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this caterer?")) return;
        try {
            await api.delete(`/caterers/${id}`);
            fetchCaterers();
        } catch (error) {
            console.error("Error deleting caterer:", error);
            alert("Failed to delete caterer.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Caterer Management</h1>
                <button onClick={() => { setEditingCaterer(null); setIsModalOpen(true); }} className="bg-[#137EED] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors">
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
                                    <th className="p-4 font-semibold">Actions</th>
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
                                        <td className="p-4 text-sm text-slate-600 flex gap-2">
                                            <button onClick={() => { setEditingCaterer(caterer); setIsModalOpen(true); }} className="text-[#137EED] hover:underline">Edit</button>
                                            <button onClick={() => navigate(`/dashboard/inventory/${caterer._id}/menu`)} className="text-green-600 hover:underline">Menu</button>
                                            <button onClick={() => handleDelete(caterer._id)} className="text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <CatererModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                caterer={editingCaterer}
            />
        </div>
    );
};

export default Inventory;
