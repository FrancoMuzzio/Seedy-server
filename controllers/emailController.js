const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'aileen.bode@ethereal.email',
        pass: 'sgHhseucU4m59WpdVY'
    }
});

module.exports = transporter;
