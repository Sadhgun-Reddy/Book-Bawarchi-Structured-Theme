import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import posReducer from './posSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        pos: posReducer,
    },
});

export default store;
