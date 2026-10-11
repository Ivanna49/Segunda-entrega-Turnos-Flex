require('dotenv').config();
const mongoose = require('mongoose');
const Turno = require('./models/Turno');

async function actualizarNumeros() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const turnos = await Turno.find().sort({
      fecha: 1,
      hora: 1,
      _id: 1
    });

    for (let i = 0; i < turnos.length; i++) {
      turnos[i].numero = i + 1;
      await turnos[i].save();
    }

    console.log('Números asignados correctamente.');
  } catch (error) {
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
  }
}

actualizarNumeros();