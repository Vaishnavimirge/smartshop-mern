const express = require('express');
const auth = require('../middleware/auth');
const Item = require('../models/Item');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    await req.user.populate('cart.item');
    res.json(req.user.cart);
  } catch (err) {
    console.error('get cart error:', err);
    res.status(500).json({ message: 'Server error getting cart' });
  }
});


router.post('/add', auth, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    if (!itemId) return res.status(400).json({ message: 'itemId required' });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const q = Math.max(1, Number(quantity) || 1);

    const cartItem = req.user.cart.find(ci => ci.item.toString() === itemId);
    if (cartItem) {
      cartItem.quantity = cartItem.quantity + q;
    } else {
      req.user.cart.push({ item: itemId, quantity: q });
    }

    await req.user.save();
    await req.user.populate('cart.item');
    res.json(req.user.cart);
  } catch (err) {
    console.error('add to cart error:', err);
    res.status(500).json({ message: 'Server error adding to cart' });
  }
});


router.post('/remove', auth, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    if (!itemId) return res.status(400).json({ message: 'itemId required' });

    const idx = req.user.cart.findIndex(ci => ci.item.toString() === itemId);
    if (idx === -1) return res.status(404).json({ message: 'Item not in cart' });

    const q = Math.max(1, Number(quantity) || 1);
    req.user.cart[idx].quantity -= q;

    if (req.user.cart[idx].quantity <= 0) {
      req.user.cart.splice(idx, 1);
    }

    await req.user.save();
    await req.user.populate('cart.item');
    res.json(req.user.cart);
  } catch (err) {
    console.error('remove from cart error:', err);
    res.status(500).json({ message: 'Server error removing from cart' });
  }
});

module.exports = router;
