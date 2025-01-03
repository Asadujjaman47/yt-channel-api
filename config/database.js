// config/database.js
const mongoose = require("mongoose");
const env = require("./env");

mongoose
  .connect(`${env.MONGO_URI}/${env.DB_NAME}`)
  .then(() => {
    console.log(`Connected to MongoDB database: ${env.DB_NAME}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.error("Error connecting to MongoDB:", err);
//   process.exit(1);
// });

// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

module.exports = mongoose;
