import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

    if (loading) {
        return <div className="flex-1 p-8 text-center text-slate-500">Loading your orders...</div>;
    }

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display p-4 md:p-8">
            <div className="max-w-5xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
                        <p className="text-slate-500 mb-4">You haven't placed any orders yet.</p>
                        <Link to="/find" className="text-[#137EED] font-bold hover:underline">Find a Caterer</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-slate-100 pb-4 mb-4 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 font-semibold mb-1">Order #{order._id.substring(0, 8)}</p>
                                        <h3 className="font-bold text-lg text-slate-900">{order.catererId?.name || 'Unknown Caterer'}</h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500 font-semibold mb-1">Total</p>
                                            <p className="font-bold text-lg text-slate-900">${order.totalAmount}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500 font-semibold mb-1">Status</p>
                                            <span className={`px-2.5 py-1 rounded text-xs font-bold capitalize ${
                                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 mb-2">Items:</h4>
                                    <ul className="space-y-1">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="text-sm text-slate-600 flex justify-between">
                                                <span>{item.quantity}x {item.name}</span>
                                                <span className="font-medium text-slate-700">${item.price * item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
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
