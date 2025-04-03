const fetchSeats = async () => {
  try {
    const response = await fetch('/api/seats');
    const seats = await response.json();

    const seatContainer = document.getElementById('seating-area');
    seatContainer.innerHTML = '';

    seats.forEach((seat) => {
      const seatDiv = document.createElement('div');
      seatDiv.classList.add('seat');
      seatDiv.dataset.number = seat.seatNumber;

      if (seat.isOccupied) {
        seatDiv.classList.add('occupied');
      } else {
        seatDiv.addEventListener('click', () => toggleSeat(seatDiv));
      }

      seatDiv.textContent = seat.seatNumber;
      seatContainer.appendChild(seatDiv);
    });
  } catch (error) {
    console.error('Error fetching seats:', error);
  }
};

const toggleSeat = (seat) => {
  if (!seat.classList.contains('occupied')) {
    seat.classList.toggle('selected');
    calculateTotal();
  }
};

const calculateTotal = () => {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  const total = selectedSeats.length * 100;
  document.getElementById('selected-seats').textContent = selectedSeats.length;
  document.getElementById('total-amount').textContent = total;
};

document.getElementById('proceed-btn').addEventListener('click', () => {
  const selectedSeats = [...document.querySelectorAll('.seat.selected')].map((seat) =>
    parseInt(seat.dataset.number)
  );

  if (selectedSeats.length === 0) {
    alert('No seats selected!');
    return;
  }

  document.getElementById('user-details-form').style.display = 'block';
});

document.getElementById('confirm-details').addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;
  const movieName = document.getElementById('movie-name').value;
  const movieTime = document.getElementById('movie-time').value;
  const movieLocation = document.getElementById('movie-location').value;

  if (!name || !email || !contact || !movieName || !movieTime || !movieLocation) {
    alert('Please fill in all the details!');
    return;
  }

  const selectedSeats = [...document.querySelectorAll('.seat.selected')].map((seat) =>
    parseInt(seat.dataset.number)
  );

  const amount = selectedSeats.length * 100;

  try {
    const response = await fetch('/api/payment/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const order = await response.json();

    const options = {
      key: 'rzp_test_4u9WxvFp5SmwF0', 
      amount: order.amount,
      currency: order.currency,
      name: 'Seat Selection',
      description: 'Payment for seat booking',
      order_id: order.id,
      handler: async function (response) {
      
        
        const verifyResponse = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...response, name, email, contact, movieName, movieTime, movieLocation, selectedSeats }),
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
          alert('Payment successful! Generating receipt.');

          const receiptData = await fetch('/api/receipt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name, email, contact, movieName, movieTime, movieLocation, selectedSeats, amount,
            }),
          });

          const receipt = await receiptData.json();

          const a = document.createElement('a');
          a.href = `data:application/pdf;base64,${receipt.file}`;
          a.download = `receipt_${movieName}_${Date.now()}.pdf`;
          a.click();

          await markSeatsAsOccupied(selectedSeats);
          location.reload();
        } else {
          alert('Payment verification failed.');
        }
      },
      prefill: { name, email, contact },
      theme: { color: '#3399cc' },
    };

    const rzp = new Razorpay(options);
    rzp.open();
    document.getElementById('user-details-form').style.display = 'none';
  } catch (error) {
    console.error('Error during payment:', error);
    alert('Something went wrong with the payment process.');
  }
});

const markSeatsAsOccupied = async (selectedSeats) => {
  try {
    const response = await fetch('/api/seats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seatNumbers: selectedSeats }),
    });

    const result = await response.json();
    if (result.success) {
      selectedSeats.forEach((seatNumber) => {
        const seatDiv = document.querySelector(`.seat[data-number="${seatNumber}"]`);
        if (seatDiv) {
          seatDiv.classList.add('occupied');
          seatDiv.classList.remove('selected'); 
          seatDiv.removeEventListener('click', () => toggleSeat(seatDiv));
        }
      });
    } else {
      console.error('Failed to update seat occupancy');
    }
  } catch (error) {
    console.error('Error updating seat occupancy:', error);
  }
};

fetchSeats();



