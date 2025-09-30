// C:\Users\Dell\Downloads\cab\project\server\controllers\rateController.js

const Rate = require('../models/Rate'); 

// GET latest saved rates
exports.getRates = async (req, res) => {
  try {
    const latest = await Rate.findOne().sort({ createdAt: -1 }); 
    res.json(latest ? latest.data : {});
  } catch (err) {
    console.error("Error fetching rates:", err.message);
    res.status(500).json({ error: 'Failed to fetch rates.' });
  }
};

// SAVE (overwrite) rates
exports.saveRates = async (req, res) => {
  try {
    const { rates } = req.body;
    
    if (!rates) {
        return res.status(400).json({ error: 'Rates object missing in request body.' });
    }

    const newEntry = new Rate({ data: rates });
    await newEntry.save();

    res.json({ message: 'Rates saved successfully.' });
  } catch (err) {
    // CRUCIAL: Log the full error for any remaining database issues.
    console.error("Error saving rates:", err); 
    res.status(500).json({ error: 'Failed to save rates.' });
  }
};