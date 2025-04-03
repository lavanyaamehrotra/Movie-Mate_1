const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');

// Serve static files from the "landing_page" directory
app.use(express.static(path.join(__dirname, 'landing_page')));



const authRoutes = require('./routes/auth'); // Routes file

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
// app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Signup API');
});

// app.get('/', (req, res) => {
//   res.redirect('/api/auth');
// });

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
