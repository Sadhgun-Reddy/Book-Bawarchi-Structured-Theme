const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const seedDatabase = require('./seed_memory');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/caterers', require('./routes/caterers.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/orders', require('./routes/orders.routes'));
app.use('/api/menu', require('./routes/menu.routes')); // Added menu routes

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;

let mongoServer;

const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
  console.log('MongoDB Memory Server connected to', mongoUri);
  await seedDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

connectDB().catch(console.error);
