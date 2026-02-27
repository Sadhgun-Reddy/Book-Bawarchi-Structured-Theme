import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import HeroSearch from './HeroSearch';
import InfoCards from './InfoCards';
import FeaturedCaterers from './FeaturedCaterers';
import HowItWorks from './HowItWorks';
import FavoritesTable from './FavoritesTable';

const HomePage = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col font-display antialiased">
            <Header />
            <main className="flex-1 w-full flex flex-col gap-4 pb-12">
                <HeroSearch />
                <InfoCards />
                <FeaturedCaterers />
                <HowItWorks />
                <FavoritesTable />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
