const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.send('User registered successfully');
  };

  exports.login = async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ username: user.username }, 'secret-key');
      res.send(token);
    } else {
      res.status(401).send('Invalid credentials');
    }
  };

  exports.protected = (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = jwt.verify(token, 'secret-key');
      res.send(`Hello ${payload.username}`);
    } catch {
      res.status(401).send('Not authorized');
    }
  };

  exports.checkUsername = async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      res.status(409).json({message: 'Username already exists'});
    } else {
      res.json({message: 'Username is available'});
    }
  };
  
  exports.checkEmail = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      res.status(409).json({message: 'Email already exists'});
    } else {
      res.json({message: 'Email is available'});
    }
  };
  
