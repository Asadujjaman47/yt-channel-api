const { ObjectId } = require('mongodb');
const env = require("../config/env");

class Channel {
  constructor(data) {
    this._id = data._id || new ObjectId();
    this.name = data.name;
    this.link = data.link;
    this.tags = data.tags;
    this.CreatedTime = data.CreatedTime || new Date().toISOString();
    this.LastEditedTime = data.LastEditedTime || new Date().toISOString();
  }

  static async getAll(client) {
    const db = client.db(env.DB_NAME);
    const channels = await db
      .collection(env.CHANNEL_COLLECTION)
      .find()
      .toArray();
    return channels.map((channel) => new Channel(channel));
  }

  static async findById(client, id) {
    const db = client.db(env.DB_NAME);
    const channel = await db
      .collection(env.CHANNEL_COLLECTION)
      .findOne({ _id: new ObjectId(String(id)) });
    return channel ? new Channel(channel) : null;
  }

  async save(client) {
    const db = client.db(env.DB_NAME);
    await db.collection(env.CHANNEL_COLLECTION).insertOne(this);
  }

  static async deleteById(client, id) {
    const db = client.db(env.DB_NAME);
    await db
      .collection(env.CHANNEL_COLLECTION)
      .deleteOne({ _id: new ObjectId(String(id)) });
  }
}

module.exports = Channel;