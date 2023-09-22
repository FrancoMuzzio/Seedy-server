const express = require('express');
const authRoutes = require('./routes/authRoutes');
const communitiesRoutes = require('./routes/communitiesRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');

const app = express();

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', communitiesRoutes);
app.use('/', imageRoutes);
app.use('/uploads', express.static('uploads'));

// Sincronización con la base de datos
sequelize.sync();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
