const express = require('express');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./database');

const app = express();

var cors = require('cors');
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', authRoutes);

// Sincronización con la base de datos
sequelize.sync();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
