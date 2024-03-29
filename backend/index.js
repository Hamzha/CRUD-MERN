const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

require('./models/number');
require('./models/user');

app.use(cors());
app.use(express.json());
app.use(require('./routes/user'));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURI);
mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

mongoose.connection.on('error', (error) => {
  console.log('mongoose is not connected', error);
});

app.listen(PORT, () => {
  console.log(`Console is running or port${PORT}`);
});

// 1vGiQjleYSzJY7fh
