// C:\Users\Dell\Downloads\cab\project\server\server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const authRoutes = require('./routes/auth');
const bookingsRoutes = require('./routes/bookings'); 
const notificationsRoutes = require('./routes/notifications');
const ratesRoutes = require('./routes/rates');

const app = express();
const port = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // CRITICAL: Parses incoming JSON payload

// --- DATABASE CONNECTION ---
// Using cleaner connect syntax for modern Mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));


// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/rates', ratesRoutes);

// --- 404 Handler (Helps debug routing issues) ---
app.use((req, res, next) => {
    // This logs any request that was not handled by the routes above
    console.error(`404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).send('Sorry, the requested API endpoint was not found.');
});


// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});