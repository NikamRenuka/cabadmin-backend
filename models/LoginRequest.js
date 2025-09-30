const mongoose = require("mongoose");

const loginRequestSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const LoginRequest = mongoose.model("LoginRequest", loginRequestSchema);

module.exports = LoginRequest;
