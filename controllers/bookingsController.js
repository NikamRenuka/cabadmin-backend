const Booking = require("../models/Booking");
const Notification = require("../models/Notification");

// GET /api/bookings?search=abc
const getBookings = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { customerName: regex },
        { phone: regex },
        { pickup: regex },
        { drop: regex },
        { driverName: regex },
        { vehicleType: regex },
      ];
    }
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking" });
  }
};

// PUT /api/bookings/:id
const updateBooking = async (req, res) => {
  try {
    const updates = req.body; 
    const booking = await Booking.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    // 🔔 Create Notification
    const notification = new Notification({
      message: `New booking from ${newBooking.pickup} to ${newBooking.drop} by ${newBooking.customerName}`,
      date: new Date(),
    });
    await notification.save();

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: "Failed to create booking", error: err.message });
  }
};

// GET /api/bookings/stats
const getStats = async (req, res) => {
  try {
    const total = await Booking.countDocuments({});
    const pending = await Booking.countDocuments({ status: "Pending" });
    const confirmed = await Booking.countDocuments({ status: "Confirmed" });
    res.json({ total, pending, confirmed });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

module.exports = { getBookings, getBookingById, updateBooking, getStats, createBooking };
