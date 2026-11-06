import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MainLayout = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col font-display antialiased">
            <Header />
            <main className="flex-1 w-full flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
