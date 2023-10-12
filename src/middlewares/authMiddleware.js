const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token not found' });

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token verification failed' });
        
        req.user = user;
        next();
    });
}

module.exports = authenticateJWT;
