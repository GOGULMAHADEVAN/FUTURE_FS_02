const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hash,
  });

  await user.save();

  res.json({
    message: "User registered successfully",
  });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user)
    return res.status(400).json({
      message: "User not found",
    });

  const valid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!valid)
    return res.status(400).json({
      message: "Wrong password",
    });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    message: "Login successful",
  });
});

module.exports = router;