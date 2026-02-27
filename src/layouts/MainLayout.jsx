import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="border-b border-border bg-white px-4 py-3 flex items-center justify-between">
                <h1 className="text-lg font-bold">Book Bawarchi</h1>
                <nav className="text-sm">
                    <a href="/login" className="px-3 py-1.5 border border-border rounded hover:bg-slate-50">Login</a>
                </nav>
            </header>
            <main className="flex-1 container mx-auto p-4">
                <Outlet />
            </main>
            <footer className="border-t border-border bg-white px-4 py-2 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Book Bawarchi POS
            </footer>
        </div>
    );
};

export default MainLayout;
