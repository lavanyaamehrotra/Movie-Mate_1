const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNumber: { type: String, required: false },
    email: { type: String, required: false },
    provider: { type: String, required: true }, // e.g., "Google", "Apple", "Email", "Mobile"
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
