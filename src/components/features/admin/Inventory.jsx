import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { Plus, X, Edit, Trash2 } from 'lucide-react';

const Inventory = () => {
    const [caterers, setCaterers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCaterer, setEditingCaterer] = useState(null);
    const [formData, setFormData] = useState({ name: '', priceValue: '', rating: '', distance: '' });

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

    const openModal = (caterer = null) => {
        if (caterer) {
            setEditingCaterer(caterer);
            setFormData({
                name: caterer.name,
                priceValue: caterer.priceValue,
                rating: caterer.rating,
                distance: caterer.distance,
            });
        } else {
            setEditingCaterer(null);
            setFormData({ name: '', priceValue: '', rating: '', distance: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCaterer(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingCaterer) {
                await api.put(`/caterers/${editingCaterer._id}`, formData);
            } else {
                await api.post('/caterers', formData);
            }
            fetchCaterers();
            closeModal();
        } catch (error) {
            console.error("Error saving caterer:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this caterer?')) {
            try {
                await api.delete(`/caterers/${id}`);
                fetchCaterers();
            } catch (error) {
                console.error("Error deleting caterer:", error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Caterer Management</h1>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-[#137EED] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors"
                >
                    <Plus size={16} /> Add Caterer
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
                                        <td className="p-4 text-sm text-slate-600 text-right flex justify-end gap-2">
                                            <button onClick={() => openModal(caterer)} className="p-1.5 rounded bg-blue-50 text-[#137EED] hover:bg-blue-100 transition-colors"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(caterer._id)} className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-slate-200">
                            <h2 className="text-lg font-bold text-slate-800">{editingCaterer ? 'Edit Caterer' : 'Add Caterer'}</h2>
                            <button onClick={closeModal} className="text-slate-500 hover:text-slate-700"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Price Value ($)</label>
                                    <input required type="number" value={formData.priceValue} onChange={e => setFormData({...formData, priceValue: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                                    <input type="number" step="0.1" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Distance (mi)</label>
                                <input type="number" step="0.1" value={formData.distance} onChange={e => setFormData({...formData, distance: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                            </div>
                            <div className="pt-4 flex justify-end gap-2">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#137EED] rounded hover:bg-blue-600">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
