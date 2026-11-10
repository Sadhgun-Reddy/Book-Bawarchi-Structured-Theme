import React, { useState } from 'react';
import api from '../../../services/api';

const Reports = () => {
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        try {
            const [ordersRes, usersRes] = await Promise.all([
                api.get('/orders'),
                api.get('/users')
            ]);

            const orders = ordersRes.data;
            const users = usersRes.data;

            let csvContent = "data:text/csv;charset=utf-8,";

            // Users section
            csvContent += "USERS\n";
            csvContent += "Email,Role,Created At\n";
            users.forEach(user => {
                csvContent += `${user.email},${user.role},${user.createdAt}\n`;
            });

            csvContent += "\nORDERS\n";
            csvContent += "Order ID,User Email,Total Amount,Status,Date\n";
            orders.forEach(order => {
                csvContent += `${order._id},${order.userId?.email || 'N/A'},${order.totalAmount},${order.status},${order.createdAt}\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "book_bawarchi_report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error exporting data:", error);
            alert("Failed to export data");
        } finally {
            setExporting(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
                <button
                    onClick={handleExport}
                    disabled={exporting}
                    className={`bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors shadow-sm ${exporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {exporting ? 'Exporting...' : 'Export Data'}
                </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-8 text-center text-slate-500">
                <p>Detailed analytics charts and visual data will be implemented in a future update.</p>
                <p className="mt-2 text-sm">Use the "Export Data" button above to download raw user and order data as a CSV file.</p>
            </div>
        </div>
    );
};

export default Reports;
