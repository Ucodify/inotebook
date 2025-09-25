const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT_SECRET = "hARRYISAgoodb$boy";
const jwt = require("jsonwebtoken");

//Create a user using: POST "/api/auth". Doesnot require auth
//ROUTE 1: Get all the notes using: GET "/api/notes". Login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").notEmpty().escape().isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail().normalizeEmail(),
    body("password", "Password should atleast contain 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const password = String(req.body.password); // 🔒 ensure it's a string

      if (!password || typeof password !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(String(password), salt);

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      // await user.save();
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
      // res.json(user);
    } catch (error) {
      console.error("Error Details: ", error.message);
      res.status(500).send({ success: false, message: error.message });
    }
  }
);

module.exports = router;
