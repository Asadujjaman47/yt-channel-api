const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const client = require('../config/database');

// Create a new channel
router.post('/', async (req, res) => {
  try {
    const channel = new Channel(req.body);
    await channel.save(client);
    res.json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Get all channels
router.get('/', async (req, res) => {
  try {
    const channels = await Channel.getAll(client);
    res.json(channels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Get a channel by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await Channel.findById(client, id);
    if (!channel) {
      res.status(404).json({ error: 'Channel not found' });
    } else {
      res.json(channel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Update a channel
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await Channel.findById(client, id);
    if (!channel) {
      res.status(404).json({ error: 'Channel not found' });
    } else {
      Object.assign(channel, req.body);
      await channel.save(client);
      res.json(channel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Delete a channel
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Channel.deleteById(client, id);
    res.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = router;