// Movie data object
const movies = {
  Martin: {
      title: "Martin",
      poster: "images/inside_movies/martin.avif",
      description: "Martin is a pulse-pounding edge-of-the-seat action thriller...",
      releaseDate: "MARCH 13, 2020",
      length: "1h 50m",
      genre: "Action, Fantasy",
      imdb: "5.7/10",
      trailer: "https://www.youtube.com/watch?v=fqLCas2sWW0",
  },
  Jigra: {
      title: "Jigra",
      poster: "images/movies_poster/img2.avif",
      description: "Jigra tells the story of an ordinary person rising above challenges...",
      releaseDate: "COMING SOON",
      length: "TBA",
      genre: "Drama, Action",
      imdb: "TBA",
      trailer: "https://www.youtube.com/watch?v=jigra-trailer",
  },
};

// Get the query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movie');

// Populate movie details if found
if (movies[movieId]) {
  const movie = movies[movieId];
  document.querySelector('#paymentHead').textContent = movie.title;
  document.querySelector('#paymentTable img:first-child').src = movie.poster;
  document.querySelector('#paymentTable img:first-child').alt = movie.title;
  document.querySelector('#paymentTable td:nth-child(2)').innerHTML = `
      <h2 id="paymentHead">${movie.title}</h2>
      <p>${movie.releaseDate} <span class="paymentSpan">Length:</span> ${movie.length}</p>
      <br>
      <span class="paymentSpan">${movie.genre}</span>
      <br><br>
      <p>IMDb: ${movie.imdb}</p>
      <br>
      <a href="${movie.trailer}" target="_blank" style="text-decoration: none;">
          <button id="paymentButton">
              <span id="buttonTextPayment">Trailer</span>
          </button>
      </a>`;
  document.querySelector('.about3 p').textContent = movie.description;
} else {
  // Display error message if movie not found
  document.querySelector('#paymentHead').textContent = "Movie not found";
  document.querySelector('.about3 p').textContent = "We couldn't find the details for this movie.";
}
