const mongoose = require("mongoose");
const env = require("../config/env");

const channelSchema = new mongoose.Schema(
  {
    name: String,
    link: String,
    tags: String,
  },
  {
    timestamps: {
      createdAt: "Created time",
      updatedAt: "Last edited time",
    },
    // strict: false,
    collection: env.CHANNEL_COLLECTION,
  }
);

const Channel = mongoose.model(`${env.CHANNEL_COLLECTION}`, channelSchema);

module.exports = Channel;