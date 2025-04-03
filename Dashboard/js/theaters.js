document.getElementById('theaterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  addTheater();
});
let theaters = JSON.parse(localStorage.getItem('theaters')) || [];
renderTheaters();

function addTheater() {
  const name = document.getElementById('theaterName').value;
  const location = document.getElementById('theaterLocation').value;

  if (name && location) {
      const theater = { name, location };
      theaters.push(theater);
      saveTheaters();
      renderTheaters();
      document.getElementById('theaterName').value = '';
      document.getElementById('theaterLocation').value = '';
  } else {
      alert('Please enter both theater name and location');
  }
}

function renderTheaters() {
  const theaterListContainer = document.getElementById('theaterListContainer');
  theaterListContainer.innerHTML = '';

  theaters.forEach((theater, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <span>${theater.name} - ${theater.location}</span>
          <button onclick="deleteTheater(${index})">Delete</button>
      `;
      theaterListContainer.appendChild(listItem);
  });
}
function saveTheaters() {
  localStorage.setItem('theaters', JSON.stringify(theaters));
}
function deleteTheater(index) {
  theaters.splice(index, 1);
  saveTheaters();
  renderTheaters();
}

