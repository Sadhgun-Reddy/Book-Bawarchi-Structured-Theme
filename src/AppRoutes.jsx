import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './components/features/home/HomePage';
import FindCaterersPage from './components/features/findCaterers/FindCaterersPage';
import LoginPage from './components/features/auth/LoginPage';
import RegisterPage from './components/features/auth/RegisterPage';
import Dashboard from './components/features/admin/Dashboard';
import Inventory from './components/features/admin/Inventory';
import CatererDetailsPage from './components/features/order/CatererDetailsPage';
import CheckoutPage from './components/features/order/CheckoutPage';
import Users from './components/features/admin/Users';
import Orders from './components/features/admin/Orders';
import Reports from './components/features/admin/Reports';
import ProtectedRoute from './components/common/ProtectedRoute';

import Potluck from './components/features/home/Potluck';
import Support from './components/features/home/Support';
import About from './components/features/home/About';
import Contact from './components/features/home/Contact';

// User features
// UserOrders will be lazy loaded or imported later based on the next step

// Placeholder Components utilizing lazy
const LoadingFallback = () => <div className="p-4">Loading...</div>;

// In next step, we'll replace this lazy with an actual component.
const UserOrders = lazy(() => import('./components/features/order/UserOrders'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* Public Routes with MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/find" element={<FindCaterersPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/potluck" element={<Potluck />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/caterer/:id" element={<CatererDetailsPage />} />

                    <Route element={<ProtectedRoute requireAdmin={false} />}>
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/my-orders" element={<UserOrders />} />
                    </Route>
                </Route>

                {/* Admin Routes with DashboardLayout */}
                <Route element={<ProtectedRoute requireAdmin={true} />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="users" element={<Users />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="reports" element={<Reports />} />
                    </Route>
                </Route>

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
