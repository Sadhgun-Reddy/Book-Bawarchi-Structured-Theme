import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                // Backend GET /orders returns all orders for admin, or only the user's orders for users.
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching user orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return <div className="flex-1 p-8 text-center text-slate-500 font-display">Loading your orders...</div>;
    }

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display p-8">
            <div className="max-w-4xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
                        You have not placed any orders yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">
                                        Order from {order.catererId?.name || 'Unknown Caterer'}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-2">Order ID: {order._id}</p>
                                    <div className="flex flex-wrap gap-2 text-sm text-slate-600 mb-3">
                                        {order.items.map((item, idx) => (
                                            <span key={idx}>{item.quantity}x {item.name}{idx < order.items.length - 1 ? ',' : ''}</span>
                                        ))}
                                    </div>
                                    <p className="font-bold text-[#137EED]">Total: ${order.totalAmount}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <p className="text-xs text-slate-400">
                                        Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
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
