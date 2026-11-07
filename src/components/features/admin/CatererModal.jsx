import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CatererModal = ({ isOpen, onClose, onSave, caterer = null }) => {
    const [formData, setFormData] = useState({
        name: "",
        priceValue: 0,
        rating: 0,
        distance: 0,
        tags: "",
        dietary: "",
        isTopRated: false
    });

    useEffect(() => {
        if (caterer) {
            setFormData({
                ...caterer,
                tags: caterer.tags?.join(", ") || "",
                dietary: caterer.dietary?.join(", ") || ""
            });
        } else {
            setFormData({
                name: "",
                priceValue: 0,
                rating: 0,
                distance: 0,
                tags: "",
                dietary: "",
                isTopRated: false
            });
        }
    }, [caterer, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            priceValue: Number(formData.priceValue),
            rating: Number(formData.rating),
            distance: Number(formData.distance),
            tags: formData.tags ? formData.tags.split(",").map(s => s.trim()) : [],
            dietary: formData.dietary ? formData.dietary.split(",").map(s => s.trim()) : [],
        };
        onSave(payload);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">{caterer ? "Edit Caterer" : "Add Caterer"}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137EED] outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Price Value ($)</label>
                            <input type="number" name="priceValue" value={formData.priceValue} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137EED] outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137EED] outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Distance (mi)</label>
                            <input type="number" step="0.1" name="distance" value={formData.distance} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137EED] outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                        <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137EED] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Dietary (comma separated)</label>
                        <input type="text" name="dietary" value={formData.dietary} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137EED] outline-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="isTopRated" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} className="w-4 h-4 text-[#137EED] rounded border-slate-300" />
                        <label htmlFor="isTopRated" className="text-sm font-semibold text-slate-700">Top Rated</label>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
                        <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 font-semibold text-white bg-[#137EED] rounded-lg hover:bg-blue-600">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CatererModal;
