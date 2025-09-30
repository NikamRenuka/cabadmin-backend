const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Booking = require("../models/Booking");

// Correctly load .env from the root directory (two levels up from /seed)
dotenv.config({ path: path.join(__dirname, "../../.env") });

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Clear old data
    await Booking.deleteMany();
    console.log("🗑️ Cleared old bookings");

    // Insert sample bookings
    await Booking.insertMany([
      {
        customerName: "Ramesh Kumar",
        phone: "9876543210",
        email: "ramesh@example.com",
        pickup: "Aurangabad",
        drop: "Pune",
        tripType: "One Way",
        rideType: "Exclusive",
        vehicleType: "Sedan",
        fare: 3000,
        status: "Pending",
        bookingTime: new Date().toISOString(),
      },
      {
        customerName: "Suresh Patil",
        phone: "9123456789",
        email: "suresh@example.com",
        pickup: "Aurangabad",
        drop: "Nashik",
        tripType: "Round Trip",
        rideType: "Shared",
        vehicleType: "SUV",
        fare: 1200,
        passengers: 3,
        status: "Confirmed",
        bookingTime: new Date().toISOString(),
      },
    ]);

    console.log("🌱 Seed bookings inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
}

seed();
