import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Reports = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders for reports:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const exportData = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Order ID,User,Caterer,Amount,Status,Date\n"
            + orders.map(o => `${o._id},${o.userId?.email || 'N/A'},${o.catererId?.name || 'N/A'},${o.totalAmount},${o.status},${new Date(o.createdAt).toLocaleDateString()}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "orders_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
                <button
                    onClick={exportData}
                    className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                    Export Data (CSV)
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 {loading ? (
                     <div className="p-8 text-center text-slate-500">Loading reports...</div>
                 ) : (
                     <div className="p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Recent High Value Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                                        <th className="p-3 font-semibold">User</th>
                                        <th className="p-3 font-semibold">Caterer</th>
                                        <th className="p-3 font-semibold">Amount</th>
                                        <th className="p-3 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders
                                        .filter(o => o.totalAmount > 50)
                                        .sort((a, b) => b.totalAmount - a.totalAmount)
                                        .slice(0, 5)
                                        .map(order => (
                                        <tr key={order._id} className="border-b border-slate-100 text-sm">
                                            <td className="p-3 text-slate-800">{order.userId?.email || 'N/A'}</td>
                                            <td className="p-3 text-slate-800">{order.catererId?.name || 'N/A'}</td>
                                            <td className="p-3 font-bold text-green-600">${order.totalAmount}</td>
                                            <td className="p-3 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {orders.filter(o => o.totalAmount > 50).length === 0 && (
                                        <tr><td colSpan="4" className="p-4 text-center text-slate-500">No high value orders found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default Reports;
