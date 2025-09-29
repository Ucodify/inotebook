const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT_SECRET = "hARRYISAgoodb$boy";
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

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

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error("Error Details: ", error.message);
      res.status(500).send({ success: false, message: error.message });
    }
  }
);

//Route 2: Authenticate a user using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
    //body('password', 'Password must atleast 5 characters').isLength({min:5}),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: [
          {
            id: user.id,
          },
        ],
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error("Error Details: ", error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3 : Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
