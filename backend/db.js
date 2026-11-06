const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');

let mongoServer;

const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
  console.log('MongoDB Memory Server connected to', mongoUri);
  await seedDatabase();
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

// Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'caterer', 'admin'] }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const catererSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  image: String,
  price_tier: String,
  price_value: Number,
  rating: { type: Number, default: 0 },
  distance: { type: Number, default: 0 },
  min_plates: { type: Number, default: 10 },
  tags: [String],
  dietary: [String],
  is_top_rated: { type: Boolean, default: false }
});

const menuItemSchema = new mongoose.Schema({
  caterer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Caterer', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  dietary: [String]
});

const orderItemSchema = new mongoose.Schema({
  menu_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true },
  price_at_time: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caterer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Caterer', required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'] },
  total_amount: { type: Number, required: true },
  event_date: { type: Date, required: true },
  guest_count: { type: Number, required: true },
  special_instructions: String,
  items: [orderItemSchema]
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

// Models
const User = mongoose.model('User', userSchema);
const Caterer = mongoose.model('Caterer', catererSchema);
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Order = mongoose.model('Order', orderSchema);

// Seed Data
const seedDatabase = async () => {
    const count = await User.countDocuments();
    if (count === 0) {
        console.log("Seeding database...");

        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPassword, role: 'admin' });

        const catererPassword = await bcrypt.hash('caterer123', 10);
        const catererUser = await User.create({ name: 'Sharma', email: 'sharma@example.com', password: catererPassword, role: 'caterer' });

        const caterer = await Caterer.create({
            user_id: catererUser._id,
            name: "Sharma's Kitchen",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn61xcVvcMQ4JeVH3hpT1iEeGVTvf7kSBhq2qqflNJrMlZrfupYjmkS3TSufEr49ujpx0Y5W7LQdqZNlLSO4nA-MpqN_oy3-JfhvtthNYuDmH2YspiAlmgaVsCyaWC2dfS2Hk3vAnrK1O33DjKc8kxQw96Wa_UH9584rCtPwjufzObK_U2z7jiNxfaTkYWDzlND2nPhfHDfRfDyVD_gXGjXM4xi9SJJyIROU-wJWyfW7uEtEl-OGrqc7eQq9EQYRWcJWqCFr37kuk",
            price_tier: "$$$",
            price_value: 85,
            rating: 4.8,
            distance: 2.4,
            min_plates: 20,
            tags: ["North Indian", "Mughlai", "Buffet"],
            dietary: ["Vegetarian"],
            is_top_rated: false
        });

        await MenuItem.create({
            caterer_id: caterer._id,
            name: 'Butter Chicken',
            description: 'Creamy and rich tomato-based curry',
            price: 15.99,
            category: 'Main Course',
            dietary: []
        });

        await MenuItem.create({
            caterer_id: caterer._id,
            name: 'Paneer Tikka Masala',
            description: 'Grilled paneer in spicy gravy',
            price: 13.99,
            category: 'Main Course',
            dietary: ['Vegetarian']
        });

        const userPassword = await bcrypt.hash('user123', 10);
        await User.create({ name: 'Test User', email: 'user@example.com', password: userPassword, role: 'user' });
    }
};

module.exports = {
  connectDB,
  disconnectDB,
  User,
  Caterer,
  MenuItem,
  Order
};
