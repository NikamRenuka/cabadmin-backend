const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBookingById,
  updateBooking,
  getStats,
  createBooking,  // import the new controller
} = require("../controllers/bookingsController");

router.get("/", getBookings);
router.get("/stats", getStats);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.post("/", createBooking);  // add POST route

module.exports = router;
