const jwt = require('jsonwebtoken');
const User = require('../Models/user'); // Adjust the path to your User model

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, "sakshisharma123");

            // Fetch user from the database
            req.user = await User.findById(decoded.id).select('-password');

            // Check if user was found
            if (!req.user) {
                return res.status(404).json({ error: 'User not found' });
            }

            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('Token expired:', error.message);
                return res.status(401).json({ error: 'Token has expired, please log in again' });
            }
            console.error('Error during token verification:', error.message);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = protect;
