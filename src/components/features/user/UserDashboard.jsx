import React, { useEffect, useState } from "react";
import api from "../../../services/api";

const UserDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders");
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
                <h1 className="text-3xl font-bold text-slate-800 mb-6">My Profile</h1>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 text-slate-800">My Orders</h2>
                    {loading ? (
                        <div className="text-center text-slate-500 py-4">Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className="text-center text-slate-500 py-4">You have no past orders.</div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map(order => (
                                <div key={order._id} className="border border-slate-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-semibold text-slate-800">Order ID: {order._id.substring(0, 8)}...</div>
                                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                                            order.status === "completed" ? "bg-green-100 text-green-800" :
                                            order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                                            order.status === "cancelled" ? "bg-red-100 text-red-800" :
                                            "bg-yellow-100 text-yellow-800"
                                        }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-600 mb-2">
                                        Total: <span className="font-bold text-slate-800">${order.totalAmount}</span>
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        Items:
                                        <ul className="list-disc list-inside mt-1 ml-2">
                                            {order.items.map((item, idx) => (
                                                <li key={idx}>{item.name} - ${item.price} x {item.quantity}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
