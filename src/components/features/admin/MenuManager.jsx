import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";

const MenuManager = () => {
    const { catererId } = useParams();
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const [caterer, setCaterer] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", price: 0 });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [catererRes, menuRes] = await Promise.all([
                api.get(`/caterers/${catererId}`),
                api.get(`/menu/caterer/${catererId}`)
            ]);
            setCaterer(catererRes.data);
            setMenuItems(menuRes.data);
        } catch (error) {
            console.error("Error fetching menu data:", error);
            alert("Failed to load menu data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [catererId]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await api.post("/menu", {
                catererId,
                name: formData.name,
                description: formData.description,
                price: Number(formData.price)
            });
            setFormData({ name: "", description: "", price: 0 });
            setIsFormOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error creating menu item", error);
            alert("Failed to create menu item");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <button onClick={() => navigate("/dashboard/inventory")} className="text-sm text-slate-500 hover:underline mb-2">&larr; Back to Inventory</button>
                    <h1 className="text-2xl font-bold text-slate-800">Menu Management</h1>
                    {caterer && <p className="text-sm text-slate-600">Managing menu for <span className="font-semibold">{caterer.name}</span></p>}
                </div>
                <button onClick={() => setIsFormOpen(true)} className="bg-[#137EED] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors">
                    Add Menu Item
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">New Menu Item</h3>
                    <form onSubmit={handleSave} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                            <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                        </div>
                        <div className="w-32">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
                            <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                        </div>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700">Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading menu items...</div>
                ) : menuItems.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No menu items found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Description</th>
                                    <th className="p-4 font-semibold">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems.map(item => (
                                    <tr key={item._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-sm font-semibold text-slate-800">{item.name}</td>
                                        <td className="p-4 text-sm text-slate-600">{item.description}</td>
                                        <td className="p-4 text-sm font-bold text-[#137EED]">${item.price}</td>
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

export default MenuManager;
