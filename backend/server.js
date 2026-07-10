const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/tasks');
const storeData = require('./data/store');
const {notFound, errorHandler} = require('./middleware/errorHandler');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/tasks', taskRoutes);

storeData.seedData();
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));

module.exports = app;