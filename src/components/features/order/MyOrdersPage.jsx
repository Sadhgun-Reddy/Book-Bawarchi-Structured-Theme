import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display">
            <div className="max-w-4xl mx-auto w-full p-4 md:p-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">My Orders</h1>

                {loading ? (
                    <div className="text-center text-slate-500 py-8">Loading your orders...</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                        <h2 className="text-xl font-bold text-slate-700 mb-2">No orders found</h2>
                        <p className="text-slate-500">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-slate-800">
                                            {order.catererId?.name || 'Unknown Caterer'}
                                        </h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
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
                                        Items: {order.items?.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                                    </p>
                                </div>
                                <div className="md:text-right flex flex-col justify-between">
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

export default MyOrdersPage;
