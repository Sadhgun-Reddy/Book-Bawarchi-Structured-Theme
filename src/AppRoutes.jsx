import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './components/features/home/HomePage';
import FindCaterersPage from './components/features/findCaterers/FindCaterersPage';

// Placeholder Components utilizing lazy
const LoadingFallback = () => <div className="p-4">Loading...</div>;

// Public Pages (Frontend - Placeholder for 31 Routes)
const Home = lazy(() => Promise.resolve({ default: () => <div>Home</div> }));
const Login = lazy(() => Promise.resolve({ default: () => <div>Login</div> }));
const Register = lazy(() => Promise.resolve({ default: () => <div>Register</div> }));
const About = lazy(() => Promise.resolve({ default: () => <div>About</div> }));
const Contact = lazy(() => Promise.resolve({ default: () => <div>Contact</div> }));
// ... Remaining 26 Public Routes Placeholder

// Admin Pages (Backend - Placeholder for 30 Routes)
const Dashboard = lazy(() => Promise.resolve({ default: () => <div>Dashboard Home</div> }));
const Inventory = lazy(() => Promise.resolve({ default: () => <div>Inventory Management</div> }));
const Users = lazy(() => Promise.resolve({ default: () => <div>User Management</div> }));
const Orders = lazy(() => Promise.resolve({ default: () => <div>Order Management</div> }));
const Reports = lazy(() => Promise.resolve({ default: () => <div>Reports</div> }));
// ... Remaining 25 Admin Routes Placeholder

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* Public Routes with MainLayout */}
                {/* <Route element={<MainLayout />}> */}
                <Route path="/" element={<HomePage />} />
                <Route path="/find" element={<FindCaterersPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* Add remaining 26 routes here in future */}
                {/* </Route> */}

                {/* Admin Routes with DashboardLayout */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="users" element={<Users />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="reports" element={<Reports />} />
                    {/* Add remaining 25 admin routes here in future */}
                </Route>

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
