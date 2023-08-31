const nodemailer = require('nodemailer');

const emailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'isidro.erdman@ethereal.email',
        pass: 'fTYa3GhqnRM2T4Q8Gy'
    }
};

const transporter = nodemailer.createTransport(emailConfig);

module.exports = {
    transporter,
    supportEmail: emailConfig.auth.user
};
