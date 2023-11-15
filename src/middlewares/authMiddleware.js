require("dotenv").config();
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token not found' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token verification failed' });
        
        req.user = user;
        next();
    });
}

module.exports = authenticateJWT;
