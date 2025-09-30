const User = require("../models/User");
const LoginRequest = require("../models/LoginRequest");

// Handle user sign-up
exports.signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this username already exists." });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Handle user login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log successful login
    console.log(`✅ Successful login for user: ${username}`);

    // Save login history
    const loginRecord = new LoginRequest({ username });
    await loginRecord.save();

    res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
