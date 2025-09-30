// C:\Users\Dell\Downloads\cab\project\server\models\Rate.js

const mongoose = require('mongoose');

// Schema designed to hold the complete complex rates object within the 'data' field.
const RateSchema = new mongoose.Schema({
  data: {
    type: Object, // Stores the complete rates object (perKmRates, perSeatRates, etc.)
    required: true,
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Rate', RateSchema);