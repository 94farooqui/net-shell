const express = require('express');
const { getNotes, getOneNote, updateOneNote, addOneNote, deleteOneNote } = require('../controllers/notes.js');
const { verifyuser } = require('../middleware/verifyUser.js');
const router = express.Router();

router.get("/", verifyuser, getNotes)
router.get("/:NoteId", getOneNote)
router.post("/",verifyuser, addOneNote)
router.put("/:NoteId", updateOneNote)
router.delete("/:NoteId", deleteOneNote)

module.exports = router;