// Import required modules
const mongoose = require('mongoose');

// Connect to MongoDB (Make sure MongoDB is running locally)
mongoose.connect('mongodb://localhost:27017/moviesdb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Movie schema
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  cast: [String],
  producer: String,
  releaseYear: Number,
});

// Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Sample movies to insert into the database
const sampleMovies = [
  {
    title: 'Martin',
    description: 'A horror movie about a young man...',
    cast: ['Actor1', 'Actor2'],
    producer: 'Producer1',
    releaseYear: 2023,
  },
  {
    title: 'Jigra',
    description: 'A drama about love and betrayal...',
    cast: ['Actor3', 'Actor4'],
    producer: 'Producer2',
    releaseYear: 2022,
  },
  {
    title: 'Phhulwanti',
    description: 'A romantic drama that explores cultural conflict...',
    cast: ['Actor5', 'Actor6'],
    producer: 'Producer3',
    releaseYear: 2021,
  }
];

// Insert movies into the database
Movie.insertMany(sampleMovies)
  .then(() => {
    console.log('Sample movies added');
    mongoose.disconnect(); // Disconnect after the insertion
  })
  .catch((err) => {
    console.error('Error adding movies:', err);
    mongoose.disconnect(); // Disconnect in case of an error
  });
