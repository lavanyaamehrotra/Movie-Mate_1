require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();

// Middleware for parsing request body
app.use(bodyParser.json());

// Set up the connection to MongoDB (replace the MONGO_URI with the one from Atlas)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNo: { type: String, required: true },
    googleId: String,
    appleId: String,
});

// Create a User model
const User = mongoose.model('User', userSchema);

// POST Route for user registration
app.post('/signup', async (req, res) => {
    const { email, password, mobileNo } = req.body;

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send("Email already registered");
    }

    // Hash password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
        email,
        password: hashedPassword,
        mobileNo,
    });

    // Save the new user to the database
    try {
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send("Error during registration: " + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
