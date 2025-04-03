const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config(); // For environment variables

// Enable CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.log("Error connecting to MongoDB:", err);
});

// Sample route to fetch admin stats (Total Movies, Bookings, etc.)
const statsRoute = require('./routes/statsRoute');
app.use('/api/stats', statsRoute);  // Use the stats route for getting the data

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
