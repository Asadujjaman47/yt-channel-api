require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.get('/channels', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('yt');
    const channels = await db.collection('channel').find().toArray();
    res.json(channels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});