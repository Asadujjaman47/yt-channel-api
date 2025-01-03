const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');

// Create a new channel
router.post('/', async (req, res) => {
  try {
    const channel = new Channel(req.body);
    await channel.save();
    res.json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Get all channels
router.get('/', async (req, res) => {
    try {
    const channels = await Channel.find();
    // console.log(channels.length);
    if (channels.length > 0) {
      res.send(channels);
    } else {
      res.send({ result: "No data found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Get a channel by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await Channel.findById(id);
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
    const channel = await Channel.findById(id);
    if (!channel) {
      res.status(404).json({ error: 'Channel not found' });
    } else {
      Object.assign(channel, req.body);
      await channel.save();
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
    const channel = await Channel.findByIdAndDelete(id);
    if (!channel) {
      res.status(404).json({ error: "Channel not found" });
    } else {
      res.json({ message: "Channel deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = router;