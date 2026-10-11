
require('dotenv').config();

const mongoose = require('mongoose');
const Turno = require('./models/Turno');

const turnosAnteriores = [
  {
    cliente: 'Juan Pérez',
    fecha: '2026-09-05',
    hora: '10:00',
    estado: 'pendiente'
  },
  {
    cliente: 'Ivanna',
    fecha: '2026-09-06',
    hora: '15:00',
    estado: 'confirmado'
  }
];

async function importarTurnos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    for (const datos of turnosAnteriores) {
      const existe = await Turno.findOne({
        cliente: datos.cliente,
        fecha: datos.fecha,
        hora: datos.hora
      });

      if (existe) {
        console.log(`Ya existe el turno de ${datos.cliente}. Se omite.`);
        continue;
      }

      await Turno.create(datos);
      console.log(`Turno importado: ${datos.cliente}`);
    }

    console.log('Importación finalizada.');
  } catch (error) {
    console.error('Error al importar:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

importarTurnos();
