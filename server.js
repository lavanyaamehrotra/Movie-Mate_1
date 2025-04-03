const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'landing_page')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing_page', 'index.html'));
});

app.get('/receipt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'receipt.html'));
});


mongoose.connect('mongodb://localhost:27017/moviesdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));



const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
