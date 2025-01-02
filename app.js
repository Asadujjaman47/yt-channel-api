const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes");
const errorHandler = require('./utils/errorHandler');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});