
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const turnoRoutes = require('./routes/turnos');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

// Middleware global
app.use(express.json());
app.use(logger);

// Motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Rutas
app.use('/turnos', turnoRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Turnos-Flex',
    message: 'Bienvenido al sistema de gestión de turnos'
  });
});

// Conectar a MongoDB e iniciar el servidor
async function iniciarServidor() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Conectado correctamente a MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
