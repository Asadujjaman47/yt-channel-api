const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const response = require("../utils/response");

// Create a new channel
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      response(res, 400, null, "Channel name is required");
    } else {
      const existingChannel = await Channel.findOne({ name });
      if (existingChannel) {
        response(res, 400, null, "Channel with this name already exists");
      } else {
        const channel = new Channel(req.body);
        await channel.save();
        response(res, 201, channel, "Channel created successfully");
      }
    }
  } catch (error) {
    response(res, 500, null, "Failed to create channel", error);
  }
});

// Get all channels
router.get('/', async (req, res) => {
  try {
    const channels = await Channel.find();
    if (channels.length > 0) {
      response(res, 200, channels);
    } else {
      response(res, 200, null, "No channels found");
    }
  } catch (error) {
    response(res, 500, null, "Failed to retrieve channels", error);
    // response(res, 500, null, "Internal Server Error", error.message);
  }
});

// Get a channel by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await Channel.findById(id);
    if (!channel) {
      response(res, 404, null, 'Channel not found');
    } else {
      response(res, 200, channel);
    }
  } catch (error) {
    response(res, 500, null, "Failed to retrieve channel", error);
  }
});

// Update a channel
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await Channel.findById(id);
    if (!channel) {
      response(res, 404, null, 'Channel not found');
    } else {
      Object.assign(channel, req.body);
      await channel.save();
      response(res, 200, channel, 'Channel updated successfully');
    }
  } catch (error) {
    response(res, 500, null, "Failed to update channel", error);
  }
});

// Delete a channel
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await Channel.findByIdAndDelete(id);
    if (!channel) {
      response(res, 404, null, 'Channel not found');
    } else {
      response(res, 200, null, 'Channel deleted successfully');
    }
  } catch (error) {
    response(res, 500, null, "Failed to delete channel", error);
  }
});

module.exports = router;