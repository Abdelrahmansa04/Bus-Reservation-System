const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Proceed to next middleware/route handler if the user is an admin
};

module.exports = adminMiddleware;
