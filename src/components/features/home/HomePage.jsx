import React from 'react';
import HeroSearch from './HeroSearch';
import InfoCards from './InfoCards';
import FeaturedCaterers from './FeaturedCaterers';
import HowItWorks from './HowItWorks';
import FavoritesTable from './FavoritesTable';

const HomePage = () => {
    return (
        <div className="flex-1 w-full flex flex-col gap-4 pb-12">
            <HeroSearch />
            <InfoCards />
            <FeaturedCaterers />
            <HowItWorks />
            <FavoritesTable />
        </div>
    );
};

export default HomePage;
