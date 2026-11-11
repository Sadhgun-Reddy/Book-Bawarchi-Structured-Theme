import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    inventoryStats: null,
};

const posSlice = createSlice({
    name: 'pos',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Check if cart has items from a different caterer
            if (state.cart.length > 0 && state.cart[0].catererId !== action.payload.catererId) {
                // Clear the cart if a different caterer is selected
                state.cart = [];
            }

            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity || 1;
            } else {
                state.cart.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        updateCartItemQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.cart = [];
        }
    }
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = posSlice.actions;
export default posSlice.reducer;
