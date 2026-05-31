const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. check user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json("User already exists");
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // 4. save user
    await newUser.save();

    res.status(200).json("User registered successfully");

  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Wrong password");
    }

    // 3. create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. send response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;