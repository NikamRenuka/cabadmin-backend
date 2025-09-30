const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    dob: { type: String }, // optional

    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    bookingTime: { type: String }, // keep as string for now

    tripType: { type: String }, // One Way / Round Trip
    rideType: { type: String }, // Shared / Exclusive
    vehicleType: { type: String },
    fare: { type: Number, default: 0 },
    passengers: { type: Number, default: 1 },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    driverName: { type: String, default: null },
  },
  { timestamps: true }
);

// So React sees `id` instead of `_id`
BookingSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
