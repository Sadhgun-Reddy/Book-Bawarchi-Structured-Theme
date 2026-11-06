import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/posSlice';
import api from '../../../services/api';

const CatererDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [caterer, setCaterer] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catererRes, menuRes] = await Promise.all([
                    api.get(`/caterers/${id}`),
                    api.get(`/menu/caterer/${id}`)
                ]);
                setCaterer(catererRes.data);
                setMenuItems(menuRes.data);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCart = (item) => {
        dispatch(addToCart({ ...item, id: item._id, catererId: caterer._id }));
    };

    if (loading) return <div className="p-8 text-center text-slate-500 flex-1">Loading caterer details...</div>;
    if (!caterer) return <div className="p-8 text-center text-red-500 flex-1">Caterer not found.</div>;

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display">
            <div className="max-w-4xl mx-auto w-full p-4 md:p-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{caterer.name}</h1>
                    <div className="flex gap-2 mb-4 text-sm text-slate-600">
                        <span>⭐ {caterer.rating}</span>
                        <span>•</span>
                        <span>{caterer.distance} mi</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {caterer.tags?.map((tag, i) => (
                            <span key={i} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{tag}</span>
                        ))}
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-4">Menu</h2>
                <div className="space-y-4">
                    {menuItems.length === 0 ? (
                        <p className="text-slate-500 italic">No menu items found for this caterer.</p>
                    ) : (
                        menuItems.map((item) => (
                            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                                    <p className="text-sm text-slate-500">{item.description}</p>
                                    <p className="font-semibold text-[#137EED] mt-1">${item.price}</p>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="bg-[#137EED] text-white px-4 py-2 rounded font-semibold text-sm hover:bg-blue-600 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={() => isAuthenticated ? navigate('/checkout') : navigate('/login')}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatererDetailsPage;
