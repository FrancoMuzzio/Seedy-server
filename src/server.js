const express = require('express');
const authRoutes = require('./routes/authRoutes');
const communitiesRoutes = require('./routes/communitiesRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const plantRoutes = require('./routes/plantRoutes');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');

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
app.use('/', plantRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sincronización con la base de datos
sequelize.sync();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
