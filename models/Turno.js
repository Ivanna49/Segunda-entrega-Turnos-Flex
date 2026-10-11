const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  numero: {
    type: Number,
    unique: true
  },
  cliente: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'cancelado'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Turno', turnoSchema);
