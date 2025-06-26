const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async ()=>{
    try {
        if (process.env.NODE_ENV === 'production' && !process.env.MONGO_URI) {
         throw new Error('MongoDB connection URI is required in production');
}
        const connect = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/snappod",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDB;