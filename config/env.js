require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  CHANNEL_COLLECTION: process.env.CHANNEL_COLLECTION,
  PORT: process.env.PORT
};