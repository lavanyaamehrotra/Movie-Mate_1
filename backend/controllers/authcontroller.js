const User = require('../models/user');

exports.googleSignIn = async (req, res) => {
    const { email, name } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, name, provider: 'Google' });
            await user.save();
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.emailSignUp = async (req, res) => {
    const { email, name } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, name, provider: 'Email' });
            await user.save();
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.mobileSignIn = async (req, res) => {
    const { mobile } = req.body;
    try {
        let user = await User.findOne({ mobile });
        if (!user) {
            user = new User({ mobile, provider: 'Mobile' });
            await user.save();
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
