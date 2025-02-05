// In the backend authController.js (example)
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role }, // Include role in the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: token,  // Send JWT token
            role: user.role // Send the user role
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
