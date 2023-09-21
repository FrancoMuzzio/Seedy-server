const express = require('express');
const authRoutes = require('./routes/authRoutes');
const communitiesRoutes = require('./routes/communitiesRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./database');

const app = express();

var cors = require('cors');
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', communitiesRoutes);

// Sincronización con la base de datos
sequelize.sync();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
