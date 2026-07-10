const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/tasks');
const storeData = require('./data/store');
const {notFound, errorHandler} = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.listen(4000, () => console.log('API on http://localhost:4000'));