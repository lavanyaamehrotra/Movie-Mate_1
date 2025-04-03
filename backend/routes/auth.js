const express = require('express');
const router = express.Router();

// Default route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Auth API' });
});

// Signup route
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    res.json({ message: `Signup successful for ${name}` });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.json({ message: `Login successful for ${email}` });
});

module.exports = router;
