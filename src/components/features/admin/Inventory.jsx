import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Inventory = () => {
    const [caterers, setCaterers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCaterer, setEditingCaterer] = useState(null);
    const [formData, setFormData] = useState({ name: '', priceValue: '', rating: '', distance: '', isTopRated: false });

    // Menu Management State
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [selectedCatererForMenu, setSelectedCatererForMenu] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loadingMenu, setLoadingMenu] = useState(false);
    const [menuFormData, setMenuFormData] = useState({ name: '', description: '', price: '' });

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

    const openAddModal = () => {
        setEditingCaterer(null);
        setFormData({ name: '', priceValue: '', rating: '', distance: '', isTopRated: false });
        setShowModal(true);
    };

    const openEditModal = (caterer) => {
        setEditingCaterer(caterer);
        setFormData({
            name: caterer.name,
            priceValue: caterer.priceValue,
            rating: caterer.rating,
            distance: caterer.distance,
            isTopRated: caterer.isTopRated
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this caterer?")) return;
        try {
            await api.delete(`/caterers/${id}`);
            setCaterers(caterers.filter(c => c._id !== id));
        } catch (error) {
            console.error("Error deleting caterer:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCaterer) {
                await api.put(`/caterers/${editingCaterer._id}`, formData);
            } else {
                await api.post('/caterers', formData);
            }
            setShowModal(false);
            fetchCaterers();
        } catch (error) {
            console.error("Error saving caterer:", error);
        }
    };

    // Menu Management Functions
    const openMenuModal = async (caterer) => {
        setSelectedCatererForMenu(caterer);
        setShowMenuModal(true);
        setLoadingMenu(true);
        try {
            const response = await api.get(`/menu/caterer/${caterer._id}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        } finally {
            setLoadingMenu(false);
        }
    };

    const handleMenuSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...menuFormData, catererId: selectedCatererForMenu._id };
            const response = await api.post('/menu', payload);
            setMenuItems([...menuItems, response.data]);
            setMenuFormData({ name: '', description: '', price: '' });
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };

    const handleDeleteMenu = async (id) => {
        if (!window.confirm("Delete this menu item?")) return;
        try {
            await api.delete(`/menu/${id}`);
            setMenuItems(menuItems.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting menu item:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Caterer Management</h1>
                <button onClick={openAddModal} className="bg-[#137EED] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors">
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
                                        <td className="p-4 text-sm text-slate-800 font-medium">{caterer.name}</td>
                                        <td className="p-4 text-sm text-slate-800">${caterer.priceValue}</td>
                                        <td className="p-4 text-sm text-slate-800">{caterer.rating}</td>
                                        <td className="p-4 text-sm text-slate-600">{caterer.distance} mi</td>
                                        <td className="p-4 text-sm text-slate-600">{caterer.isTopRated ? 'Yes' : 'No'}</td>
                                        <td className="p-4 text-sm text-slate-600 text-right space-x-2">
                                            <button onClick={() => openMenuModal(caterer)} className="text-slate-600 hover:underline">Menu</button>
                                            <button onClick={() => openEditModal(caterer)} className="text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => handleDelete(caterer._id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{editingCaterer ? 'Edit Caterer' : 'Add Caterer'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Name</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Price Value</label>
                                <input type="number" required value={formData.priceValue} onChange={e => setFormData({...formData, priceValue: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Rating</label>
                                <input type="number" step="0.1" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Distance (miles)</label>
                                <input type="number" step="0.1" value={formData.distance} onChange={e => setFormData({...formData, distance: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="topRated" checked={formData.isTopRated} onChange={e => setFormData({...formData, isTopRated: e.target.checked})} />
                                <label htmlFor="topRated" className="text-sm font-semibold">Top Rated</label>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 rounded font-semibold hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#137EED] text-white rounded font-semibold hover:bg-blue-600">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showMenuModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Menu for {selectedCatererForMenu?.name}</h2>
                            <button onClick={() => setShowMenuModal(false)} className="text-slate-500 hover:text-slate-800">Close</button>
                        </div>

                        <div className="flex-1 overflow-y-auto mb-6">
                            {loadingMenu ? (
                                <p className="text-center text-slate-500">Loading menu...</p>
                            ) : (
                                <div className="space-y-2">
                                    {menuItems.map(item => (
                                        <div key={item._id} className="flex justify-between items-center p-3 border border-slate-200 rounded">
                                            <div>
                                                <p className="font-bold text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-500">{item.description}</p>
                                                <p className="text-sm font-semibold text-[#137EED]">${item.price}</p>
                                            </div>
                                            <button onClick={() => handleDeleteMenu(item._id)} className="text-red-600 text-sm hover:underline">Delete</button>
                                        </div>
                                    ))}
                                    {menuItems.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No menu items found.</p>}
                                </div>
                            )}
                        </div>

                        <div className="border-t border-slate-200 pt-4 mt-auto">
                            <h3 className="font-bold text-sm mb-3">Add New Item</h3>
                            <form onSubmit={handleMenuSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                                <div className="flex-1">
                                    <input type="text" placeholder="Name" required value={menuFormData.name} onChange={e => setMenuFormData({...menuFormData, name: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <input type="text" placeholder="Description" value={menuFormData.description} onChange={e => setMenuFormData({...menuFormData, description: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                                </div>
                                <div className="w-24">
                                    <input type="number" placeholder="Price" required value={menuFormData.price} onChange={e => setMenuFormData({...menuFormData, price: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                                </div>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 text-sm whitespace-nowrap">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
