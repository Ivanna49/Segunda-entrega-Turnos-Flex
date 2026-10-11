
const mongoose = require('mongoose');
const Turno = require('../models/Turno');

class TurnoController {
  // Listar todos los turnos
  static async listar(req, res) {
    try {
      const turnos = await Turno.find().sort({ fecha: 1, hora: 1 });

      res.render('turnos', {
        title: 'Listado de Turnos',
        turnos
      });
    } catch (error) {
      console.error('Error al listar turnos:', error.message);
      res.status(500).send('Error al consultar los turnos');
    }
  }

  // Crear un turno
  static async crear(req, res) {
  try {
    const { cliente, fecha, hora } = req.body;

    if (!cliente || !fecha || !hora) {
      return res.status(400).json({
        error: 'Cliente, fecha y hora son obligatorios'
      });
    }

    const ultimoTurno = await Turno.findOne()
      .sort({ numero: -1 });

    const siguienteNumero = ultimoTurno
      ? (ultimoTurno.numero || 0) + 1
      : 1;

    const nuevoTurno = await Turno.create({
      numero: siguienteNumero,
      cliente,
      fecha,
      hora,
      estado: 'pendiente'
    });

    res.status(201).json(nuevoTurno);
  } catch (error) {
    console.error('Error al crear turno:', error.message);
    res.status(500).json({ error: 'Error al crear el turno' });
  }
}

  // Obtener un turno por su ID de MongoDB
  static async obtener(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          error: 'El identificador del turno no es válido'
        });
      }

      const turno = await Turno.findById(id);

      if (!turno) {
        return res.status(404).json({
          error: 'Turno no encontrado'
        });
      }

      res.json(turno);
    } catch (error) {
      console.error('Error al obtener turno:', error.message);
      res.status(500).json({ error: 'Error al consultar el turno' });
    }
  }

  // Eliminar un turno
  static async eliminar(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          error: 'El identificador del turno no es válido'
        });
      }

      const turnoEliminado = await Turno.findByIdAndDelete(id);

      if (!turnoEliminado) {
        return res.status(404).json({
          error: 'Turno no encontrado'
        });
      }

      res.json({ message: 'Turno eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar turno:', error.message);
      res.status(500).json({ error: 'Error al eliminar el turno' });
    }
  }
}

module.exports = TurnoController;
