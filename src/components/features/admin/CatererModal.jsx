import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CatererModal = ({ isOpen, onClose, caterer, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (caterer) {
            reset(caterer);
        } else {
            reset({ name: '', priceValue: 0, rating: 0, distance: 0, isTopRated: false });
        }
    }, [caterer, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        setSubmitting(true);
        await onSave(data);
        setSubmitting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">{caterer ? 'Edit Caterer' : 'Add Caterer'}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                </div>
                <div className="p-4 overflow-y-auto max-h-[80vh]">
                    <form id="caterer-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                            <input {...register('name', { required: true })} className="w-full border rounded px-3 py-2" />
                            {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Price Value</label>
                                <input type="number" {...register('priceValue', { required: true, valueAsNumber: true })} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                                <input type="number" step="0.1" {...register('rating', { required: true, valueAsNumber: true })} className="w-full border rounded px-3 py-2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Distance (mi)</label>
                                <input type="number" step="0.1" {...register('distance', { required: true, valueAsNumber: true })} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" {...register('isTopRated')} className="w-4 h-4" />
                                    <span className="text-sm font-semibold text-slate-700">Top Rated</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-300 rounded hover:bg-slate-100 transition-colors">Cancel</button>
                    <button form="caterer-form" type="submit" disabled={submitting} className={`px-4 py-2 text-sm font-bold text-white bg-[#137EED] rounded hover:bg-blue-600 transition-colors shadow-sm ${submitting ? 'opacity-50' : ''}`}>
                        {submitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatererModal;
