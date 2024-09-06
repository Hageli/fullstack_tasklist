const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
