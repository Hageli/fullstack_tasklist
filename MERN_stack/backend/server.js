const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
if(process.env.NODE_ENV === 'production' ){
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set mode to production'))
}

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    };
app.use(cors(corsOptions));


app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
