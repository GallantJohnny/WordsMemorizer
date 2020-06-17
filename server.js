const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const apiRoutes = require('./router-api');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config();

app.use('/api', apiRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server started on port 5000'));