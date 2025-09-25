const express = require("express");
const router = express.Router();

//ROUTE 1: Get all the notes using: GET "/api/notes/getuser". Login required
router.get("/", (req, res) => {
  req.json({ message: "Hello from notes" });
});

module.exports = router;
