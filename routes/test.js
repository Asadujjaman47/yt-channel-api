const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json("Test route");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
