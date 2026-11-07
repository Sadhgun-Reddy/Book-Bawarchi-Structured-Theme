import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart, updateCartItemQuantity } from '../../../store/posSlice';
import api from '../../../services/api';

const CheckoutPage = () => {
    const { cart } = useSelector(state => state.pos);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [eventDate, setEventDate] = useState("");
    const [address, setAddress] = useState("");

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        if (!eventDate) {
            alert("Please select an event date");
            return;
        }

        setSubmitting(true);
        try {
            const catererId = cart[0].catererId;

            if(!catererId) {
                alert('Invalid cart items.');
                setSubmitting(false);
                return;
            }

            await api.post('/orders', {
                catererId: catererId,
                items: cart.map(c => ({ name: c.name, quantity: c.quantity, price: c.price })),
                totalAmount,
                eventDate: new Date(eventDate).toISOString(),
                // In a real app we'd save the address as well, assuming it's in the schema. For now, it's just validated in UI.
            });
            dispatch(clearCart());
            alert('Order placed successfully!');
            navigate('/profile');
        } catch (error) {
            console.error("Error creating order:", error);
            alert('Failed to place order.');
        } finally {
            setSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-4 font-display">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
                    <button onClick={() => navigate('/find')} className="text-[#137EED] font-semibold hover:underline">Browse Caterers</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-slate-50 flex flex-col font-display">
            <div className="max-w-2xl mx-auto w-full p-4 md:p-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">Checkout</h1>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        {cart.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-800">{item.name}</h3>
                                    <p className="text-sm text-slate-500">${item.price} x {item.quantity}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-slate-800">${item.price * item.quantity}</span>
                                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 text-sm font-semibold hover:underline">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-800">Total</span>
                        <span className="text-2xl font-bold text-[#137EED]">${totalAmount}</span>
                    </div>
                </div>

                <form onSubmit={handleCheckout} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 space-y-4">
                    <h2 className="text-xl font-bold mb-4">Event Details</h2>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Event Date</label>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#137EED]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Delivery Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="123 Main St"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#137EED]"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-slate-200">
                        <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-lg font-semibold text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors">
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Processing...' : 'Confirm Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
