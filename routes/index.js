const express = require('express');
const router = express.Router();

const channelsRouter = require('./channels');
const testRouter = require('./test');

router.use('/channels', channelsRouter);
router.use("/test", testRouter);

module.exports = router;