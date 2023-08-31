const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'isidro.erdman@ethereal.email',
        pass: 'fTYa3GhqnRM2T4Q8Gy'
    }
});

module.exports = transporter;
