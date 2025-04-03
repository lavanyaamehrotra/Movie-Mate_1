const express = require('express');
const router = express.Router();

// Simulate database models (Replace with actual models when needed)
const Movie = require('../models/movieModel'); // Replace with actual movie model
const Booking = require('../models/bookingModel'); // Replace with actual booking model
const Theater = require('../models/theaterModel'); // Replace with actual theater model

// Route to get admin stats
router.get('/', async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const availableTheaters = await Theater.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalMovies,
      totalBookings,
      availableTheaters,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

module.exports = router;
