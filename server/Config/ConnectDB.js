const mongoose = require('mongoose');
const { colors } = require('colors');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://mainak2:password%4012345@cluster0.kuup7.mongodb.net/Edudocs");
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;