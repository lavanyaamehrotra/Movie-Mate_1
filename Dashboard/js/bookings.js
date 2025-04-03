let bookings = [
  { id: 'B001', name: 'Rajdeep Singh', theater: 'Theater 1', time: '7:00 PM', status: 'Pending', details: {} },
  { id: 'B002', name: 'Roshni Srivastava', theater: 'Theater 2', time: '8:30 PM', status: 'Confirmed', details: {} },
  { id: 'B003', name: 'Khushi Tiwari', theater: 'Theater 1', time: '6:00 PM', status: 'Cancelled', details: {} }
];

let currentBookingIndex = null;

window.onload = renderBookings;
function renderBookings() {
  const bookingListContainer = document.getElementById('bookingListContainer');
  bookingListContainer.innerHTML = '';

  bookings.forEach((booking, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${booking.id}</td>
          <td>${booking.name}</td>
          <td>${booking.theater}</td>
          <td>${booking.time}</td>
          <td>${booking.status}</td>
          <td>${booking.details.seats || ''}, ${booking.details.paymentStatus || ''}</td>
          <td>
              <button class="add-details" onclick="openDetailsModal(${index})">Add Details</button>
              <button class="confirm" onclick="updateStatus(${index}, 'Confirmed')">Confirm</button>
              <button class="cancel" onclick="updateStatus(${index}, 'Cancelled')">Cancel</button>
          </td>
      `;
      bookingListContainer.appendChild(row);
  });
}


function updateStatus(index, status) {
  bookings[index].status = status;
  renderBookings();
}

function openDetailsModal(index) {
  currentBookingIndex = index;
  document.getElementById('detailsModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('detailsModal').style.display = 'none';
}

document.getElementById('detailsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const seats = document.getElementById('seatNumbers').value;
  const paymentStatus = document.getElementById('paymentStatus').value;

  if (currentBookingIndex !== null) {
      bookings[currentBookingIndex].details = { seats, paymentStatus };
      renderBookings();
      closeModal();
      document.getElementById('detailsForm').reset();
  }
});
