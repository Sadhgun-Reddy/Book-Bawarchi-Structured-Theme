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

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return;
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
                eventDate: new Date(Date.now() + 86400000).toISOString(),
            });
            dispatch(clearCart());
            alert('Order placed successfully!');
            navigate('/');
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

                <div className="flex justify-end gap-4">
                    <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-lg font-semibold text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors">
                        Back
                    </button>
                    <button
                        onClick={handleCheckout}
                        disabled={submitting}
                        className={`bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {submitting ? 'Processing...' : 'Confirm Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
