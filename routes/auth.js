const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Server-side validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).send("All fields are required.");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("User already exists.");

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(500).send("Server error. Please try again.");
  }
});

module.exports = router;
