const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mobile sign-up route
router.post('/signup/mobile', async (req, res) => {
    const { mobileNumber } = req.body;

    // Validate mobile number format
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
        return res.status(400).json({ error: 'Invalid mobile number.' });
    }

    try {
        const user = new User({ mobileNumber, provider: 'Mobile' });
        await user.save();
        res.status(201).json({ message: 'Mobile number registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Email sign-up route
router.post('/signup/email', async (req, res) => {
    const { email } = req.body;

    // Validate email format
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    try {
        const user = new User({ email, provider: 'Email' });
        await user.save();
        res.status(201).json({ message: 'Email registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Export the router
module.exports = router;
