const { MongoClient } = require('mongodb');
const env = require('./env');

const uri = env.MONGO_URI;
const client = new MongoClient(uri);

module.exports = client;