// Import dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Setup the express server router
const router = express.Router();

// Post
router.post("/", async (req, res) => {
  // Dummy data
  const users = [
    {
      email: "bbrizolara7@gmail.com",
      password: "$2b$15$pRSi1A2ZVc0DIsS3MVRIlOnGjZApjVm8q88RMtAdj0wwtZf7XKM3C",
      roles: ["admin", "editor", "viewer"],
    },
  ];

  const user = users.find(
    (u) => u.email.toLowerCase() === req.body.email.toLowerCase()
  );

  // No user found
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare the password with the password in the database
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    {
      id: user._id,
      roles: user.roles,
    },
    "jwtPrivateKey",
    { expiresIn: "15m" }
  );

  res.send({
    success: true,
    token: token,
  });
});

// Export the router
module.exports = router;
