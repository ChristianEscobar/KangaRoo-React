const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fosterRoutes = require('./routes/fosters');
const pingRoutes = require('./routes/ping');

app.use(bodyParser.json());

app.use('/api/v1/fosters', fosterRoutes);
app.use('/api/v1/', pingRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
