const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /api/notifications - Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });

    notification.read = true;
    await notification.save();

    res.json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/notifications - Create new notification
router.post('/', async (req, res) => {
  const { message, date } = req.body;
  if (!message || !date) return res.status(400).json({ error: 'Message and date are required' });

  try {
    const newNotification = new Notification({
      message,
      date,
      read: false
    });
    const saved = await newNotification.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
