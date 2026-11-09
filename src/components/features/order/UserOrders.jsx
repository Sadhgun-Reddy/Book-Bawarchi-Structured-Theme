import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const UserOrders = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, navigate]);

    if (!user) return null;

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display">
            <div className="max-w-4xl mx-auto w-full p-4 md:p-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">My Orders</h1>

                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
                        Loading orders...
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                        <p className="text-slate-500 mb-4">You have no order history.</p>
                        <button onClick={() => navigate('/find')} className="text-[#137EED] font-semibold hover:underline">
                            Browse Caterers
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-slate-800">{order.catererId?.name || 'Unknown Caterer'}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-1">
                                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Items: {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                    </p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-sm text-slate-500 mb-1">Total</p>
                                    <p className="text-2xl font-bold text-[#137EED]">${order.totalAmount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserOrders;
