const mongoose = require('mongoose');
const Caterer = require('./models/Caterer');
require('dotenv').config();

const mockCaterers = [
    {
        name: "Sharma's Kitchen",
        priceValue: 85,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.8,
        distance: 2.4,
        tags: ["North Indian", "Mughlai", "Buffet"],
        dietary: ["Vegetarian"],
        isTopRated: false
    },
    {
        name: "Green Leaf Catering",
        priceValue: 45,
        dateCode: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        rating: 4.2,
        distance: 5.1,
        tags: ["Vegan", "Healthy", "Drop-off / Boxed"],
        dietary: ["Vegan", "Gluten-Free", "Vegetarian"],
        isTopRated: false
    },
    {
        name: "Royal Feast Events",
        priceValue: 120,
        dateCode: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        rating: 5.0,
        distance: 8.3,
        tags: ["Continental", "Plated Sit-down", "Wedding"],
        dietary: ["Halal"],
        isTopRated: true
    },
    {
        name: "Golden Dragon",
        priceValue: 35,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.5,
        distance: 1.2,
        tags: ["Chinese", "Asian", "Buffet"],
        dietary: [],
        isTopRated: false
    },
    {
        name: "Taco Fiesta",
        priceValue: 18,
        dateCode: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        rating: 4.0,
        distance: 3.0,
        tags: ["Mexican", "Street Food", "Live Station", "Buffet"],
        dietary: ["Gluten-Free"],
        isTopRated: false
    },
    {
        name: "Mama Mia Catering",
        priceValue: 65,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.7,
        distance: 6.5,
        tags: ["Italian", "Pizza/Pasta", "Drop-off / Boxed"],
        dietary: ["Vegetarian"],
        isTopRated: false
    },
    {
        name: "Curry House",
        priceValue: 30,
        dateCode: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        rating: 4.3,
        distance: 0.8,
        tags: ["South Indian", "Thali", "Veg Only", "Buffet"],
        dietary: ["Vegetarian", "Vegan"],
        isTopRated: false
    },
    {
        name: "Sweet Delights",
        priceValue: 55,
        dateCode: new Date().toISOString().split('T')[0],
        rating: 4.9,
        distance: 4.2,
        tags: ["Bakery", "Dessert", "Drop-off / Boxed"],
        dietary: ["Vegetarian"],
        isTopRated: true
    }
];

mongoose.connect(process.env.MONGO_URI, {})
  .then(async () => {
    console.log('Connected to MongoDB');
    await Caterer.deleteMany({});
    console.log('Cleared existing caterers');
    await Caterer.insertMany(mockCaterers);
    console.log('Seeded database with mock caterers');
    process.exit();
  })
  .catch((err) => {
    console.error('Failed to seed:', err);
    process.exit(1);
  });
