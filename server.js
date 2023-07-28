const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes, Model } = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize('seedy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Modelo de Usuario
class User extends Model {}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'User'
});

// Sincronización con la base de datos
sequelize.sync();

const app = express();

var cors = require('cors');
app.use(cors());

app.use(express.json());

// Ruta de registro
app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });
  res.send('User registered successfully');
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'secret-key');
    res.send(token);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Ruta protegida
app.get('/protected', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, 'secret-key');
    res.send(`Hello ${payload.username}`);
  } catch {
    res.status(401).send('Not authorized');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
