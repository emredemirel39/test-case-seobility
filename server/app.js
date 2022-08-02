const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formsRouter = require('./routers/forms');

const app = express();
app.use(express.json());
app.use(cors());
app.options('http://localhost:3000/', cors());

// database connection
const url = 'mongodb://localhost/';
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', () => console.error(error));
db.once('open', () => console.log('DB is connected'));

// Routers

app.get('/', async (req, res) => res.send('Server is working'));
app.use('/forms', formsRouter);

app.listen('5050', () => console.log('Server is working...'))