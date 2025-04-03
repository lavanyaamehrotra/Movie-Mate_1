document.getElementById('movieForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('movieTitle').value;
  const genre = document.getElementById('movieGenre').value;
  const duration = document.getElementById('movieDuration').value;
  const movieList = document.getElementById('movieListContainer');
  const li = document.createElement('li');
  li.textContent = `${title} - ${genre} - ${duration} min`;
  movieList.appendChild(li);
  document.getElementById('movieForm').reset();
});
