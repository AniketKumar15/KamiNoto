// Importing necessary modules
import connectToMongo from "./db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Importing routes
import authRoutes from "./Routes/Auth.route.js";
import noteRoutes from "./Routes/Notes.route.js";

// Configuring dotenv to load environment variables
dotenv.config({
    path: "./env"
});

// Connecting to MongoDB database
// This function is defined in db.js and handles the connection to MongoDB
connectToMongo();

// Creating an instance of express application
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors())
// Available routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// app listener to start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    console.log(`http://localhost:${process.env.PORT || 3000}`); // Log the server URL

});
