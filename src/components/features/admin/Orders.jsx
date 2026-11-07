import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Orders = () => {
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

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading orders...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                                    <th className="p-4 font-semibold">Order ID</th>
                                    <th className="p-4 font-semibold">User</th>
                                    <th className="p-4 font-semibold">Total Amount</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-sm text-slate-800">{order._id.substring(0, 8)}...</td>
                                        <td className="p-4 text-sm text-slate-800">{order.userId?.email || 'N/A'}</td>
                                        <td className="p-4 text-sm text-slate-800">${order.totalAmount}</td>
                                        <td className="p-4 text-sm text-slate-800 capitalize">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                                className="border border-slate-300 rounded px-2 py-1 text-xs"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
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

export default Orders;
