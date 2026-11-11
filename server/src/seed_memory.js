const mongoose = require('mongoose');
const Caterer = require('./models/Caterer');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const bcrypt = require('bcryptjs');

const mockCaterers = [
    {
        name: "Sharma's Kitchen",
        priceValue: 85,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.8,
        distance: 2.4,
        tags: ["North Indian", "Mughlai", "Buffet"],
        dietary: ["Vegetarian"],
        isTopRated: false,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop",
        minPlates: 20
    },
    {
        name: "Green Leaf Catering",
        priceValue: 45,
        dateCode: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        rating: 4.2,
        distance: 5.1,
        tags: ["Vegan", "Healthy", "Drop-off / Boxed"],
        dietary: ["Vegan", "Gluten-Free", "Vegetarian"],
        isTopRated: false,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
        minPlates: 10
    },
    {
        name: "Royal Feast Events",
        priceValue: 120,
        dateCode: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        rating: 5.0,
        distance: 8.3,
        tags: ["Continental", "Plated Sit-down", "Wedding"],
        dietary: ["Halal"],
        isTopRated: true,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop",
        minPlates: 50
    },
    {
        name: "Golden Dragon",
        priceValue: 35,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.5,
        distance: 1.2,
        tags: ["Chinese", "Asian", "Buffet"],
        dietary: [],
        isTopRated: false,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
        minPlates: 15
    },
    {
        name: "Taco Fiesta",
        priceValue: 18,
        dateCode: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        rating: 4.0,
        distance: 3.0,
        tags: ["Mexican", "Street Food", "Live Station", "Buffet"],
        dietary: ["Gluten-Free"],
        isTopRated: false,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop",
        minPlates: 25
    },
    {
        name: "Mama Mia Catering",
        priceValue: 65,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.7,
        distance: 6.5,
        tags: ["Italian", "Pizza/Pasta", "Drop-off / Boxed"],
        dietary: ["Vegetarian"],
        isTopRated: false,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=600&auto=format&fit=crop",
        minPlates: 20
    },
    {
        name: "Curry House",
        priceValue: 30,
        dateCode: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        rating: 4.3,
        distance: 0.8,
        tags: ["South Indian", "Thali", "Veg Only", "Buffet"],
        dietary: ["Vegetarian", "Vegan"],
        isTopRated: false,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop",
        minPlates: 10
    },
    {
        name: "Sweet Delights",
        priceValue: 55,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.9,
        distance: 4.2,
        tags: ["Bakery", "Dessert", "Drop-off / Boxed"],
        dietary: ["Vegetarian"],
        isTopRated: true,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop",
        minPlates: 30
    }
];

const seedDatabase = async () => {
    console.log('Seeding memory database...');

    // Seed Caterers
    await Caterer.deleteMany({});
    await Caterer.insertMany(mockCaterers);
    console.log('Seeded database with mock caterers');

    // Seed Menu Items
    await MenuItem.deleteMany({});
    const menuItems = [];
    const insertedCaterers = await Caterer.find({});

    for (const caterer of insertedCaterers) {
        menuItems.push({
            catererId: caterer._id,
            name: 'Appetizer Combo',
            description: 'A mix of our best starters.',
            price: 15
        });
        menuItems.push({
            catererId: caterer._id,
            name: 'Main Course Buffet',
            description: 'Full main course selection.',
            price: caterer.priceValue
        });
        menuItems.push({
            catererId: caterer._id,
            name: 'Dessert Platter',
            description: 'Assorted sweet treats.',
            price: 12
        });
    }
    await MenuItem.insertMany(menuItems);
    console.log('Seeded database with mock menu items');

    // Seed Admin User
    await User.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const adminUser = new User({ email: 'admin@example.com', password: hashedPassword, role: 'admin' });
    await adminUser.save();

    const userPassword = await bcrypt.hash('user123', salt);
    const normalUser = new User({ email: 'user@example.com', password: userPassword, role: 'user' });
    await normalUser.save();

    console.log('Seeded database with users');
};

module.exports = seedDatabase;
