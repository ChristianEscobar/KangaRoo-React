const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fileRoutes = require('./routes/file-upload');

app.use(bodyParser.json());

app.use('/api/v1/', fileRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
