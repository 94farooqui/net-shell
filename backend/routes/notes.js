const express = require('express');
const { getNotes, getOneNote, updateOneNote, addOneNote, deleteOneNote } = require('../controllers/notes.js');
const router = express.Router();

router.get("/", getNotes)
router.get("/:NoteId", getOneNote)
router.post("/",addOneNote)
router.put("/:NoteId", updateOneNote)
router.delete(":/NoteId", deleteOneNote)

module.exports = router;