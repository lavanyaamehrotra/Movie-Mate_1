const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const PORT = 5501;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/seat-selection', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

const SeatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },
  isOccupied: { type: Boolean, default: false },
});

const Seat = mongoose.model('Seat', SeatSchema);

app.get('/api/seed', async (req, res) => {
  const seats = Array.from({ length: 100 }, (_, i) => ({
    seatNumber: i + 1, 
    isOccupied: false,
  }));

  try {
    await Seat.deleteMany({});
    await Seat.insertMany(seats);
    console.log('Database seeded with seats:', seats);
    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ success: false, message: 'Failed to seed database' });
  }
});


app.get('/api/seats', async (req, res) => {
  try {
    const seats = await Seat.find();
    console.log('Fetched seats:', seats);
    res.json(seats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch seats' });
  }
});


app.post('/api/seats', async (req, res) => {
  const { seatNumbers } = req.body;

  if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid seat numbers provided' });
  }

  try {
    const result = await Seat.updateMany(
      { seatNumber: { $in: seatNumbers } },
      { $set: { isOccupied: true } }
    );
    console.log('Update result:', result);
    res.json({ success: true, message: 'Seats updated successfully' });
  } catch (error) {
    console.error('Error updating seats:', error);
    res.status(500).json({ success: false, message: 'Failed to update seats' });
  }
});


const razorpay = new Razorpay({
  key_id: 'rzp_test_4u9WxvFp5SmwF0', 
  key_secret: 'JiZ8feCNmJxXd4yjVz9SaqdS',
});

app.post('/api/payment/order', async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ success: false, message: 'Invalid amount provided' });
  }

  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order); 
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Failed to create payment order' });
  }
});

app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Missing required payment verification details' });
  }

  const generated_signature = crypto
    .createHmac('sha256', 'JiZ8feCNmJxXd4yjVz9SaqdS') 
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
});

const fs = require('fs');
const pdf = require('pdfkit');

app.post('/api/receipt', (req, res) => {
  const { name, email, contact, movieName, movieTime, movieLocation, selectedSeats, amount } = req.body;

  const doc = new pdf();
  const filename = `receipt_${Date.now()}.pdf`;
  const chunks = [];

  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {
    const pdfData = Buffer.concat(chunks).toString('base64');
    res.json({ success: true, file: pdfData });
  });

  doc.fontSize(40).text('Movie Booking Receipt', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Contact: ${contact}`);
  doc.text(`Movie Name: ${movieName}`);
  doc.text(`Show Time: ${movieTime}`);
  doc.text(`Location: ${movieLocation}`);
  doc.text(`Seats: ${selectedSeats.join(', ')}`);
  doc.text(`Total Amount: ₹${amount}`);
  doc.end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
