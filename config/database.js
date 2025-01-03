const { MongoClient } = require('mongodb');
const env = require('./env');

const uri = env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    if (process.env.NODE_ENV === "development") {
        await client.connect();
        console.log('Connected to MongoDB');
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongoDB();

module.exports = client;