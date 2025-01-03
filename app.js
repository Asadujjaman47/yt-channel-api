const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const env = require("./config/env");
const routes = require("./routes");
const errorHandler = require("./utils/errorHandler");

require("./config/database");

const app = express();
const port = env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});