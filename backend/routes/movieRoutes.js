const express = require('express');
const router = express.Router();

// Sample Movie Data
const movies = [
    {
        id: "Martin",
        title: "Martin",
        genre: "Action/Drama/Thriller",
        rating: "6.1/10",
        votes: "8.7K",
        description: "An action-packed drama thriller featuring a gripping storyline.",
        image: "/images/movies_poster/img1.avif"
    },
    {
        id: "Jigra",
        title: "Jigra",
        genre: "Action/Drama/Thriller",
        rating: "7.8/10",
        votes: "45.5K",
        description: "A drama that blends action and emotions seamlessly.",
        image: "/images/movies_poster/img2.avif"
    },
    // Add more movies as needed
];

// API Endpoint to Get Movie Details by ID
router.get('/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movies.find((m) => m.id === movieId);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: "Movie not found" });
    }
});

module.exports = router;
