const express = require('express');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/', auth, async (req, res) => {
  try {
    const { title, description = '', price, category = 'general', image = '' } = req.body;
    if (!title || price === undefined) return res.status(400).json({ message: 'title and price required' });

    const item = new Item({ title, description, price: Number(price), category, image });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('create item error:', err);
    res.status(500).json({ message: 'Server error creating item' });
  }
});


router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, q, sort = '-createdAt', limit = 100, skip = 0 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (q) filter.title = { $regex: q, $options: 'i' };

    const items = await Item.find(filter)
      .sort(sort)
      .limit(Math.min(1000, Number(limit) || 100))
      .skip(Number(skip) || 0);

    res.json(items);
  } catch (err) {
    console.error('list items error:', err);
    res.status(500).json({ message: 'Server error listing items' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('get item error:', err);
    res.status(500).json({ message: 'Server error getting item' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const allowed = ['title','description','price','category','image'];
    const updates = {};
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k];
    const item = await Item.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('update item error:', err);
    res.status(500).json({ message: 'Server error updating item' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('delete item error:', err);
    res.status(500).json({ message: 'Server error deleting item' });
  }
});

module.exports = router;
