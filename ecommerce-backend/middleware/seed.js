
require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecomdb';

const items = [
  { title: 'Running Shoes', description: 'Comfortable running shoes', price: 2499, category: 'shoes', image: '' },
  { title: 'Classic Tee', description: 'Cotton t-shirt', price: 499, category: 'clothing', image: '' },
  { title: 'Wireless Headphones', description: 'Noise cancelling', price: 5999, category: 'electronics', image: '' },
  { title: 'Coffee Mug', description: 'Ceramic 300ml', price: 249, category: 'home', image: '' },
  { title: 'Backpack', description: 'Water resistant backpack', price: 1999, category: 'accessories', image: '' }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding.');
    await Item.deleteMany({});
    const created = await Item.insertMany(items);
    console.log('Inserted items:', created.length);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
