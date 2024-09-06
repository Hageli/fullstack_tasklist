const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;