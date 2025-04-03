
const theaters = [
  { name: 'Theater 1', bookings: 200 },
  { name: 'Theater 2', bookings: 150 },
  { name: 'Theater 3', bookings: 180 },
  { name: 'Theater 4', bookings: 120 }
];
const movies = [
  { name: 'Movie 1', bookings: 100 },
  { name: 'Movie 2', bookings: 250 },
  { name: 'Movie 3', bookings: 300 },
  { name: 'Movie 4', bookings: 50 },
  { name: 'Movie 5', bookings: 200 }
];


function renderAnalytics() {
  const totalBookings = theaters.reduce((acc, theater) => acc + theater.bookings, 0);
  document.getElementById('totalMovies').textContent = movies.length;
  document.getElementById('totalTheaters').textContent = theaters.length;
  document.getElementById('totalBookings').textContent = totalBookings;
  document.getElementById('totalEarnings').textContent = `$${totalBookings * 10}`;
  renderTopMovies();
  renderCharts();
}

function renderCharts() {
  const dailyBookingsData = [10, 20, 30, 40, 50, 60, 70];
  const ctxDaily = document.getElementById('dailyBookingsChart').getContext('2d');
  new Chart(ctxDaily, {
      type: 'line',
      data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
              label: 'Bookings',
              data: dailyBookingsData,
              borderColor: '#28a745',
              backgroundColor: 'rgba(40, 167, 69, 0.2)',
              fill: true,
              tension: 0.4
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  const weeklyBookingsData = [70, 90, 110, 130, 150];
  const ctxWeekly = document.getElementById('weeklyBookingsChart').getContext('2d');
  new Chart(ctxWeekly, {
      type: 'bar',
      data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          datasets: [{
              label: 'Bookings',
              data: weeklyBookingsData,
              backgroundColor: '#007bff',
              borderColor: '#0056b3',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  const performanceData = [50, 150, 200, 250, 300];
  const ctxPerformance = document.getElementById('performanceChart').getContext('2d');
  new Chart(ctxPerformance, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
              label: 'Earnings',
              data: performanceData,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              fill: true,
              tension: 0.4
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function renderTopMovies() {
  const topMoviesList = document.getElementById('topMoviesList');
  topMoviesList.innerHTML = ''; 
  movies.sort((a, b) => b.bookings - a.bookings).slice(0, 5).forEach(movie => {
      const li = document.createElement('li');
      li.textContent = `${movie.name} - ${movie.bookings} bookings`;
      topMoviesList.appendChild(li);
  });
}
window.onload = renderAnalytics;


