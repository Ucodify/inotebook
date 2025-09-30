const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error Details: ", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});

//ROUTE 2: Add a new note using: POST "/api/notes/addnote". login required
router.get(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title")
      .notEmpty()
      .escape()
      .isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Error Details: ", error.message);
      res.status(500).send({ success: false, message: error.message });
    }
  }
);
//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
      if (tag) {
        newNote.tag = title;
      }
    }

    //Find the new note and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error("Error Details: ", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});

//ROUTE 3: Delete an existing note using: DELETE "/api/notes/deletenote". login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the new note to be deleted and delete it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow Deletion if only user owns this note

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error("Error Details: ", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});

//ROUTE 4: DELETE all notes by a specific user
router.delete("/deleteallnotesofuser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Make sure we cast it to ObjectId
    const result = await Note.deleteMany({
      user: new mongoose.Types.ObjectId(userId),
    });

    res.status(200).json({
      message: `Deleted ${result.deletedCount} notes for user ${userId}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
